
import { test, expect } from '@playwright/test';
import { logoutIfPossible } from './test-helpers.js';

test.describe('SauceDemo - Order Completion Tests', () => {

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

    await page.locator('[data-test="checkout"]').click();

    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Smith');
    await page.locator('[data-test="postalCode"]').fill('1207');

    await page.locator('[data-test="continue"]').click();

  });

  test('TC053 - Verify Finish button', async ({ page }) => {
    await expect(page.locator('[data-test="finish"]')).toBeVisible();
  });

  test('TC054 - Complete an order', async ({ page }) => {

    await page.locator('[data-test="finish"]').click();

    await expect(page).toHaveURL(/checkout-complete/);
  });

  test('TC055 - Verify confirmation message', async ({ page }) => {

    await page.locator('[data-test="finish"]').click();

    await expect(page.locator('.complete-header'))
      .toHaveText('Thank you for your order!');
  });

  test('TC056 - Verify confirmation description', async ({ page }) => {

    await page.locator('[data-test="finish"]').click();

    await expect(page.locator('.complete-text'))
      .toContainText('Your order has been dispatched');
  });

  test('TC057 - Verify confirmation page title', async ({ page }) => {

    await page.locator('[data-test="finish"]').click();

    await expect(page.locator('.title'))
      .toHaveText('Checkout: Complete!');
  });

  test('TC058 - Back Home navigation', async ({ page }) => {

    await page.locator('[data-test="finish"]').click();

    await page.locator('[data-test="back-to-products"]').click();

    await expect(page).toHaveURL(/inventory/);

    await expect(page.locator('.title'))
      .toHaveText('Products');
  });

  test('TC059 - Verify cart after order completion', async ({ page }) => {

    await page.locator('[data-test="finish"]').click();

    await expect(
      page.locator('[data-test="shopping-cart-badge"]')
    ).toHaveCount(0);
  });

  test.afterEach(async ({ page }) => {
    await logoutIfPossible(page);
  });

});
