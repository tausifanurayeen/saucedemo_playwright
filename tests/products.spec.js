
import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage.js';
import { logoutIfPossible } from './test-helpers.js';

test.describe('SauceDemo - Product Tests', () => {

  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    await inventoryPage.login();
  });

  test('TC013 - Inventory page loads', async ({ page }) => {
    await expect(page).toHaveURL(/inventory/);
  });

  test('TC014 - Verify page title', async () => {
    await expect(inventoryPage.pageTitle).toHaveText('Products');
  });

  test('TC015 - Verify product count', async () => {
    await expect(inventoryPage.productItems).toHaveCount(6);
  });

  test('TC016 - Verify product names', async () => {
    await expect(inventoryPage.productNames).toHaveCount(6);
    await expect(inventoryPage.productNames.first()).toBeVisible();
  });

  test('TC017 - Verify product prices', async () => {
    await expect(inventoryPage.productPrices).toHaveCount(6);
  });

  test('TC018 - Verify product descriptions', async () => {
    await expect(inventoryPage.productDescriptions).toHaveCount(6);
  });

  test('TC019 - Verify product images', async () => {
    const images = inventoryPage.productImages;

    await expect(images).toHaveCount(6);

    for (let i = 0; i < 6; i++) {
      const image = images.nth(i);

      await expect(image).toBeVisible();
      await expect(image).toHaveJSProperty('complete', true);

      const width = await image.evaluate(img => img.naturalWidth);

      expect(width).toBeGreaterThan(0);
    }
  });

  test('TC020 - Verify Add to Cart buttons', async () => {
    await expect(inventoryPage.addToCartButtons).toHaveCount(6);
  });

  test('TC021 - Open product details', async ({ page }) => {
    await inventoryPage.openFirstProduct();

    await expect(page).toHaveURL(/inventory-item/);
    await expect(inventoryPage.productDetailsName).toBeVisible();
  });

  test('TC022 - Return to products', async () => {
    await inventoryPage.openFirstProduct();
    await inventoryPage.returnToProducts();

    await expect(inventoryPage.pageTitle).toHaveText('Products');
  });

  test.afterEach(async ({ page }) => {
    await logoutIfPossible(page);
  });

});
