import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillForm(firstName: string, lastName: string, postalCode: string) {
    await this.page.locator('#first-name').fill(firstName);
    await this.page.locator('#last-name').fill(lastName);
    await this.page.locator('#postal-code').fill(postalCode);
  }

  async finishPurchase() {
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await this.page.getByRole('button', { name: 'Finish' }).click();
    await expect(this.page.locator('.complete-header')).toHaveText('Thank you for your order!');
  }
}