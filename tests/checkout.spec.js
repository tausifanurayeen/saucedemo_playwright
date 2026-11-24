
import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { logoutIfPossible } from './test-helpers.js';

test.describe('SauceDemo - Checkout Tests', () => {

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

    // Open cart
    await inventoryPage.openCart();

    // Proceed to checkout
    await cartPage.proceedToCheckout();
  });

  test('TC043 - Verify checkout page', async ({ page }) => {
    await expect(page).toHaveURL(/checkout-step-one/);

    await expect(checkoutPage.pageTitle)
      .toHaveText('Checkout: Your Information');
  });

  test('TC044 - Verify checkout fields', async () => {
    await expect(checkoutPage.firstNameInput).toBeVisible();
    await expect(checkoutPage.lastNameInput).toBeVisible();
    await expect(checkoutPage.postalCodeInput).toBeVisible();
  });

  test('TC045 - Valid customer information', async ({ page }) => {
    await checkoutPage.enterCustomerInformation(
      'John',
      'Smith',
      '1207'
    );

    await checkoutPage.continueCheckout();

    await expect(page).toHaveURL(/checkout-step-two/);
  });

  test('TC046 - Empty first name', async () => {
    await checkoutPage.enterCustomerInformation(
      '',
      'Smith',
      '1207'
    );

    await checkoutPage.continueCheckout();

    await expect(checkoutPage.errorMessage)
      .toContainText('First Name is required');
  });

  test('TC047 - Empty last name', async () => {
    await checkoutPage.enterCustomerInformation(
      'John',
      '',
      '1207'
    );

    await checkoutPage.continueCheckout();

    await expect(checkoutPage.errorMessage)
      .toContainText('Last Name is required');
  });

  test('TC048 - Empty postal code', async () => {
    await checkoutPage.enterCustomerInformation(
      'John',
      'Smith',
      ''
    );

    await checkoutPage.continueCheckout();

    await expect(checkoutPage.errorMessage)
      .toContainText('Postal Code is required');
  });

  test('TC049 - All fields empty', async () => {
    await checkoutPage.continueCheckout();

    await expect(checkoutPage.errorMessage)
      .toContainText('First Name is required');
  });

  test('TC050 - Cancel checkout', async ({ page }) => {
    await checkoutPage.cancelCheckout();

    await expect(page).toHaveURL(/cart/);
  });

  test('TC051 - Verify order summary', async () => {
    await checkoutPage.enterCustomerInformation(
      'John',
      'Smith',
      '1207'
    );

    await checkoutPage.continueCheckout();

    await expect(checkoutPage.orderItems).toHaveCount(1);

    await expect(checkoutPage.orderProductNames)
      .toHaveText('Sauce Labs Backpack');

    await expect(checkoutPage.orderProductPrices)
      .toHaveText('$29.99');
  });

  test('TC052 - Verify total price calculation', async () => {
    await checkoutPage.enterCustomerInformation(
      'John',
      'Smith',
      '1207'
    );

    await checkoutPage.continueCheckout();

    await expect(checkoutPage.subtotal)
      .toHaveText('Item total: $29.99');

    await expect(checkoutPage.tax)
      .toHaveText('Tax: $2.40');

    await expect(checkoutPage.total)
      .toHaveText('Total: $32.39');
  });

  test.afterEach(async ({ page }) => {
    await logoutIfPossible(page);
  });

});
