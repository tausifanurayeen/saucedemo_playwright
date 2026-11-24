
export async function logoutIfPossible(page) {

  if (page.isClosed()) return;

  // No logout needed after order completion
  if (page.url().includes('checkout-complete')) {
    console.log('Order completed - logout skipped');
    return;
  }

  const menuButton = page.locator('[data-test="open-menu"]');

  try {
    if (await menuButton.isVisible()) {

      await menuButton.click({ timeout: 3000 });

      const logoutButton = page.locator(
        '[data-test="logout-sidebar-link"]'
      );

      await logoutButton.waitFor({
        state: 'visible',
        timeout: 3000
      });

      await logoutButton.click({ timeout: 3000 });

      console.log('Logout successful');

    } else {
      console.log('Logout skipped - menu not available');
    }

  } catch (error) {
    console.log('Cleanup skipped:', error.message);
  }
}
