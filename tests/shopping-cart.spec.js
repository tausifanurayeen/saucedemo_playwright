
import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { logoutIfPossible } from './test-helpers.js';

test.describe('SauceDemo - Shopping Cart Tests', () => {

  let inventoryPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    // Login
    await inventoryPage.login();

    // Add a product to the cart
    await inventoryPage.addProductToCart('sauce-labs-backpack');

    // Open shopping cart
    await inventoryPage.openCart();
  });

  test('TC035 - Open shopping cart', async ({ page }) => {
    await expect(page).toHaveURL(/cart/);
  });

  test('TC036 - Verify cart title', async () => {
    await expect(cartPage.cartTitle).toHaveText('Your Cart');
  });

  test('TC037 - Verify cart product count', async () => {
    await expect(cartPage.cartItems).toHaveCount(1);
  });

  test('TC038 - Verify product name', async () => {
    await expect(cartPage.cartProductNames)
      .toHaveText('Sauce Labs Backpack');
  });

  test('TC039 - Verify product price', async () => {
    await expect(cartPage.cartProductPrices)
      .toHaveText('$29.99');
  });

  test('TC040 - Verify product quantity', async () => {
    await expect(cartPage.cartQuantities).toHaveText('1');
  });

  test('TC041 - Continue shopping', async ({ page }) => {
    await cartPage.continueShopping();

    await expect(page).toHaveURL(/inventory/);
  });

  test('TC042 - Checkout button', async ({ page }) => {
    await cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/checkout-step-one/);

    await expect(cartPage.cartTitle)
      .toHaveText('Checkout: Your Information');
  });

  test.afterEach(async ({ page }) => {
    await logoutIfPossible(page);
  });

});
