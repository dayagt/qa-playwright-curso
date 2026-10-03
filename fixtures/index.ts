
import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

type AppFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
};

export const test = base.extend<AppFixtures>({

  
  loginPage: async ({ page }, use) => {
    const lp = new LoginPage(page);
    await lp.navigate();
    await use(lp);
  },

  
  inventoryPage: async ({ page }, use) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL(/inventory/);

    const ip = new InventoryPage(page);
    await use(ip);
  },

  
  cartPage: async ({ page }, use) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL(/inventory/);

    
    await page.locator('.btn_inventory').first().click();

    
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart/);

    
    await expect(
      page.locator('.cart_item').first()
    ).toBeVisible();

    const cp = new CartPage(page);
    await use(cp);
  },

});

export { expect } from '@playwright/test';