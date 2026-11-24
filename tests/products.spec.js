
import { test, expect } from '@playwright/test';
import { logoutIfPossible } from './test-helpers.js';

test.describe('SauceDemo - Product Tests', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]')
      .fill('standard_user');

    await page.locator('[data-test="password"]')
      .fill('secret_sauce');

    await page.locator('[data-test="login-button"]').click();

  });

  test('TC013 - Inventory page loads', async ({ page }) => {
    await expect(page).toHaveURL(/inventory/);
  });

  test('TC014 - Verify page title', async ({ page }) => {
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('TC015 - Verify product count', async ({ page }) => {
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  test('TC016 - Verify product names', async ({ page }) => {
    await expect(page.locator('.inventory_item_name')).toHaveCount(6);
    await expect(page.locator('.inventory_item_name').first())
      .toBeVisible();
  });

  test('TC017 - Verify product prices', async ({ page }) => {
    await expect(page.locator('.inventory_item_price')).toHaveCount(6);
  });

  test('TC018 - Verify product descriptions', async ({ page }) => {
    await expect(page.locator('.inventory_item_desc')).toHaveCount(6);
  });

  test('TC019 - Verify product images', async ({ page }) => {
    const images = page.locator('.inventory_item_img img');

    await expect(images).toHaveCount(6);

    for (let i = 0; i < 6; i++) {
      await expect(images.nth(i)).toBeVisible();
      await expect(images.nth(i))
        .toHaveJSProperty('complete', true);

      const width = await images.nth(i).evaluate(
        img => img.naturalWidth
      );

      expect(width).toBeGreaterThan(0);
    }
  });

  test('TC020 - Verify Add to Cart buttons', async ({ page }) => {
    await expect(
      page.locator('.inventory_item button')
    ).toHaveCount(6);
  });

  test('TC021 - Open product details', async ({ page }) => {
    await page.locator('.inventory_item_name').first().click();

    await expect(page).toHaveURL(/inventory-item/);

    await expect(page.locator('.inventory_details_name'))
      .toBeVisible();
  });

  test('TC022 - Return to products', async ({ page }) => {
    await page.locator('.inventory_item_name').first().click();

    await page.locator('[data-test="back-to-products"]').click();

    await expect(page.locator('.title')).toHaveText('Products');
  });

  test.afterEach(async ({ page }) => {
    await logoutIfPossible(page);
  });

});
