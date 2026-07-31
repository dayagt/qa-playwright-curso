import { test, expect } from '@playwright/test';

test.describe('Clase 03 - Locators en DemoBlaze', () => {

  // TEST 1: Locator por texto
  test('Locator por texto: verificar elementos del menú', async ({ page }) => {
    await page.goto('/');

    const nav = page.locator('#navbarExample');

    await expect(nav.getByText('Home')).toBeVisible();
    await expect(nav.getByText('Contact')).toBeVisible();
    await expect(nav.getByText('About us')).toBeVisible();
    await expect(
      nav.getByText('Cart', { exact: true })
    ).toBeVisible();
  });

  // TEST 2: Locator por CSS
  test('Locator por CSS: productos en la página principal', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.card-title');

    const tarjetas = page.locator('.card');
    const cantidad = await tarjetas.count();

    expect(cantidad).toBeGreaterThan(0);

    const primerProducto = page.locator('.card-title a').first();
    const nombreProducto = await primerProducto.textContent();

    expect(nombreProducto).not.toBeNull();
  });

  // TEST 3: Locator por ID
  test('Locator por ID: campos del modal de login', async ({ page }) => {
    await page.goto('/');

    await page
      .locator('#navbarExample')
      .getByRole('link', { name: 'Log in', exact: true })
      .click();

    await page.waitForSelector('#logInModal', {
      state: 'visible'
    });

    await expect(page.locator('#loginusername')).toBeVisible();
    await expect(page.locator('#loginpassword')).toBeVisible();
  });

  // TEST 4: Locator por atributo
  test('Locator por atributo: imagen del primer producto', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.card-title');

    await page.locator('.card-title a').first().click();
    await page.waitForLoadState('domcontentloaded');

    const imagenProducto = page.locator('.product-image img');

    await expect(imagenProducto).toBeVisible();

    const srcImagen = await imagenProducto.getAttribute('src');

    expect(srcImagen).not.toBeNull();
  });

  // TEST 5: Locators encadenados
  test('Locators encadenados: precio dentro de una tarjeta', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.card-title');

    // Buscar únicamente dentro de la primera tarjeta
    const primeraTarjeta = page.locator('.card').first();
    const precio = primeraTarjeta.locator('h5');

    await expect(precio).toBeVisible();
  });

  // TEST 6: Negación
  test('Verificar que NO existe un elemento (negación)', async ({ page }) => {
    await page.goto('/');

    const mensajeVacio = page.getByText('No products found');

    await expect(mensajeVacio).not.toBeVisible();
  });

test('Reto 1: Locator por rol - botón Place Order', async ({ page }) => {
  await page.goto('/cart.html');

  
  const botonPlaceOrder = page.getByRole('button', { name: 'Place Order' });
  await expect(botonPlaceOrder).toBeVisible();
});

test('Reto 2: Locator con filter() - precio de producto específico', async ({ page }) => {
  await page.goto('/');

  
  const producto = page.locator('.card').filter({ hasText: 'Samsung galaxy s6' });
  const precio = await producto.locator('h5').textContent();

  expect(precio).not.toBeNull();
  console.log('Precio del producto:', precio);
});

test('Reto 3: Locator por atributo parcial - categorías del sidebar', async ({ page }) => {
  await page.goto('/');

  
  const categorias = page.locator('a[onclick*="byCat"]');

  
  await expect(categorias).toHaveCount(3);

  
  await expect(categorias.filter({ hasText: 'Phones' })).toBeVisible();
  await expect(categorias.filter({ hasText: 'Laptops' })).toBeVisible();
  await expect(categorias.filter({ hasText: 'Monitors' })).toBeVisible();
});

});