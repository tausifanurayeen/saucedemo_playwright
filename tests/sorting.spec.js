
import { test, expect } from '@playwright/test';

test.describe('SauceDemo - Product Sorting Tests', () => {

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

  // TC023 - Verify sorting dropdown
  test('Verify sorting dropdown is visible', async ({ page }) => {

    await expect(
      page.locator('[data-test="product-sort-container"]')
    ).toBeVisible();

  });

  // TC024 - Sort Name A to Z
  test('Sort products by Name A to Z', async ({ page }) => {

    await page.locator('[data-test="product-sort-container"]')
      .selectOption('az');

    const names = await page.locator('.inventory_item_name')
      .allTextContents();

    const sortedNames = [...names].sort();

    expect(names).toEqual(sortedNames);

  });

  // TC025 - Sort Name Z to A
  test('Sort products by Name Z to A', async ({ page }) => {

    await page.locator('[data-test="product-sort-container"]')
      .selectOption('za');

    const names = await page.locator('.inventory_item_name')
      .allTextContents();

    const sortedNames = [...names].sort().reverse();

    expect(names).toEqual(sortedNames);

  });

  // TC026 - Sort Price Low to High
  test('Sort products by Price Low to High', async ({ page }) => {

    await page.locator('[data-test="product-sort-container"]')
      .selectOption('lohi');

    const prices = await page.locator('.inventory_item_price')
      .allTextContents();

    const numericPrices = prices.map(price =>
      Number(price.replace('$', ''))
    );

    const sortedPrices = [...numericPrices]
      .sort((a, b) => a - b);

    expect(numericPrices).toEqual(sortedPrices);

  });

  // TC027 - Sort Price High to Low
  test('Sort products by Price High to Low', async ({ page }) => {

    await page.locator('[data-test="product-sort-container"]')
      .selectOption('hilo');

    const prices = await page.locator('.inventory_item_price')
      .allTextContents();

    const numericPrices = prices.map(price =>
      Number(price.replace('$', ''))
    );

    const sortedPrices = [...numericPrices]
      .sort((a, b) => b - a);

    expect(numericPrices).toEqual(sortedPrices);

  });

});
