import { Page } from '@playwright/test';

export async function loginAs(page: Page, username: string) {
  const passwords: Record<string, string> = {
    'standard_user': 'secret_sauce',
    'problem_user': 'secret_sauce',
    'performance_glitch_user': 'secret_sauce',
    'locked_out_user': 'secret_sauce',
  };

  await page.goto('https://www.saucedemo.com');
  await page.locator('#user-name').fill(username);
  await page.locator('#password').fill(passwords[username] ?? 'secret_sauce');
  await page.locator('#login-button').click();
  
  // ✅ Esperar a que el login termine (evita race conditions): inventario si
  // fue exitoso, o el mensaje de error si no (p. ej. locked_out_user, que
  // usa tarea08 Reto 3 con test.skip() dinámico)
  await page
    .locator('.inventory_list')
    .or(page.locator('[data-test="error"]'))
    .waitFor({ state: 'visible', timeout: 10000 });
}