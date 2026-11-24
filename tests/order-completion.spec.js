
import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { logoutIfPossible } from './test-helpers.js';

test.describe('SauceDemo - Order Completion Tests', () => {

  let inventoryPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Login
    await inventoryPage.login();

    // Add product to cart
    await inventoryPage.addProductToCart('sauce-labs-backpack');

    // Open shopping cart
    await inventoryPage.openCart();

    // Proceed to checkout
    await cartPage.proceedToCheckout();

    // Enter customer information
    await checkoutPage.enterCustomerInformation(
      'John',
      'Smith',
      '1207'
    );

    // Continue to order overview
    await checkoutPage.continueCheckout();
  });

  test('TC053 - Verify Finish button', async () => {
    await expect(checkoutPage.finishButton).toBeVisible();
  });

  test('TC054 - Complete an order', async ({ page }) => {
    await checkoutPage.finishOrder();

    await expect(page).toHaveURL(/checkout-complete/);
  });

  test('TC055 - Verify confirmation message', async () => {
    await checkoutPage.finishOrder();

    await expect(checkoutPage.confirmationMessage)
      .toHaveText('Thank you for your order!');
  });

  test('TC056 - Verify confirmation description', async () => {
    await checkoutPage.finishOrder();

    await expect(checkoutPage.confirmationDescription)
      .toContainText('Your order has been dispatched');
  });

  test('TC057 - Verify confirmation page title', async () => {
    await checkoutPage.finishOrder();

    await expect(checkoutPage.pageTitle)
      .toHaveText('Checkout: Complete!');
  });

  test('TC058 - Back Home navigation', async ({ page }) => {
    await checkoutPage.finishOrder();

    await checkoutPage.backToProducts();

    await expect(page).toHaveURL(/inventory/);

    await expect(inventoryPage.pageTitle)
      .toHaveText('Products');
  });

  test('TC059 - Verify cart after order completion', async () => {
    await checkoutPage.finishOrder();

    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });

  test.afterEach(async ({ page }) => {
    await logoutIfPossible(page);
  });

});
