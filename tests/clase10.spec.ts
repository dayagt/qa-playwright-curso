import { test, expect } from '@playwright/test';
import { loginAs } from '../helpers/auth'; 

test.describe('Clase 10 - Tests Reto', () => {
  
  test.beforeEach(async ({ page }) => {
   
    await loginAs(page, 'standard_user');
    await expect(page).toHaveURL(/inventory/);
  });

  test('Reto 1: Verificar visibilidad del carrito de compras', { tag: ['@regression', '@ui'] }, async ({ page }) => {
    const carrito = page.locator('.shopping_cart_link');
    await expect(carrito).toBeVisible();
  });

 test('Reto 2: Validar múltiples atributos del primer producto de forma soft', async ({ page }) => {
    const primerItem = page.locator('.inventory_item').first();
    
    const nombre = primerItem.locator('.inventory_item_name');
    const descripcion = primerItem.locator('.inventory_item_desc');
    const precio = primerItem.locator('.inventory_item_price');

    // Usamos expect.soft() para que si uno falla, evalúe los demás y reporte todo al final
    await expect.soft(nombre).toContainText('Sauce Labs Backpack');
    await expect.soft(descripcion).not.toBeEmpty();
    await expect.soft(precio).toContainText('$29.99');
  });

  test('Reto 3: Comportamiento condicional por motor de navegación', async ({ page, browserName }) => {
    const botonMenu = page.locator('#react-burger-menu-btn');
    await expect(botonMenu).toBeVisible();

    // Modificamos o añadimos una aserción condicional según el motor en ejecución
    if (browserName === 'webkit') {
      console.log('Ejecutando lógica específica o validación optimizada para Safari (WebKit)');
      await expect(botonMenu).toBeEnabled();
    } else if (browserName === 'firefox') {
      console.log('Ejecutando validaciones sobre Gecko (Firefox)');
      await expect(botonMenu).toHaveCSS('cursor', 'pointer');
    } else {
      console.log('Ejecutando en Chromium (Chrome/Edge)');
      await expect(botonMenu).toHaveId('react-burger-menu-btn');
    }
  });
});