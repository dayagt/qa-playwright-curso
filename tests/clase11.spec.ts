import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import { bloquearAnuncios } from '../helpers/anuncios';

// Clase 11 - Gestión de defectos y reportes en Playwright
// Sitio bajo prueba: practice.expandtesting.com
// Se usan URLs absolutas porque el baseURL del proyecto es DemoBlaze
// (lo necesitan las Clases 1-4).
const BASE_URL = 'https://practice.expandtesting.com';

test.describe('Clase 11 - Defectos y reportes en Expand Testing', () => {

  // Los anuncios hacían que los tests rozaran el timeout (ver helpers/anuncios.ts)
  test.beforeEach(async ({ page }) => {
    await bloquearAnuncios(page);
  });

  // =========================================================
  // EJERCICIO 1 - PÁGINA PRINCIPAL
  // =========================================================
  test('Ejercicio 1 - La página principal carga', async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(page).toHaveTitle(/Automation Testing Practice/);
    await expect(page.locator('#main-title')).toContainText(
      'Automation Testing Practice WebSite'
    );
  });


  // =========================================================
  // EJERCICIO 2 - LOGIN CON CREDENCIALES VÁLIDAS
  // =========================================================
  test('Ejercicio 2 - Login con credenciales válidas', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    // Credenciales publicadas en la propia página de login
    await page.locator('#username').fill('practice');
    await page.locator('#password').fill('SuperSecretPassword!');
    await page.locator('#submit-login').click();

    await expect(page).toHaveURL(/\/secure/);
    await expect(page.locator('#flash')).toContainText(
      'You logged into a secure area!'
    );
    await expect(page.locator('#username')).toContainText('Hi, practice!');
  });


  // =========================================================
  // EJERCICIO 3 - LOGIN CON CREDENCIALES INVÁLIDAS
  // =========================================================
  test('Ejercicio 3 - Login con credenciales inválidas', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    await page.locator('#username').fill('practice');
    await page.locator('#password').fill('password_incorrecta');
    await page.locator('#submit-login').click();

    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator('#flash')).toContainText(
      'Your password is invalid!'
    );
  });


  // =========================================================
  // EJERCICIO 4 - CONTROLES DINÁMICOS
  // =========================================================
  test('Ejercicio 4 - Controles dinámicos', async ({ page }) => {
    // Tres operaciones asíncronas (~3 s cada una) + slowMo; además, en WebKit
    // cerrar el contexto tardó ~21 s (video + websocket del sitio) y el
    // teardown cuenta dentro del timeout del test.
    test.slow();

    await page.goto(`${BASE_URL}/dynamic-controls`);

    const formCheckbox = page.locator('#checkbox-example');
    const formInput = page.locator('#input-example');

    // Enable/disable va PRIMERO: cada Remove/Add agrega un <div id="loading">
    // más al formulario de arriba y empuja el botón Enable fuera del visual
    // viewport. En mobile-chrome (Pixel 5) Playwright no logra hacer clic ahí
    // ("form#checkbox-example intercepts pointer events"), aunque un toque real
    // sí funciona. Ver reportes/auditoria-clases-01-11.md.
    const campoTexto = formInput.locator('input[type="text"]');
    await expect(campoTexto).toBeDisabled();

    await formInput.getByRole('button', { name: 'Enable' }).click();
    await expect(formInput.locator('#message')).toHaveText("It's enabled!");
    await expect(campoTexto).toBeEnabled();

    // Remove/add: el checkbox desaparece y vuelve de forma asíncrona
    await formCheckbox.getByRole('button', { name: 'Remove' }).click();
    await expect(formCheckbox.locator('#message')).toHaveText("It's gone!");
    await expect(formCheckbox.locator('input[type="checkbox"]')).toHaveCount(0);

    await formCheckbox.getByRole('button', { name: 'Add' }).click();
    await expect(formCheckbox.locator('#message')).toHaveText("It's back!");
    await expect(formCheckbox.locator('input[type="checkbox"]')).toBeVisible();
  });


  // =========================================================
  // EJERCICIO 5 - ALERTAS DEL NAVEGADOR
  // =========================================================
  test('Ejercicio 5 - Alerta del navegador', async ({ page }) => {
    await page.goto(`${BASE_URL}/js-dialogs`);

    // El handler se registra ANTES del clic que dispara el diálogo
    let mensaje = '';
    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('alert');
      mensaje = dialog.message();
      await dialog.accept();
    });

    await page.locator('#js-alert').click();

    await expect(page.locator('#dialog-response')).toHaveText('OK');
    expect(mensaje).toBe('I am a Js Alert');
  });


  // =========================================================
  // EJERCICIO 6 - CONFIRM DIALOG
  // =========================================================
  test('Ejercicio 6 - Confirm dialog: aceptar y cancelar', async ({ page }) => {
    await page.goto(`${BASE_URL}/js-dialogs`);

    const respuesta = page.locator('#dialog-response');

    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm');
      expect(dialog.message()).toBe('I am a Js Confirm');
      await dialog.accept();
    });
    await page.locator('#js-confirm').click();
    await expect(respuesta).toHaveText('Ok');

    page.once('dialog', async (dialog) => {
      await dialog.dismiss();
    });
    await page.locator('#js-confirm').click();
    await expect(respuesta).toHaveText('Cancel');
  });


  // =========================================================
  // EJERCICIO 7 - ORDENAMIENTO DE LA TABLA
  // =========================================================
  test('Ejercicio 7 - Ordenar la tabla por apellido', async ({ page }) => {
    await page.goto(`${BASE_URL}/tables`);

    const tabla = page.locator('#table1');
    const apellidos = tabla.locator('tbody tr td:nth-child(1)');
    const encabezado = tabla.locator('thead th').filter({ hasText: 'Last Name' });

    await expect(apellidos).toHaveCount(4);

    // Primer clic: orden ascendente
    await encabezado.click();
    const ascendente = await apellidos.allInnerTexts();
    expect(ascendente).toEqual([...ascendente].sort((a, b) => a.localeCompare(b)));

    // Segundo clic: orden descendente
    await encabezado.click();
    const descendente = await apellidos.allInnerTexts();
    expect(descendente).toEqual(
      [...descendente].sort((a, b) => a.localeCompare(b)).reverse()
    );
  });


  // =========================================================
  // EJERCICIO 8 - ADJUNTOS AL REPORTE HTML
  // =========================================================
  test('Ejercicio 8 - Adjuntar evidencia al reporte HTML', async ({ page }, testInfo) => {
    await page.goto(`${BASE_URL}/tables`);

    const filas = await page.locator('#table1 tbody tr').allInnerTexts();

    await testInfo.attach('captura-tabla', {
      body: await page.locator('#table1').screenshot(),
      contentType: 'image/png',
    });

    await testInfo.attach('datos-tabla', {
      body: JSON.stringify({ url: page.url(), filas }, null, 2),
      contentType: 'application/json',
    });

    expect(filas.length).toBeGreaterThan(0);
  });


  // =========================================================
  // EJERCICIO 9 - DEFECTO CONOCIDO: IMÁGENES ROTAS
  // =========================================================
  test(
    'Ejercicio 9 - Defecto conocido: imágenes rotas',
    {
      annotation: {
        type: 'bug',
        description:
          'BUG-11-01 (reportes/bug-report-clase11.md): asdf.jpg y hjkl.jpg ' +
          'responden 404. Registro en GitHub pendiente.',
      },
    },
    async ({ page }, testInfo) => {
      // Precondiciones con aserciones normales: si el sitio está caído,
      // el test falla de forma INESPERADA y no se confunde con el defecto.
      const respuesta = await page.goto(`${BASE_URL}/broken-images`);
      expect(respuesta?.status()).toBe(200);

      const imagenes = page.locator('#core .container img');
      await expect(imagenes).toHaveCount(3);

      fs.mkdirSync('./evidencias/clase11', { recursive: true });
      await page.screenshot({
        path: `./evidencias/clase11/imagenes-rotas-${testInfo.project.name}.png`,
        fullPage: true,
      });

      const estado = await imagenes.evaluateAll((imgs) =>
        (imgs as HTMLImageElement[]).map((img) => ({
          src: img.getAttribute('src'),
          naturalWidth: img.naturalWidth,
        }))
      );

      await testInfo.attach('estado-imagenes', {
        body: JSON.stringify(estado, null, 2),
        contentType: 'application/json',
      });

      // A partir de aquí se espera el fallo: si el defecto se corrige,
      // el test pasará "inesperadamente" y avisará que hay que quitar la marca.
      test.fail(true, 'Defecto conocido BUG-11-01: dos imágenes rotas en /broken-images');

      for (const img of estado) {
        expect.soft(img.naturalWidth, `La imagen ${img.src} debe cargar`).toBeGreaterThan(0);
      }
    }
  );

});
