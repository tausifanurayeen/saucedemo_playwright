
import { test, expect } from '@playwright/test';

test.describe('SauceDemo - Checkout Tests', () => {

  test.beforeEach(async ({ page }) => {

    // Login
    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]')
      .fill('standard_user');

    await page.locator('[data-test="password"]')
      .fill('secret_sauce');

    await page.locator('[data-test="login-button"]')
      .click();

    // Add product
    await page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    ).click();

    // Open cart
    await page.locator(
      '[data-test="shopping-cart-link"]'
    ).click();

    // Go to checkout
    await page.locator('[data-test="checkout"]')
      .click();

  });

  // TC043 - Verify checkout page
  test('Verify checkout information page', async ({ page }) => {

    await expect(page).toHaveURL(/checkout-step-one/);

    await expect(page.locator('.title'))
      .toHaveText('Checkout: Your Information');

  });

  // TC044 - Verify checkout fields
  test('Verify checkout input fields', async ({ page }) => {

    await expect(page.locator('[data-test="firstName"]'))
      .toBeVisible();

    await expect(page.locator('[data-test="lastName"]'))
      .toBeVisible();

    await expect(page.locator('[data-test="postalCode"]'))
      .toBeVisible();

  });

  // TC045 - Checkout with valid information
  test('Checkout with valid customer information', async ({ page }) => {

    await page.locator('[data-test="firstName"]')
      .fill('John');

    await page.locator('[data-test="lastName"]')
      .fill('Smith');

    await page.locator('[data-test="postalCode"]')
      .fill('1207');

    await page.locator('[data-test="continue"]')
      .click();

    await expect(page).toHaveURL(/checkout-step-two/);

    await expect(page.locator('.title'))
      .toHaveText('Checkout: Overview');

  });

  // TC046 - Empty first name
  test('Checkout without first name', async ({ page }) => {

    await page.locator('[data-test="lastName"]')
      .fill('Smith');

    await page.locator('[data-test="postalCode"]')
      .fill('1207');

    await page.locator('[data-test="continue"]')
      .click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('First Name is required');

  });

  // TC047 - Empty last name
  test('Checkout without last name', async ({ page }) => {

    await page.locator('[data-test="firstName"]')
      .fill('John');

    await page.locator('[data-test="postalCode"]')
      .fill('1207');

    await page.locator('[data-test="continue"]')
      .click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Last Name is required');

  });

  // TC048 - Empty postal code
  test('Checkout without postal code', async ({ page }) => {

    await page.locator('[data-test="firstName"]')
      .fill('John');

    await page.locator('[data-test="lastName"]')
      .fill('Smith');

    await page.locator('[data-test="continue"]')
      .click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Postal Code is required');

  });

  // TC049 - All fields empty
  test('Checkout with all fields empty', async ({ page }) => {

    await page.locator('[data-test="continue"]')
      .click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('First Name is required');

  });

  // TC050 - Cancel checkout
  test('Cancel checkout and return to cart', async ({ page }) => {

    await page.locator('[data-test="cancel"]')
      .click();

    await expect(page).toHaveURL(/cart/);

    await expect(page.locator('.title'))
      .toHaveText('Your Cart');

  });

  // TC051 - Verify order summary
  test('Verify order summary', async ({ page }) => {

    await page.locator('[data-test="firstName"]')
      .fill('John');

    await page.locator('[data-test="lastName"]')
      .fill('Smith');

    await page.locator('[data-test="postalCode"]')
      .fill('1207');

    await page.locator('[data-test="continue"]')
      .click();

    await expect(page.locator('.cart_item'))
      .toHaveCount(1);

    await expect(page.locator('.inventory_item_name'))
      .toHaveText('Sauce Labs Backpack');

    await expect(page.locator('.inventory_item_price'))
      .toHaveText('$29.99');

  });

  // TC052 - Verify total price calculation
  test('Verify item total, tax and final total', async ({ page }) => {

    await page.locator('[data-test="firstName"]')
      .fill('John');

    await page.locator('[data-test="lastName"]')
      .fill('Smith');

    await page.locator('[data-test="postalCode"]')
      .fill('1207');

    await page.locator('[data-test="continue"]')
      .click();

    await expect(page.locator('.summary_subtotal_label'))
      .toHaveText('Item total: $29.99');

    await expect(page.locator('.summary_tax_label'))
      .toHaveText('Tax: $2.40');

    await expect(page.locator('.summary_total_label'))
      .toHaveText('Total: $32.39');

  });

});
