# Auditoría de las Clases 01–11 y sus tareas

Proyecto: `qa-playwright-curso` · Rama: `main` · Fecha: 2026-10-16
Playwright 1.61.1 · Node v22.18.0 · TypeScript 5.9.3 (instalación global, sin dependencias nuevas)

## 1. Resumen ejecutivo

- **Clase 11 y Tarea 11 completadas.** La tarea 11 en Firefox da **2 passed, 1 skipped**
  (5 ejecuciones consecutivas tras las correcciones).
- **Se encontraron y corrigieron 2 fallos en clases anteriores** (cambios mínimos):
  - **Regresión de la Clase 10 que rompía la Tarea 08 (Reto 3):** `helpers/auth.ts` esperaba
    siempre `/inventory/`, y con `locked_out_user` lanzaba un timeout.
  - **Clase 06 (Reto 3):** fallaba siempre porque `removeProductByName` usaba un selector incorrecto.
- Clases y tareas 1–10 ejecutadas **una vez en Chromium** (91 tests): 89 passed y 2 failed
  (los dos anteriores). Tras corregirlos, los archivos afectados se ejecutaron otra vez en Chromium:
  32 passed y 1 skipped (el skip es intencional).
- **No se ejecutaron las clases 1–10 en Firefox, WebKit ni móviles** (por la entrega urgente).
- **No hay documentación oficial de las guías de clase en el repositorio.** Los requisitos se
  infieren de los README, de los títulos de los tests y de los mensajes de commit. Donde no hay
  base suficiente, se marca **SIN DOCUMENTACIÓN**.

## 2. Estado de las 11 clases y las 11 tareas

Estados: CUMPLE · PARCIAL · NO CUMPLE · NO VERIFICADO · SIN DOCUMENTACIÓN.
«Ejecución» se refiere a Chromium salvo que se indique otra cosa.

| # | Tema (según el repositorio) | Laboratorio | Estado lab | Tarea / retos | Estado tarea | Ejecución real |
|---|---|---|---|---|---|---|
| 01 | Setup + DemoBlaze | `tests/clase01.spec.ts` | CUMPLE | README con datos y captura `docs/tests-passing.png` | CUMPLE | 3/3 passed |
| 02 | Navegación y esperas | `tests/clase02.spec.ts` | CUMPLE | Sección de evidencias en el README + `evidencias/01..04` | PARCIAL (el README cita `pagina-inicio.png`; los archivos se llaman `01-pagina-inicio.png`. `05-footer.png` no existe) | 4/4 passed |
| 03 | Locators | `tests/clase03.spec.ts` (6 + 3 retos) | CUMPLE | Retos 1–3 + `casos-de-prueba/TC-001.md` | CUMPLE | 9/9 passed |
| 04 | Principios ISTQB / flujo de usuario | `tests/clase04.spec.ts` (4 + 3 retos) | CUMPLE con riesgo | Retos + reflexión en el README | CUMPLE | 7/7 passed |
| 05 | Assertions y técnicas de diseño | `tests/clase05.spec.ts` (14 + 3 retos) | CUMPLE | Retos `toHaveValue`, `toBeFocused`, `toHaveCSS` + tabla de decisión | PARCIAL (el README dice «12 + 3» y `tabla-de-decision-checkout.md`; el archivo real es `tabla-decision-checkout.md`) | 17/17 passed |
| 06 | Page Object Model | `tests/clase06.spec.ts` + `pages/` | CUMPLE | Retos 1–3 en el mismo archivo | **NO CUMPLE → corregido** (Reto 3) | 7 passed, 1 failed → tras corregir: passed |
| 07 | Reportes profesionales (según `tarea07`) | `tests/claseo7.spec.ts` | PARCIAL / SIN DOCUMENTACIÓN | `tests/tarea07.spec.ts` (`test.step`, `attach`, `toHaveScreenshot`) | CUMPLE en Chromium | lab 5/5, tarea 3/3 |
| 08 | Hooks, modos parallel/serial | `tests/clase08.spec.ts` | CUMPLE | `tests/tarea08.spec.ts` (serial, `test.slow`, `test.skip` dinámico) | **NO CUMPLE → corregido** (Reto 3, regresión) | lab 7/7; tarea 4 passed, 1 failed → tras corregir: 4 passed + 1 skipped (intencional) |
| 09 | Fixtures | `tests/clase09.spec.ts` + `fixtures/index.ts` | PARCIAL | `tests/tarea09.spec.ts` | CUMPLE | lab 5/5, tarea 5/5 |
| 10 | Multi-browser, tags | `tests/clase10-smoke.spec.ts`, `tests/clase10-regression.spec.ts` | CUMPLE (solo Chromium verificado) | `tests/tarea10.spec.ts` (tags, `expect.soft`, `browserName`) | CUMPLE (solo Chromium verificado) | 5/5, 5/5, 3/3 |
| 11 | Gestión de defectos y reportes | `tests/clase11.spec.ts` + `reportes/bug-report-clase11.md` | CUMPLE | `tests/tarea11.spec.ts` | CUMPLE | Tarea en Firefox: 2 passed + 1 skipped. Lab en los 5 proyectos: 40 passed + 5 flaky, 0 failed |

No existen archivos `tarea01`–`tarea06`. En esas clases los «retos» de la tarea están dentro del
archivo de la clase o en el README. Sin la guía oficial no se puede confirmar si eso era lo pedido.

## 3. Archivos encontrados

| Tipo | Archivos |
|---|---|
| Tests | `clase01`–`clase06`, `claseo7` (con letra «o»), `clase08`, `clase09`, `clase10-smoke`, `clase10-regression`, `clase11`, `tarea07`–`tarea11` |
| Snapshots | `tests/tarea07.spec.ts-snapshots/clase07-inventario-visual-chromium-win32.png` (solo para Chromium) |
| POM | `pages/LoginPage.ts`, `InventoryPage.ts`, `CartPage.ts`, `CheckoutPage.ts`, `MenuPage.ts` |
| Fixtures/helpers | `fixtures/index.ts`, `helpers/auth.ts`, `helpers/anuncios.ts` (nuevo) |
| Documentación | `README.md`, `casos-de-prueba/TC-001.md`, `casos-de-prueba/tabla-decision-checkout.md`, `documentos/sqa-plan-saucedemo.md` (vacío, 0 bytes) |
| Evidencias | `evidencias/*.png`, `evidencias/clase09/clase09-inventario.png` (ningún test la genera), `evidencias/clase11/` (nueva), `docs/tests-passing.png`, `reporte-multi-browser.png` |
| Reportes | `reportes/bug-report-clase11.md`, `reportes/auditoria-clases-01-11.md` (nuevos) |

## 4. Hallazgos por clase (revisión estática + ejecución)

- **Clase 02:** escribe capturas en `./evidencias/` (archivos versionados). Cada ejecución desde
  la raíz del proyecto las sobrescribe.
- **Clase 04:** el usuario se genera a nivel de módulo (`Date.now()`) y los tests dependen del orden
  (primero se registra, después se hace login). Con `retries: 1`, el worker se reinicia y genera
  otro usuario, así que un reintento del login falla. Usa esperas fijas (`waitForTimeout`).
  También sobrescribe `evidencias/registro-llenado.png` y `carrito-con-producto.png`.
  Crea usuarios reales en DemoBlaze.
- **Clase 05:** en 17 tests se repite el login completo; el helper `loginAs` existía después.
  Riesgo bajo.
- **Clase 06:** `InventoryPage.removeProductByName` usaba `getByText(name).locator('..')`. Ese
  padre es el `<a>` del título, que no contiene el botón Remove (comprobado: 0 coincidencias).
  **Corregido.**
- **Clase 07:** `claseo7.spec.ts` tiene un error en el nombre y su `describe` dice
  «Clase 06 - Page Object Model»: el contenido duplica la Clase 06, no trata de reportes. Hace
  falta la guía para saber qué se pedía (SIN DOCUMENTACIÓN). `tarea07` Reto 3 solo tiene baseline
  para Chromium: en firefox/webkit/móviles fallará y creará baselines nuevos. Es un riesgo de
  regresión desde que la Clase 10 añadió 5 proyectos.
- **Clase 08:** el `afterEach` escribe `evidencias/fallo-*.png` solo cuando un test falla.
- **Tarea 08:** **regresión.** El commit `6a392d0` (Clase 10) añadió
  `waitForURL(/inventory/)` a `loginAs`. Con `locked_out_user` lanzaba un timeout antes del
  `test.skip()` dinámico. **Corregido** esperando `.inventory_list` **o** `[data-test="error"]`.
- **Clase 09:** el fixture worker `contador` está definido pero **ningún test lo usa**. Los tests
  incrementan una variable global de módulo, así que el Reto 2 no demuestra un fixture de worker
  (PARCIAL). Los Retos 1 (teardown) y 3 (viewports) cumplen. `tarea09` sí lo implementa bien
  (`try/finally`, worker fixture usado, modo serial).
- **Clase 10:** los tags `@smoke` y `@regression` son correctos. Hay 5 proyectos en
  `playwright.config.ts`, pero en esta auditoría solo se ejecutó Chromium.
- **Clase 11:** ver la sección 6.

## 5. Comandos ejecutados y resultados reales

| Comando | Resultado |
|---|---|
| `tsc --noEmit -p .` (inicial y final) | 0 errores |
| `npx playwright test tests/tarea11.spec.ts --project=firefox` (ejecución 1) | 1 failed, 1 passed, 1 skipped. Bug del test: un 304 se contaba como fallo de navegación |
| Ídem (ejecución 2) | 1 flaky, 1 passed, 1 skipped. Timeout al cerrar el contexto por los anuncios |
| Ídem (ejecuciones 3, 4 y 5, tras las correcciones) | **2 passed, 1 skipped** en las tres |
| `npx playwright test tests/tarea11.spec.ts --project=firefox --workers=1 --reporter=list` (final) | **2 passed, 1 skipped** (frecuencia del typo 1/12) |
| `tests/clase11.spec.ts`, los 5 proyectos (última ejecución) | 40 passed, 5 flaky, 0 failed |
| Clases y tareas 1–10, `--project=chromium` (91 tests) | 89 passed, 2 failed (clase06 Reto 3, tarea08 Reto 3) |
| clase06, clase08, tarea08, clase10, tarea10 en Chromium tras corregir | 32 passed, 1 skipped (tarea08 Reto 3, skip intencional) |

Las clases 1–10 se ejecutaron con el directorio de trabajo en una carpeta temporal y
`--config` apuntando al proyecto, para que sus capturas no sobrescribieran `evidencias/`.
Se verificó que los hashes de `evidencias/*.png` no cambiaron.

## 6. Clase 11 y Tarea 11

**Laboratorio (`tests/clase11.spec.ts`):** 9 ejercicios: página principal, login válido,
login inválido, controles dinámicos, alert, confirm (aceptar/cancelar), ordenamiento de tabla,
adjuntos (captura + JSON) e imágenes rotas con anotación `bug` y `test.fail()`. El
`test.fail()` se activa en tiempo de ejecución **después** de verificar HTTP 200 y que haya
3 imágenes, para que una caída del sitio no cuente como «fallo esperado».

**Tarea (`tests/tarea11.spec.ts`):**
- **Reto 1:** 12 observaciones (1 `goto` + 11 `reload`). Cada una se clasifica como
  `correcto`, `typo`, `fallo-navegacion` o `contenido-no-encontrado`. La frecuencia se adjunta en
  `frecuencia-typo.json` y como anotación `frecuencia`. La prueba valida la medición (12
  observaciones válidas), no el número de typos, que es aleatorio.
- **Reto 2:** `test.fixme(title, { annotation: { type: 'issue', ... } }, body)`, sin número de
  Issue inventado. Se reactiva cuando el Issue se cierre y el Reto 1 mida 0 typos.
- **Reto 3:** `test.afterEach` que adjunta `borrador-bug-report.md` (`text/markdown`) solo con
  estado `failed`, `timedOut` o `interrupted`. Todo va dentro de `try/catch` para no ocultar el
  error original. Lo activa el test de imágenes rotas (`test.fail`).
- Comportamiento verificado en 1.61.1: un `test.fail` que falla cuenta como *passed*, y un
  `test.fixme` declarado no ejecuta ni el cuerpo ni el `afterEach`.

## 7. Problemas de ambiente

- `headless: false`, `slowMo: 500`, `video: 'on'` y `trace: 'on'` con `retries: 1` hacen que
  los tests sean lentos. En WebKit, cerrar el contexto tardó hasta unos 21 s (video + websocket
  `socket.io` del sitio), y ese tiempo cuenta dentro del timeout de 30 s. Esa es la causa de los
  5 flaky del laboratorio. No se cambió `playwright.config.ts` porque afecta a todas las clases.
- Los anuncios y la analítica de expandtesting bloqueaban el navegador. Se bloquean solo esos
  dominios (`helpers/anuncios.ts`); jQuery y los CDN no se bloquean.
- En mobile-chrome (Pixel 5), Playwright no podía hacer clic en «Enable» después de Remove/Add:
  el sitio duplica `<div id="loading">` y el botón queda fuera del visual viewport. Un toque
  real sí funcionaba. Se resolvió reordenando el ejercicio, sin quitar aserciones.

## 8. Cambios realizados

| Archivo | Tipo | Motivo |
|---|---|---|
| `tests/clase11.spec.ts` | nuevo | Laboratorio de la Clase 11 |
| `tests/tarea11.spec.ts` | nuevo | Tarea 11 (3 retos) |
| `helpers/anuncios.ts` | nuevo | Bloqueo de anuncios y analítica para estabilizar la Clase 11 |
| `reportes/bug-report-clase11.md` | nuevo | BUG-11-01 (imágenes rotas) y BUG-11-02 (typo) |
| `reportes/auditoria-clases-01-11.md` | nuevo | Este documento |
| `evidencias/clase11/imagenes-rotas-<proyecto>.png` | nuevo | Generadas por el Ejercicio 9 |
| `helpers/auth.ts` | modificado (+7 / -2 líneas) | Corrige la regresión de la Tarea 08 Reto 3 |
| `pages/InventoryPage.ts` | modificado (+4 / -1 líneas) | Corrige el selector de `removeProductByName` (Clase 06 Reto 3) |

Al comenzar, el árbol de trabajo estaba **limpio** (`git status` vacío): no había cambios
previos del usuario que preservar. Los artefactos de la ejecución anterior (`playwright-report/`,
`test-results/`, ignorados por Git) se copiaron antes de ejecutar a
`C:\Users\Dayanna\qa-playwright-curso-respaldo-artefactos-2026-10-16\`, junto con la evidencia
de las dos primeras ejecuciones fallidas de la tarea 11.

## 9. Riesgos y pendientes

1. Registrar BUG-11-01 y BUG-11-02 en GitHub y actualizar la anotación `issue` del Reto 2
   (acción manual).
2. Completar «Reportado por» en `reportes/bug-report-clase11.md`.
3. Clases 1–10 sin verificar en firefox, webkit, mobile-chrome y mobile-safari (NO VERIFICADO).
4. `tarea07` Reto 3 fallará fuera de Chromium mientras no haya baseline: decidir si se limita a
   Chromium o se generan baselines.
5. Revisar `claseo7.spec.ts` (nombre y contenido) con la guía oficial de la Clase 07.
6. Clase 09 Reto 2: usar el fixture `contador` en los tests.
7. Clase 04: depende del orden y crea usuarios reales; frágil con reintentos.
8. Valorar `video: 'retain-on-failure'` / `trace: 'retain-on-failure'` para reducir timeouts
   (cambio de configuración global: es decisión de la estudiante).
9. Corregir el README (nombres de archivos y conteo de tests de la Clase 05).
   `documentos/sqa-plan-saucedemo.md` está vacío.

## 10. Estado final de Git

Sin commits, sin push, sin cambio de rama (`main`). Los cambios quedan sin confirmar en el árbol de
trabajo (ver `git status --short`).
