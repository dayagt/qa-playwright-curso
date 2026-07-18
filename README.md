# QA Playwright - Curso 048
 
Aseguramiento de la Calidad del Software · Universidad Mariano Gálvez de Guatemala
Clase 1 · Fundamentos de los Sistemas de Calidad + Setup de Playwright con TypeScript
 
## Datos del estudiante
 
- **Nombre:** [Gelen Dayanna Lopez Morales
- Salvador André Martínez Juárez]
- **Carné:** [1790-21-14904
- 1790-19-6213]
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
