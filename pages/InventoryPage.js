
export class InventoryPage {
  constructor(page) {
    this.page = page;

    // Login locators
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');

    // Inventory locators
    this.pageTitle = page.locator('.title');
    this.productItems = page.locator('.inventory_item');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
    this.productDescriptions = page.locator('.inventory_item_desc');
    this.productImages = page.locator('.inventory_item_img img');
    this.addToCartButtons = page.locator('.inventory_item button');

    // Product details locators
    this.productDetailsName = page.locator('.inventory_details_name');
    this.backToProductsButton = page.locator(
      '[data-test="back-to-products"]'
    );

    // Sorting locator
    this.sortDropdown = page.locator(
      '[data-test="product-sort-container"]'
    );

    // Cart locators
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  // Login
  async login(username = 'standard_user', password = 'secret_sauce') {
    await this.page.goto('https://www.saucedemo.com/');
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Product actions
  async openFirstProduct() {
    await this.productNames.first().click();
  }

  async returnToProducts() {
    await this.backToProductsButton.click();
  }

  async getProductCount() {
    return await this.productItems.count();
  }

  // Sorting actions
  async selectSortingOption(option) {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames() {
    return await this.productNames.allTextContents();
  }

  async getProductPrices() {
    const prices = await this.productPrices.allTextContents();

    return prices.map(price =>
      Number(price.replace('$', ''))
    );
  }

  // Add to Cart actions
  async addProductToCart(productSlug) {
    await this.page.locator(
      `[data-test="add-to-cart-${productSlug}"]`
    ).click();
  }

  async removeProductFromInventory(productSlug) {
    await this.page.locator(
      `[data-test="remove-${productSlug}"]`
    ).click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}
