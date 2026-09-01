import { Page, expect } from '@playwright/test';

export class MenuPage {
  constructor(private page: Page) {}

  async openMenu() {
    await this.page.locator('#react-burger-menu-btn').click();
  }

  async logout() {
    await this.page.locator('#logout_sidebar_link').click();
    await expect(this.page.locator('#login-button')).toBeVisible();
  }
}