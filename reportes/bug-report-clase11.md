# Bug Reports · Clase 11

Sitio bajo prueba: <https://practice.expandtesting.com>
Pruebas relacionadas: `tests/clase11.spec.ts` (Ejercicio 9) y `tests/tarea11.spec.ts` (Retos 1, 2 y 3).

> **Estado del registro en GitHub:** pendiente. Todavía no se creó ningún Issue,
> así que no hay número ni enlace. Al registrarlo, actualizar este documento y la
> anotación `issue` del Reto 2 en `tests/tarea11.spec.ts`.

---

## BUG-11-01 · Dos imágenes rotas en `/broken-images`

| Campo | Valor |
|---|---|
| **Título** | Las imágenes `asdf.jpg` y `hjkl.jpg` de `/broken-images` no cargan (HTTP 404) |
| **Reportado por** | Pendiente de completar por la persona que registre el Issue |
| **Fecha de detección** | 2026-10-16 |
| **Severidad** | Media: contenido visual faltante, la página sigue siendo usable |
| **Prioridad** | Baja: página de práctica, el defecto es intencional en el sitio |
| **Frecuencia** | Siempre (reproducido en todas las ejecuciones realizadas) |
| **Estado** | Abierto / conocido (marcado con `test.fail()` en las pruebas) |

### Ambiente

| Dato | Valor comprobado |
|---|---|
| Sistema operativo | Windows 11 Home Single Language 10.0.26200 |
| Node.js | v22.18.0 |
| Playwright | 1.61.1 |
| Navegadores | Reproducido en los 5 proyectos de `playwright.config.ts`: `chromium`, `firefox` (Firefox 151.0), `webkit`, `mobile-chrome` (Pixel 5) y `mobile-safari` (iPhone 12) |
| URL | <https://practice.expandtesting.com/broken-images> |

### Descripción

La página muestra tres imágenes. Dos de ellas apuntan a archivos inexistentes
(`asdf.jpg`, `hjkl.jpg`), por lo que el navegador muestra el ícono de imagen rota.

### Pasos para reproducir

1. Abrir <https://practice.expandtesting.com/broken-images>.
2. Observar las tres imágenes de la página (`alt="Image 1"`, `"Image 2"`, `"Image 3"`).
3. Revisar en DevTools → Network las peticiones a `asdf.jpg` y `hjkl.jpg`.

### Resultado esperado

Las tres imágenes cargan (`naturalWidth > 0`) y sus peticiones responden HTTP 200.

### Resultado obtenido (comprobado)

| Imagen | `src` | HTTP | `naturalWidth` |
|---|---|---|---|
| Image 1 | `asdf.jpg` | 404 (`text/html`) | 0 |
| Image 2 | `hjkl.jpg` | 404 (`text/html`) | 0 |
| Image 3 | `/img/avatar-blank.jpg` | 200 (`image/jpeg`) | 160 |

### Evidencia

- Reporte HTML de Playwright: tests *Ejercicio 9* (clase11) y *Reto 3* (tarea11), con
  captura, video, trace, el adjunto `estado-imagenes` (JSON) y el adjunto
  `borrador-bug-report.md` que genera el `afterEach` de la tarea.
- Capturas: `evidencias/clase11/imagenes-rotas-<proyecto>.png` (las genera el Ejercicio 9).
- Abrir el reporte: `npx playwright show-report`.

---

## BUG-11-02 · Error tipográfico intermitente en `/typos`

| Campo | Valor |
|---|---|
| **Título** | El segundo párrafo de `/typos` muestra a veces `won,t` en lugar de `won't` |
| **Reportado por** | Pendiente de completar por la persona que registre el Issue |
| **Fecha de detección** | 2026-10-16 |
| **Severidad** | Baja: error cosmético de texto |
| **Prioridad** | Baja |
| **Frecuencia** | Intermitente. Medida con el Reto 1 (12 observaciones por ejecución), ver abajo |
| **Estado** | Abierto / conocido (validación deshabilitada con `test.fixme` en el Reto 2) |

### Ambiente

Igual que BUG-11-01. Medición realizada en el proyecto `firefox`.

### Pasos para reproducir

1. Abrir <https://practice.expandtesting.com/typos>.
2. Leer el segundo párrafo.
3. Recargar la página varias veces y comparar el texto.

### Resultado esperado

`Sometimes you'll see a typo, other times you won't.` en todas las cargas.

### Resultado obtenido (comprobado)

En una parte de las cargas aparece: `Sometimes you'll see a typo, other times you won,t.`
Es la única variante con error que se observó.

### Frecuencia medida

Cada fila es una ejecución del Reto 1 de `tests/tarea11.spec.ts` en Firefox. Solo se
cuentan las cargas válidas (HTTP 200/304 y párrafo encontrado):

| Ejecución | Cargas válidas | Con typo | % |
|---|---|---|---|
| Exploración manual con script (25 cargas, sin recargar, no es el Reto 1) | 25 | 9 | 36,0 % |
| Ejecución 2 (intento 1) | 12 | 2 | 16,7 % |
| Ejecución 2 (reintento) | 12 | 6 | 50,0 % |
| Ejecución 3 | 12 | 5 | 41,7 % |
| Ejecución de estabilidad 1 | 12 | 6 | 50,0 % |
| Ejecución de estabilidad 2 | 12 | 8 | 66,7 % |
| Ejecución final de entrega (`--workers=1 --reporter=list`) | 12 | 1 | 8,3 % |

La frecuencia varía entre ejecuciones porque el sitio elige el texto al azar en
cada carga. Por eso el Reto 1 mide y adjunta la frecuencia, pero no decide si pasa
o falla según ese valor.

### Evidencia

- Adjunto `frecuencia-typo.json` y anotación `frecuencia` del Reto 1 en el reporte HTML.

---

## Datos no verificados

- La persona reportante y el número o enlace del Issue de GitHub no existen todavía.
- No se comprobó el comportamiento en navegadores fuera de los cinco proyectos de
  `playwright.config.ts`.
