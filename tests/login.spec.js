
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { logoutIfPossible } from './test-helpers.js';

test.describe('SauceDemo - Login Tests', () => {

  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });

  test('TC001 - Valid login', async ({ page }) => {

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory/);
  });

  test('TC002 - Invalid username', async () => {

    await loginPage.login('wrong_user', 'secret_sauce');

    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('TC003 - Invalid password', async () => {

    await loginPage.login('standard_user', 'wrong_password');

    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('TC004 - Empty credentials', async () => {

    await loginPage.clickLogin();

    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('TC005 - Locked out user', async () => {

    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(loginPage.errorMessage)
      .toContainText('locked out');
  });

  test.afterEach(async ({ page }) => {
    await logoutIfPossible(page);
  });

});
