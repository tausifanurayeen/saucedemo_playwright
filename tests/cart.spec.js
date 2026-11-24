
import { test, expect } from '@playwright/test';
import { logoutIfPossible } from './test-helpers.js';

test.describe('SauceDemo - Add to Cart Tests', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]')
      .fill('standard_user');

    await page.locator('[data-test="password"]')
      .fill('secret_sauce');

    await page.locator('[data-test="login-button"]').click();

  });

  test('TC028 - Add one product', async ({ page }) => {

    await page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    ).click();

    await expect(
      page.locator('[data-test="shopping-cart-badge"]')
    ).toHaveText('1');
  });

  test('TC029 - Verify cart badge', async ({ page }) => {

    await page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    ).click();

    await expect(
      page.locator('[data-test="shopping-cart-badge"]')
    ).toBeVisible();
  });

  test('TC030 - Verify button changes to Remove', async ({ page }) => {

    await page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    ).click();

    await expect(
      page.locator('[data-test="remove-sauce-labs-backpack"]')
    ).toBeVisible();
  });

  test('TC031 - Add two products', async ({ page }) => {

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

  test('TC032 - Verify multiple product count', async ({ page }) => {

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

  test('TC033 - Remove product from inventory', async ({ page }) => {

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

  test('TC034 - Remove product from cart', async ({ page }) => {

    await page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    ).click();

    await page.locator(
      '[data-test="shopping-cart-link"]'
    ).click();

    await expect(page.locator('.cart_item')).toHaveCount(1);

    await page.locator(
      '[data-test="remove-sauce-labs-backpack"]'
    ).click();

    await expect(page.locator('.cart_item')).toHaveCount(0);
  });

  test.afterEach(async ({ page }) => {
    await logoutIfPossible(page);
  });

});
