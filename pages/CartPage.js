
export class CartPage {
  constructor(page) {
    this.page = page;

    // Cart locators
    this.cartTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    // Cart product locators
    this.cartItems = page.locator('.cart_item');

    this.cartProductNames = this.cartItems.locator(
    '.inventory_item_name'
    );

    this.cartProductPrices = this.cartItems.locator(
    '.inventory_item_price'
    );
    
    this.cartQuantities = page.locator('.cart_quantity');

    // Cart buttons
    this.continueShoppingButton = page.locator(
      '[data-test="continue-shopping"]'
    );

    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  // Cart actions
  async removeProduct(productSlug) {
    await this.page.locator(
      `[data-test="remove-${productSlug}"]`
    ).click();
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
