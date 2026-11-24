
import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage.js';
import { logoutIfPossible } from './test-helpers.js';

test.describe('SauceDemo - Sorting Tests', () => {

  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    await inventoryPage.login();
  });

  test('TC023 - Verify sorting dropdown', async () => {
    await expect(inventoryPage.sortDropdown).toBeVisible();
  });

  test('TC024 - Sort Name A to Z', async () => {
    await inventoryPage.selectSortingOption('az');

    const names = await inventoryPage.getProductNames();

    expect(names).toEqual([...names].sort());
  });

  test('TC025 - Sort Name Z to A', async () => {
    await inventoryPage.selectSortingOption('za');

    const names = await inventoryPage.getProductNames();

    expect(names).toEqual([...names].sort().reverse());
  });

  test('TC026 - Sort Price Low to High', async () => {
    await inventoryPage.selectSortingOption('lohi');

    const prices = await inventoryPage.getProductPrices();

    expect(prices).toEqual(
      [...prices].sort((a, b) => a - b)
    );
  });

  test('TC027 - Sort Price High to Low', async () => {
    await inventoryPage.selectSortingOption('hilo');

    const prices = await inventoryPage.getProductPrices();

    expect(prices).toEqual(
      [...prices].sort((a, b) => b - a)
    );
  });

  test.afterEach(async ({ page }) => {
    await logoutIfPossible(page);
  });

});
