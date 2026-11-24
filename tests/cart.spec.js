
import { test, expect } from '@playwright/test';

test.describe('SauceDemo - Add to Cart Tests', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]')
      .fill('standard_user');

    await page.locator('[data-test="password"]')
      .fill('secret_sauce');

    await page.locator('[data-test="login-button"]')
      .click();

    await expect(page).toHaveURL(/inventory/);

  });

  // TC028 - Add one product
  test('Add one product to cart', async ({ page }) => {

    await page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    ).click();

    await expect(
      page.locator('[data-test="shopping-cart-badge"]')
    ).toHaveText('1');

  });

  // TC029 - Verify cart badge
  test('Verify cart badge count', async ({ page }) => {

    await page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    ).click();

    await expect(
      page.locator('[data-test="shopping-cart-badge"]')
    ).toBeVisible();

    await expect(
      page.locator('[data-test="shopping-cart-badge"]')
    ).toHaveText('1');

  });

  // TC030 - Verify button changes to Remove
  test('Verify Add to Cart button changes to Remove', async ({ page }) => {

    await page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    ).click();

    await expect(
      page.locator('[data-test="remove-sauce-labs-backpack"]')
    ).toBeVisible();

  });

  // TC031 - Add two products
  test('Add two products to cart', async ({ page }) => {

    await page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    ).click();

    await page.locator(
      '[data-test="add-to-cart-sauce-labs-bike-light"]'
    ).click();

    await expect(
      page.locator('[data-test="shopping-cart-badge"]')
    ).toHaveText('2');

  });

  // TC032 - Verify multiple product count
  test('Verify cart badge for multiple products', async ({ page }) => {

    await page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    ).click();

    await page.locator(
      '[data-test="add-to-cart-sauce-labs-bike-light"]'
    ).click();

    await expect(
      page.locator('[data-test="shopping-cart-badge"]')
    ).toHaveText('2');

  });

  // TC033 - Remove product from inventory
  test('Remove product from inventory page', async ({ page }) => {

    await page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    ).click();

    await page.locator(
      '[data-test="remove-sauce-labs-backpack"]'
    ).click();

    await expect(
      page.locator('[data-test="shopping-cart-badge"]')
    ).toHaveCount(0);

  });

  // TC034 - Remove product from shopping cart
  test('Remove product from shopping cart', async ({ page }) => {

    await page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    ).click();

    await page.locator(
      '[data-test="shopping-cart-link"]'
    ).click();

    await expect(page.locator('.cart_item'))
      .toHaveCount(1);

    await page.locator(
      '[data-test="remove-sauce-labs-backpack"]'
    ).click();

    await expect(page.locator('.cart_item'))
      .toHaveCount(0);

  });

});
