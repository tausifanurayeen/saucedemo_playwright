
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { NavigationPage } from '../pages/NavigationPage.js';
import { logoutIfPossible } from './test-helpers.js';

test.describe('SauceDemo - Navigation Tests using POM', () => {

  let loginPage;
  let navigationPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    navigationPage = new NavigationPage(page);

    // Login
    await loginPage.navigateToLoginPage();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory/);
  });

  test('TC060 - Open side menu', async () => {
    await navigationPage.openMenu();

    await expect(navigationPage.logoutLink).toBeVisible();
  });

  test('TC061 - Close side menu', async () => {
    await navigationPage.openMenu();

    await navigationPage.closeMenu();

    await expect(navigationPage.logoutLink).toBeHidden();
  });

  test('TC062 - Navigate to All Items', async ({ page }) => {
    await navigationPage.openMenu();

    await navigationPage.clickAllItems();

    await expect(page).toHaveURL(/inventory/);

    await expect(navigationPage.pageTitle)
      .toHaveText('Products');
  });

  test('TC063 - Navigate to About page', async ({ page }) => {
    await navigationPage.openMenu();

    await navigationPage.clickAbout();

    await expect(page).toHaveURL(/saucelabs/i);
  });

  test('TC064 - Logout successfully', async ({ page }) => {
    await navigationPage.logout();

    await expect(page).toHaveURL('https://www.saucedemo.com/');

    await expect(navigationPage.loginButton).toBeVisible();
  });

  test('TC065 - Refresh products page', async ({ page }) => {
    await navigationPage.refreshPage();

    await expect(page).toHaveURL(/inventory/);

    await expect(navigationPage.pageTitle)
      .toHaveText('Products');
  });

  test('TC066 - Browser back button navigation', async ({ page }) => {
    await navigationPage.openCart();

    await expect(page).toHaveURL(/cart/);

    await navigationPage.goBack();

    await expect(page).toHaveURL(/inventory/);
  });

  test('TC067 - Prevent unauthenticated inventory access', async ({ page }) => {
    await navigationPage.logout();

    await navigationPage.openInventoryDirectly();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test.afterEach(async ({ page }) => {
    await logoutIfPossible(page);
  });

});
