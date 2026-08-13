# Tabla de Decisión - Proceso de Checkout

## Objetivo

Validar el comportamiento real del proceso de checkout de SauceDemo
considerando la autenticación del usuario, el contenido del carrito,
el formulario de checkout y la finalización de la compra.

## Comportamiento verificado

Antes de construir la tabla de decisión se verificó el comportamiento
real de la aplicación mediante pruebas automatizadas con Playwright.

- Un usuario sin sesión no puede acceder directamente al checkout.
- Un usuario autenticado puede acceder al checkout aunque el carrito esté vacío.
- Si el formulario está vacío, se muestra el error "First Name is required".
- Los mensajes de error cambian dependiendo del campo obligatorio faltante.

## Tabla de decisión

| Condiciones / Reglas | R1 | R2 | R3 | R4 | R5 | R6 |
|---|---|---|---|---|---|---|
| Usuario autenticado | Sí | Sí | No | Sí | Sí | Sí |
| Carrito con items | Sí | No | — | Sí | Sí | Sí |
| Formulario completo | Sí | — | — | No | No | No |
| Clic en Finish | Sí | No | No | No | No | No |
| **Resultado esperado** | Compra completada | Permite acceder al checkout con carrito vacío | Acceso al checkout bloqueado | Error: First Name is required | Error: Last Name is required | Error: Postal Code is required |

## Descripción de las reglas

### Regla 1 - Flujo correcto

El usuario está autenticado, tiene productos en el carrito,
completa correctamente el formulario y finaliza la compra.

**Resultado esperado:** La compra puede completarse correctamente.

### Regla 2 - Carrito vacío

El usuario está autenticado, pero no tiene productos en el carrito
e intenta iniciar el checkout.

**Resultado esperado:** SauceDemo permite avanzar a
`checkout-step-one.html` aunque el carrito esté vacío.

### Regla 3 - Usuario sin autenticación

El usuario intenta acceder directamente al checkout sin haber
iniciado sesión.

**Resultado esperado:** El sistema bloquea el acceso y muestra
un mensaje indicando que debe iniciar sesión.

### Regla 4 - First Name faltante

El usuario inicia el checkout pero no proporciona el First Name.

**Resultado esperado:**

`Error: First Name is required`

### Regla 5 - Last Name faltante

El usuario proporciona los demás datos, pero deja vacío el Last Name.

**Resultado esperado:**

`Error: Last Name is required`

### Regla 6 - Postal Code faltante

El usuario proporciona los demás datos, pero deja vacío el Postal Code.

**Resultado esperado:**

`Error: Postal Code is required`

## Conclusión

La tabla fue construida a partir del comportamiento real observado
en SauceDemo mediante pruebas automatizadas con Playwright.

Se comprobó que el sistema protege el checkout cuando el usuario
no está autenticado. Sin embargo, permite iniciar el proceso de
checkout con un carrito vacío.

También se comprobó que las validaciones del formulario muestran
mensajes diferentes dependiendo del campo obligatorio que falta.