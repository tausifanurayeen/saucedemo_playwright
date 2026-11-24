
import { test, expect } from '@playwright/test';

test.describe('SauceDemo - Shopping Cart Tests', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]')
      .fill('standard_user');

    await page.locator('[data-test="password"]')
      .fill('secret_sauce');

    await page.locator('[data-test="login-button"]')
      .click();

    await expect(page).toHaveURL(/inventory/);

    // Add product before each test
    await page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    ).click();

    // Open shopping cart
    await page.locator(
      '[data-test="shopping-cart-link"]'
    ).click();

  });

  // TC035 - Open shopping cart
  test('Verify shopping cart page opens', async ({ page }) => {

    await expect(page).toHaveURL(/cart/);

  });

  // TC036 - Verify cart page title
  test('Verify shopping cart title', async ({ page }) => {

    await expect(page.locator('.title'))
      .toHaveText('Your Cart');

  });

  // TC037 - Verify cart product count
  test('Verify cart contains one product', async ({ page }) => {

    await expect(page.locator('.cart_item'))
      .toHaveCount(1);

  });

  // TC038 - Verify product name
  test('Verify product name in cart', async ({ page }) => {

    await expect(page.locator('.inventory_item_name'))
      .toHaveText('Sauce Labs Backpack');

  });

  // TC039 - Verify product price
  test('Verify product price in cart', async ({ page }) => {

    await expect(page.locator('.inventory_item_price'))
      .toHaveText('$29.99');

  });

  // TC040 - Verify product quantity
  test('Verify product quantity', async ({ page }) => {

    await expect(page.locator('.cart_quantity'))
      .toHaveText('1');

  });

  // TC041 - Continue shopping
  test('Verify Continue Shopping button', async ({ page }) => {

    await page.locator(
      '[data-test="continue-shopping"]'
    ).click();

    await expect(page).toHaveURL(/inventory/);

  });

  // TC042 - Checkout
  test('Verify Checkout button', async ({ page }) => {

    await page.locator(
      '[data-test="checkout"]'
    ).click();

    await expect(page).toHaveURL(/checkout-step-one/);

    await expect(page.locator('.title'))
      .toHaveText('Checkout: Your Information');

  });

});
