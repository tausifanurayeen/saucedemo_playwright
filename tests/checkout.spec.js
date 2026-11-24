
import { test, expect } from '@playwright/test';
import { logoutIfPossible } from './test-helpers.js';

test.describe('SauceDemo - Checkout Tests', () => {

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

  });

  test('TC043 - Verify checkout page', async ({ page }) => {
    await expect(page).toHaveURL(/checkout-step-one/);
    await expect(page.locator('.title'))
      .toHaveText('Checkout: Your Information');
  });

  test('TC044 - Verify checkout fields', async ({ page }) => {
    await expect(page.locator('[data-test="firstName"]')).toBeVisible();
    await expect(page.locator('[data-test="lastName"]')).toBeVisible();
    await expect(page.locator('[data-test="postalCode"]')).toBeVisible();
  });

  test('TC045 - Valid customer information', async ({ page }) => {

    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Smith');
    await page.locator('[data-test="postalCode"]').fill('1207');

    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(/checkout-step-two/);
  });

  test('TC046 - Empty first name', async ({ page }) => {

    await page.locator('[data-test="lastName"]').fill('Smith');
    await page.locator('[data-test="postalCode"]').fill('1207');

    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('First Name is required');
  });

  test('TC047 - Empty last name', async ({ page }) => {

    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="postalCode"]').fill('1207');

    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Last Name is required');
  });

  test('TC048 - Empty postal code', async ({ page }) => {

    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Smith');

    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Postal Code is required');
  });

  test('TC049 - All fields empty', async ({ page }) => {

    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('First Name is required');
  });

  test('TC050 - Cancel checkout', async ({ page }) => {

    await page.locator('[data-test="cancel"]').click();

    await expect(page).toHaveURL(/cart/);
  });

  test('TC051 - Verify order summary', async ({ page }) => {

    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Smith');
    await page.locator('[data-test="postalCode"]').fill('1207');

    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('.cart_item')).toHaveCount(1);

    await expect(page.locator('.inventory_item_name'))
      .toHaveText('Sauce Labs Backpack');

    await expect(page.locator('.inventory_item_price'))
      .toHaveText('$29.99');
  });

  test('TC052 - Verify total price calculation', async ({ page }) => {

    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Smith');
    await page.locator('[data-test="postalCode"]').fill('1207');

    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('.summary_subtotal_label'))
      .toHaveText('Item total: $29.99');

    await expect(page.locator('.summary_tax_label'))
      .toHaveText('Tax: $2.40');

    await expect(page.locator('.summary_total_label'))
      .toHaveText('Total: $32.39');
  });

  test.afterEach(async ({ page }) => {
    await logoutIfPossible(page);
  });

});
