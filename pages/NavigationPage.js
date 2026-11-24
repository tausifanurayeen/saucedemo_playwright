
export class NavigationPage {
  constructor(page) {
    this.page = page;

    // Side menu locators
    this.openMenuButton = page.locator('#react-burger-menu-btn');
    this.closeMenuButton = page.locator('#react-burger-cross-btn');

    // Navigation links
    this.allItemsLink = page.locator('#inventory_sidebar_link');
    this.aboutLink = page.locator('#about_sidebar_link');
    this.logoutLink = page.locator('#logout_sidebar_link');

    // Other page locators
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.pageTitle = page.locator('.title');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  // Side menu actions
  async openMenu() {
    await this.openMenuButton.click();
  }

  async closeMenu() {
    await this.closeMenuButton.click();
  }

  // Navigation actions
  async clickAllItems() {
    await this.allItemsLink.click();
  }

  async clickAbout() {
    await this.aboutLink.click();
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  // Browser actions
  async refreshPage() {
    await this.page.reload();
  }

  async goBack() {
    await this.page.goBack();
  }

  // Direct URL access
  async openInventoryDirectly() {
    await this.page.goto(
      'https://www.saucedemo.com/inventory.html'
    );
  }
}
