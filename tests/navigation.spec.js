
import { test, expect } from '@playwright/test';
import { logoutIfPossible } from './test-helpers.js';

test.describe('SauceDemo - Navigation Tests', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]')
      .fill('standard_user');

    await page.locator('[data-test="password"]')
      .fill('secret_sauce');

    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory/);

  });

  // TC060 - Open side menu
  test('Open side menu', async ({ page }) => {

    await page.locator('#react-burger-menu-btn').click();

    await expect(
      page.locator('#logout_sidebar_link')
    ).toBeVisible();

  });

  // TC061 - Close side menu
  test('Close side menu', async ({ page }) => {

    await page.locator('#react-burger-menu-btn').click();

    await page.locator('#react-burger-cross-btn').click();

    await expect(
      page.locator('#logout_sidebar_link')
    ).toBeHidden();

  });

  // TC062 - All Items navigation
  test('Navigate to All Items', async ({ page }) => {

    await page.locator('#react-burger-menu-btn').click();

    await page.locator('#inventory_sidebar_link').click();

    await expect(page).toHaveURL(/inventory/);

    await expect(page.locator('.title'))
      .toHaveText('Products');

  });

  // TC063 - About navigation
  test('Navigate to About page', async ({ page }) => {

    await page.locator('#react-burger-menu-btn').click();

    await page.locator('#about_sidebar_link').click();

    await expect(page).toHaveURL(/saucelabs/);

  });

  // TC064 - Logout
  test('Logout successfully', async ({ page }) => {

    await page.locator('#react-burger-menu-btn').click();

    await page.locator('#logout_sidebar_link').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/');

    await expect(
      page.locator('[data-test="login-button"]')
    ).toBeVisible();

  });

  // TC065 - Browser refresh
  test('Refresh products page', async ({ page }) => {

    await page.reload();

    await expect(page).toHaveURL(/inventory/);

    await expect(page.locator('.title'))
      .toHaveText('Products');

  });

  // TC066 - Browser back button
  test('Browser back button navigation', async ({ page }) => {

    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page).toHaveURL(/cart/);

    await page.goBack();

    await expect(page).toHaveURL(/inventory/);

  });

  // TC067 - Direct inventory access without login
  test('Prevent unauthenticated inventory access', async ({ page }) => {

    await page.locator('#react-burger-menu-btn').click();

    await page.locator('#logout_sidebar_link').click();

    await page.goto('https://www.saucedemo.com/inventory.html');

    await expect(page).toHaveURL('https://www.saucedemo.com/');

  });

  // AFTER EACH
  test.afterEach(async ({ page }) => {

    await logoutIfPossible(page);

  });

});
