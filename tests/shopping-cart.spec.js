
import { test, expect } from '@playwright/test';
import { logoutIfPossible } from './test-helpers.js';

test.describe('SauceDemo - Shopping Cart Tests', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]')
      .fill('standard_user');

    await page.locator('[data-test="password"]')
      .fill('secret_sauce');

    await page.locator('[data-test="login-button"]').click();

    await page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    ).click();

    await page.locator(
      '[data-test="shopping-cart-link"]'
    ).click();

  });

  test('TC035 - Open shopping cart', async ({ page }) => {
    await expect(page).toHaveURL(/cart/);
  });

  test('TC036 - Verify cart title', async ({ page }) => {
    await expect(page.locator('.title')).toHaveText('Your Cart');
  });

  test('TC037 - Verify cart product count', async ({ page }) => {
    await expect(page.locator('.cart_item')).toHaveCount(1);
  });

  test('TC038 - Verify product name', async ({ page }) => {
    await expect(page.locator('.inventory_item_name'))
      .toHaveText('Sauce Labs Backpack');
  });

  test('TC039 - Verify product price', async ({ page }) => {
    await expect(page.locator('.inventory_item_price'))
      .toHaveText('$29.99');
  });

  test('TC040 - Verify product quantity', async ({ page }) => {
    await expect(page.locator('.cart_quantity')).toHaveText('1');
  });

  test('TC041 - Continue shopping', async ({ page }) => {

    await page.locator('[data-test="continue-shopping"]').click();

    await expect(page).toHaveURL(/inventory/);
  });

  test('TC042 - Checkout button', async ({ page }) => {

    await page.locator('[data-test="checkout"]').click();

    await expect(page).toHaveURL(/checkout-step-one/);

    await expect(page.locator('.title'))
      .toHaveText('Checkout: Your Information');
  });

  test.afterEach(async ({ page }) => {
    await logoutIfPossible(page);
  });

});
