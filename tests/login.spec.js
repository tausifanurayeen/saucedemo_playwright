
import { test, expect } from '@playwright/test';
import { logoutIfPossible } from './test-helpers.js';

test.describe('SauceDemo - Login Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  test('TC001 - Valid login', async ({ page }) => {

    await page.locator('[data-test="username"]')
      .fill('standard_user');

    await page.locator('[data-test="password"]')
      .fill('secret_sauce');

    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory/);
  });

  test('TC002 - Invalid username', async ({ page }) => {

    await page.locator('[data-test="username"]')
      .fill('wrong_user');

    await page.locator('[data-test="password"]')
      .fill('secret_sauce');

    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('[data-test="error"]'))
      .toBeVisible();
  });

  test('TC003 - Invalid password', async ({ page }) => {

    await page.locator('[data-test="username"]')
      .fill('standard_user');

    await page.locator('[data-test="password"]')
      .fill('wrong_password');

    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('[data-test="error"]'))
      .toBeVisible();
  });

  test('TC004 - Empty credentials', async ({ page }) => {

    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('[data-test="error"]'))
      .toBeVisible();
  });

  test('TC005 - Locked out user', async ({ page }) => {

    await page.locator('[data-test="username"]')
      .fill('locked_out_user');

    await page.locator('[data-test="password"]')
      .fill('secret_sauce');

    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('locked out');
  });

  test.afterEach(async ({ page }) => {
    await logoutIfPossible(page);
  });

});
