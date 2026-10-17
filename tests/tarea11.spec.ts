import { test, expect } from '@playwright/test';
import { bloquearAnuncios } from '../helpers/anuncios';

// Tarea 11 - Gestión de defectos con Playwright
// Sitio bajo prueba: practice.expandtesting.com (/typos y /broken-images)
const BASE_URL = 'https://practice.expandtesting.com';

// Texto real verificado en /typos. Cualquier diferencia con este texto
// en el segundo párrafo se considera un error tipográfico (typo).
const TEXTO_CORRECTO = "Sometimes you'll see a typo, other times you won't.";
const OBSERVACIONES = 12;

type ResultadoObservacion = 'correcto' | 'typo' | 'fallo-navegacion' | 'contenido-no-encontrado';

type Observacion = {
  numero: number;
  resultado: ResultadoObservacion;
  estadoHttp: number | null;
  texto: string | null;
  detalle?: string;
};

// Quita los códigos de color ANSI de los mensajes de error de Playwright
function limpiarAnsi(texto: string): string {
  return texto.replace(/\u001b\[[0-9;]*m/g, '');
}


// El typo viene en el HTML del servidor; los anuncios no forman parte de lo
// que se mide y, al recargar 12 veces, bloquearon el cierre del navegador.
test.beforeEach(async ({ page }) => {
  await bloquearAnuncios(page);
});


// =========================================================
// RETO 3 - BORRADOR DE REPORTE DESDE afterEach
// =========================================================
test.afterEach(async ({ page, browserName }, testInfo) => {
  // Solo se genera borrador cuando la prueba terminó con un error real.
  // passed y skipped nunca generan reporte.
  const terminoConError = ['failed', 'timedOut', 'interrupted'].includes(
    testInfo.status ?? ''
  );
  if (!terminoConError) return;

  try {
    let url = 'No disponible';
    let versionNavegador = 'No disponible';
    try {
      url = page.url() || url;
      versionNavegador = page.context().browser()?.version() ?? versionNavegador;
    } catch {
      // La página pudo cerrarse; se conservan los valores por defecto
    }

    const errores = testInfo.errors.length > 0
      ? testInfo.errors.map((e, i) =>
          `${i + 1}. ${limpiarAnsi(e.message ?? e.value ?? 'Error sin mensaje')
            .split('\n').map((l) => l.trim()).filter(Boolean).slice(0, 4).join(' | ')}`
        ).join('\n')
      : 'No se registró mensaje de error.';

    const anotaciones = testInfo.annotations.length > 0
      ? testInfo.annotations.map((a) => `- ${a.type}: ${a.description ?? ''}`).join('\n')
      : '- Ninguna';

    const esperado = testInfo.expectedStatus === 'failed'
      ? 'Fallo esperado (defecto conocido marcado con test.fail)'
      : 'Inesperado';

    const borrador = [
      `# Borrador de bug report: ${testInfo.title}`,
      '',
      '> Generado automáticamente por test.afterEach. Revisar antes de registrar.',
      '',
      '## Ambiente',
      `- Proyecto: ${testInfo.project.name || 'No disponible'}`,
      `- Navegador: ${browserName} ${versionNavegador}`,
      `- Sistema operativo: ${process.platform}`,
      `- Playwright: ${testInfo.config.version}`,
      `- Fecha: ${new Date().toISOString()}`,
      '',
      '## Datos de la ejecución',
      `- Test: ${testInfo.titlePath.join(' › ')}`,
      `- Archivo: ${testInfo.file}:${testInfo.line}`,
      `- URL: ${url}`,
      `- Estado: ${testInfo.status} (${esperado})`,
      `- Intento: ${testInfo.retry + 1}`,
      `- Duración: ${testInfo.duration} ms`,
      '',
      '## Resultado obtenido',
      errores,
      '',
      '## Anotaciones',
      anotaciones,
      '',
      '## Pendiente de completar manualmente',
      '- Pasos para reproducir, resultado esperado, severidad y prioridad.',
    ].join('\n');

    await testInfo.attach('borrador-bug-report.md', {
      body: borrador,
      contentType: 'text/markdown',
    });
  } catch (error) {
    // Nunca ocultar el error original del test con un error del reporte
    console.warn(`No se pudo generar el borrador de reporte: ${String(error)}`);
  }
});


// =========================================================
// RETO 1 - MEDIR UN DEFECTO INTERMITENTE
// =========================================================
test(
  'Reto 1 - Medir la frecuencia del typo en /typos',
  {
    annotation: {
      type: 'criterio',
      description: `Typo = el segundo párrafo es distinto de "${TEXTO_CORRECTO}"`,
    },
  },
  async ({ page }, testInfo) => {
    // 12 recargas con slowMo pueden superar los 30 s por defecto
    test.slow();

    const observaciones: Observacion[] = [];
    const parrafo = page.locator('#core p').filter({ hasText: 'other times you' });

    for (let numero = 1; numero <= OBSERVACIONES; numero++) {
      let estadoHttp: number | null = null;

      try {
        const respuesta = numero === 1
          ? await page.goto(`${BASE_URL}/typos`, { waitUntil: 'domcontentloaded' })
          : await page.reload({ waitUntil: 'domcontentloaded' });
        estadoHttp = respuesta?.status() ?? null;
      } catch (error) {
        observaciones.push({
          numero, resultado: 'fallo-navegacion', estadoHttp, texto: null,
          detalle: limpiarAnsi(String(error)).split('\n')[0],
        });
        continue;
      }

      // 304 Not Modified también es una carga válida: al recargar, el servidor
      // confirma (por ETag) que el contenido es idéntico al que está en caché.
      const respuestaValida = estadoHttp !== null &&
        ((estadoHttp >= 200 && estadoHttp < 300) || estadoHttp === 304);

      if (!respuestaValida) {
        observaciones.push({
          numero, resultado: 'fallo-navegacion', estadoHttp, texto: null,
          detalle: `Respuesta HTTP ${estadoHttp}`,
        });
        continue;
      }

      let texto: string;
      try {
        texto = (await parrafo.innerText({ timeout: 10000 })).trim();
      } catch {
        observaciones.push({
          numero, resultado: 'contenido-no-encontrado', estadoHttp, texto: null,
        });
        continue;
      }

      observaciones.push({
        numero,
        resultado: texto === TEXTO_CORRECTO ? 'correcto' : 'typo',
        estadoHttp,
        texto,
      });
    }

    const contar = (r: ResultadoObservacion) =>
      observaciones.filter((o) => o.resultado === r).length;

    const resumen = {
      url: `${BASE_URL}/typos`,
      textoCorrecto: TEXTO_CORRECTO,
      observaciones: observaciones.length,
      correctas: contar('correcto'),
      conTypo: contar('typo'),
      fallosNavegacion: contar('fallo-navegacion'),
      contenidoNoEncontrado: contar('contenido-no-encontrado'),
      variantesConTypo: [...new Set(
        observaciones.filter((o) => o.resultado === 'typo').map((o) => o.texto)
      )],
      detalle: observaciones,
    };

    const validas = resumen.correctas + resumen.conTypo;
    const porcentaje = validas > 0 ? ((resumen.conTypo / validas) * 100).toFixed(1) : '0.0';

    await testInfo.attach('frecuencia-typo.json', {
      body: JSON.stringify({ ...resumen, porcentajeTypo: `${porcentaje}%` }, null, 2),
      contentType: 'application/json',
    });

    testInfo.annotations.push({
      type: 'frecuencia',
      description:
        `Typo en ${resumen.conTypo} de ${validas} cargas válidas (${porcentaje}%); ` +
        `fallos de navegación: ${resumen.fallosNavegacion}; ` +
        `contenido no encontrado: ${resumen.contenidoNoEncontrado}`,
    });

    console.log(`Reto 1 - frecuencia del typo: ${resumen.conTypo}/${validas} (${porcentaje}%)`);

    // Las aserciones validan la MEDICIÓN, no el resultado aleatorio:
    // la prueba pasa haya 0 o 12 typos, siempre que se haya podido observar.
    expect(observaciones).toHaveLength(OBSERVACIONES);
    expect(
      resumen.fallosNavegacion + resumen.contenidoNoEncontrado,
      'El sitio debe responder en las 12 observaciones para medir la frecuencia'
    ).toBe(0);
    expect(validas).toBe(OBSERVACIONES);
  }
);


// =========================================================
// RETO 2 - test.fixme CON ANOTACIÓN DE ISSUE
// =========================================================
// Deshabilitado mientras el defecto siga abierto: el typo es intermitente,
// así que esta validación fallaría en una parte de las ejecuciones.
// Reactivar (cambiar test.fixme por test) cuando el Issue se cierre y el
// Reto 1 reporte 0 typos en sus 12 observaciones.
test.fixme(
  'Reto 2 - El texto de /typos no debe contener errores',
  {
    annotation: {
      type: 'issue',
      description:
        'Typo intermitente "won,t" en lugar de "won\'t" en /typos. ' +
        'Pendiente de registrar en GitHub (aún sin número de Issue).',
    },
  },
  async ({ page }) => {
    const parrafo = page.locator('#core p').filter({ hasText: 'other times you' });

    await page.goto(`${BASE_URL}/typos`);
    for (let numero = 1; numero <= OBSERVACIONES; numero++) {
      if (numero > 1) await page.reload();
      await expect(parrafo).toHaveText(TEXTO_CORRECTO);
    }
  }
);


// =========================================================
// RETO 3 - DEFECTO CONOCIDO QUE ACTIVA EL BORRADOR DEL afterEach
// =========================================================
test(
  'Reto 3 - Imágenes rotas generan borrador de reporte',
  {
    annotation: {
      type: 'bug',
      description: 'BUG-11-01 (reportes/bug-report-clase11.md). Registro en GitHub pendiente.',
    },
  },
  async ({ page }) => {
    // Precondiciones: si fallan, el fallo es inesperado (ambiente, no defecto)
    const respuesta = await page.goto(`${BASE_URL}/broken-images`);
    expect(respuesta?.status()).toBe(200);

    const imagenes = page.locator('#core .container img');
    await expect(imagenes).toHaveCount(3);

    // Desde aquí el fallo es esperado: el afterEach adjunta el borrador
    test.fail(true, 'Defecto conocido BUG-11-01: imágenes rotas en /broken-images');

    const anchos = await imagenes.evaluateAll((imgs) =>
      (imgs as HTMLImageElement[]).map((img) => ({
        src: img.getAttribute('src'),
        naturalWidth: img.naturalWidth,
      }))
    );

    for (const img of anchos) {
      expect.soft(img.naturalWidth, `La imagen ${img.src} debe cargar`).toBeGreaterThan(0);
    }
  }
);
