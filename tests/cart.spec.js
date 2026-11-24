
import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { logoutIfPossible } from './test-helpers.js';

test.describe('SauceDemo - Add to Cart Tests', () => {

  let inventoryPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await inventoryPage.login();
  });

  test('TC028 - Add one product', async () => {

    await inventoryPage.addProductToCart('sauce-labs-backpack');

    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('TC029 - Verify cart badge', async () => {

    await inventoryPage.addProductToCart('sauce-labs-backpack');

    await expect(inventoryPage.cartBadge).toBeVisible();
  });

  test('TC030 - Verify button changes to Remove', async () => {

    await inventoryPage.addProductToCart('sauce-labs-backpack');

    await expect(
      inventoryPage.page.locator(
        '[data-test="remove-sauce-labs-backpack"]'
      )
    ).toBeVisible();
  });

  test('TC031 - Add two products', async () => {

    await inventoryPage.addProductToCart('sauce-labs-backpack');
    await inventoryPage.addProductToCart('sauce-labs-bike-light');

    await expect(inventoryPage.cartBadge).toHaveText('2');
  });

  test('TC032 - Verify multiple product count', async () => {

    await inventoryPage.addProductToCart('sauce-labs-backpack');
    await inventoryPage.addProductToCart('sauce-labs-bike-light');

    await expect(inventoryPage.cartBadge).toHaveText('2');
  });

  test('TC033 - Remove product from inventory', async () => {

    await inventoryPage.addProductToCart('sauce-labs-backpack');

    await inventoryPage.removeProductFromInventory(
      'sauce-labs-backpack'
    );

    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });

  test('TC034 - Remove product from cart', async () => {

    await inventoryPage.addProductToCart('sauce-labs-backpack');
    await inventoryPage.openCart();

    await expect(cartPage.cartItems).toHaveCount(1);

    await cartPage.removeProduct('sauce-labs-backpack');

    await expect(cartPage.cartItems).toHaveCount(0);
  });

  test.afterEach(async ({ page }) => {
    await logoutIfPossible(page);
  });

});
