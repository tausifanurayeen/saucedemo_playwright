
import { test, expect } from '@playwright/test';
import { logoutIfPossible } from './test-helpers.js';

test.describe('SauceDemo - Sorting Tests', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]')
      .fill('standard_user');

    await page.locator('[data-test="password"]')
      .fill('secret_sauce');

    await page.locator('[data-test="login-button"]').click();

  });

  test('TC023 - Verify sorting dropdown', async ({ page }) => {
    await expect(
      page.locator('[data-test="product-sort-container"]')
    ).toBeVisible();
  });

  test('TC024 - Sort Name A to Z', async ({ page }) => {

    await page.locator('[data-test="product-sort-container"]')
      .selectOption('az');

    const names = await page.locator('.inventory_item_name')
      .allTextContents();

    expect(names).toEqual([...names].sort());
  });

  test('TC025 - Sort Name Z to A', async ({ page }) => {

    await page.locator('[data-test="product-sort-container"]')
      .selectOption('za');

    const names = await page.locator('.inventory_item_name')
      .allTextContents();

    expect(names).toEqual([...names].sort().reverse());
  });

  test('TC026 - Sort Price Low to High', async ({ page }) => {

    await page.locator('[data-test="product-sort-container"]')
      .selectOption('lohi');

    const prices = await page.locator('.inventory_item_price')
      .allTextContents();

    const values = prices.map(p => Number(p.replace('$', '')));

    expect(values).toEqual([...values].sort((a, b) => a - b));
  });

  test('TC027 - Sort Price High to Low', async ({ page }) => {

    await page.locator('[data-test="product-sort-container"]')
      .selectOption('hilo');

    const prices = await page.locator('.inventory_item_price')
      .allTextContents();

    const values = prices.map(p => Number(p.replace('$', '')));

    expect(values).toEqual([...values].sort((a, b) => b - a));
  });

  test.afterEach(async ({ page }) => {
    await logoutIfPossible(page);
  });

});
