# QA Playwright - Curso 048
 
Aseguramiento de la Calidad del Software · Universidad Mariano Gálvez de Guatemala
Clase 1 · Fundamentos de los Sistemas de Calidad + Setup de Playwright con TypeScript
 
## Datos del estudiante
 
- **Nombre:** [Gelen Dayanna Lopez Morales]
- **Carné:** [1790-21-14904]
- **Versión de Node.js:** [v22.18.0]
 
## Proyecto
 
Suite de pruebas automatizadas end-to-end con [Playwright](https://playwright.dev/) + TypeScript sobre la aplicación demo [DemoBlaze](https://www.demoblaze.com).
 
### Tests incluidos (`tests/clase01.spec.ts`)
 
1. **La página carga** — verifica el título de la página y que la barra de navegación sea visible.
2. **El menú de categorías es visible** — verifica el elemento `#cat`.
3. **La barra de navegación tiene los enlaces** — verifica los enlaces Home, Contact, About us, Cart, Log in y Sign up.
 
## Cómo ejecutar
 
```bash
npm install
npx playwright install
npx playwright test
npx playwright show-report
```
 
## Resultado de los tests
 
3 de 3 tests pasando:
 
![Tests pasando](docs/tests-passing.png)

# Evidencias de la Clase 02 — Playwright

## Capturas generadas
Durante la ejecución del archivo `tests/clase02.spec.ts` se generaron **4 capturas de pantalla** en la carpeta `evidencias/`.  
Los archivos corresponden a distintos momentos de la prueba:

- `pagina-inicio.png` → evidencia de la página principal al cargar la aplicación.  
- `carrito-vacio.png` → evidencia del carrito de compras vacío (captura realizada con `fullPage: true`).  
- `detalle-producto.png` → evidencia al visualizar el detalle de un producto en la categoría *Phones*.  
- `navbar.png` → evidencia de la barra de navegación superior.   


## Diferencia entre `fullPage: true` y una captura normal
- **Captura normal**: registra únicamente la parte visible de la ventana del navegador (viewport).  
- **Captura con `fullPage: true`**: recorre toda la página y captura incluso las secciones que requieren desplazamiento vertical.  
Esto permite evidenciar elementos como el **footer**, que no siempre está visible en pantalla.

## Importancia de capturar evidencias en pruebas de software
Las capturas de pantalla son esenciales porque:
- Documentan el estado visual de la aplicación en el momento de la prueba.  
- Facilitan la comunicación de errores al equipo de desarrollo.  
- Sirven como respaldo en auditorías y revisiones de calidad.  
- Permiten validar aspectos gráficos que no se reflejan en los logs.

## Auto-wait vs. `sleep()` en Playwright
- **`sleep()`** introduce pausas fijas en la ejecución, lo que puede generar pruebas frágiles: si la aplicación tarda más, el test falla; si tarda menos, se desperdicia tiempo.  
- **Auto-wait** espera dinámicamente hasta que el elemento esté disponible o la acción sea posible.  

### Ventaja para las pruebas automatizadas
El uso de auto-wait hace que las pruebas sean:
- Más **estables**, porque se adaptan al comportamiento real de la aplicación.  
- Más **rápidas**, al evitar tiempos muertos innecesarios.  
- Más **confiables**, ya que reducen la probabilidad de falsos negativos.

---
# Proyecto de Pruebas con Playwright

Este repositorio contiene los tests automatizados del curso **Aseguramiento de la Calidad del Software** (Clase 03).

## 📂 Estructura
- `tests/clase03.spec.ts` → Contiene los 6 tests de clase + 3 tests reto.
- `casos-de-prueba/TC-001.md` → Caso de prueba documentado: "Agregar al carrito".

## Requisitos
- Node.js (>= 18)
- Playwright instalado globalmente o en el proyecto

Instalación de dependencias:
```bash
npm install
npx playwright install
```
# QA Playwright Curso · Clase 04

Este proyecto contiene los tests automatizados de la 'Clase 04 - Principios de Pruebas (ISTQB)' del curso de Aseguramiento de la Calidad del Software.  
Incluye los 4 tests vistos en clase y los 3 tests reto adicionales.

---

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/dayagt/qa-playwright-curso.git
   cd qa-playwright-curso

# Reflexión Tarea 04

De los 7 principios del testing, considero que el más importante es el Principio 3: Las pruebas tempranas ahorran tiempo y dinero.  
La razón es que detectar defectos en etapas iniciales (requisitos, diseño, desarrollo) evita costos elevados y retrabajo en producción.  
En mi experiencia con Playwright, encontrar un locator ambiguo en la primera clase fue rápido y barato; si ese error llegara a producción, el impacto sería mucho mayor.

# Proyecto Clase 05 — Playwright Testing

## Instalación y ejecución
Clona este repositorio:
git clone https://github.com/dayagt/qa-playwright-curso.git
cd qa-playwright-curso

Instala dependencias:
npm install

Ejecuta los tests:
- Todos los tests:
  npx playwright test
- Archivo específico:
  npx playwright test tests/clase05.spec.ts
- Abrir reporte en navegador:
  npx playwright show-report

## Tests reto incluidos
- toHaveValue() → validación de ordenamiento por precio.
- toBeFocused() → validación de foco en campo usuario.
- toHaveCSS() → validación de estilo en botón “Add to cart”.

## Requisitos previos
- Node.js v16 o superior.
- Playwright instalado como dependencia del proyecto.
- Conexión a internet para cargar la aplicación bajo prueba.

## Estructura del proyecto
- tests/clase05.spec.ts → contiene 12 tests base + 3 tests reto.
- casos-de-prueba/tabla-de-decision-checkout.md → documento con mínimo 4 condiciones y 6 reglas.
- README.md → instrucciones de instalación y ejecución.

# QA Playwright Curso · Clase 06

Este proyecto contiene los tests automatizados de la **Clase 06 - Page Object Model (POM) en Sauce Demo**.  
Incluye los 5 tests base vistos en clase y los 3 tests reto adicionales.

---

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/dayagt/qa-playwright-curso.git
   cd qa-playwright-curso

   npm install
Ejecución de los tests
Para correr todos los tests de la Clase 06:
   npx playwright test tests/clase06.spec.ts

Si deseas ejecutar un test específico:
   npx playwright test -g "Reto 3 - Quitar producto y badge desaparece"
Para abrir el reporte en navegador:
npx playwright show-report
