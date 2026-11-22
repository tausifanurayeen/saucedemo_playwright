
const { test, expect } = require('@playwright/test');

const URL = 'https://www.saucedemo.com/';

test.describe('SauceDemo Login Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test('TC001 - Login with valid credentials', async ({ page }) => {
    await page.locator('[data-test="username"]')
      .fill('standard_user');

    await page.locator('[data-test="password"]')
      .fill('secret_sauce');

    await page.locator('[data-test="login-button"]')
      .click();

    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title'))
      .toHaveText('Products');
  });

  test('TC002 - Login with invalid username', async ({ page }) => {
    await page.locator('[data-test="username"]')
      .fill('wrong_user');

    await page.locator('[data-test="password"]')
      .fill('secret_sauce');

    await page.locator('[data-test="login-button"]')
      .click();

    await expect(page.locator('[data-test="error"]'))
      .toBeVisible();
  });

  test('TC003 - Login with invalid password', async ({ page }) => {
    await page.locator('[data-test="username"]')
      .fill('standard_user');

    await page.locator('[data-test="password"]')
      .fill('wrong_password');

    await page.locator('[data-test="login-button"]')
      .click();

    await expect(page.locator('[data-test="error"]'))
      .toBeVisible();
  });

  test('TC004 - Login with empty credentials', async ({ page }) => {
    await page.locator('[data-test="login-button"]')
      .click();

    await expect(page.locator('[data-test="error"]'))
      .toBeVisible();
  });

  test('TC005 - Login with locked out user', async ({ page }) => {
    await page.locator('[data-test="username"]')
      .fill('locked_out_user');

    await page.locator('[data-test="password"]')
      .fill('secret_sauce');

    await page.locator('[data-test="login-button"]')
      .click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('locked out');
  });

});
