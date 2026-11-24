
export class CheckoutPage {
  constructor(page) {
    this.page = page;

    // Checkout page locators
    this.pageTitle = page.locator('.title');

    // Customer information fields
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');

    // Checkout buttons
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');

    // Error message
    this.errorMessage = page.locator('[data-test="error"]');

    // Order summary locators
    this.orderItems = page.locator('.cart_item');
    this.orderProductNames = page.locator('.inventory_item_name');
    this.orderProductPrices = page.locator('.inventory_item_price');

    // Price calculation locators
    this.subtotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.total = page.locator('.summary_total_label');

    // Order completion locators
    this.finishButton = page.locator('[data-test="finish"]');
    this.confirmationMessage = page.locator('.complete-header');
    this.confirmationDescription = page.locator('.complete-text');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  // Enter customer information
  async enterCustomerInformation(firstName, lastName, postalCode) {
    if (firstName !== '') {
      await this.firstNameInput.fill(firstName);
    }

    if (lastName !== '') {
      await this.lastNameInput.fill(lastName);
    }

    if (postalCode !== '') {
      await this.postalCodeInput.fill(postalCode);
    }
  }

  // Checkout actions
  async continueCheckout() {
    await this.continueButton.click();
  }

  async cancelCheckout() {
    await this.cancelButton.click();
  }

  // Order completion actions
  async finishOrder() {
    await this.finishButton.click();
  }

  async backToProducts() {
    await this.backHomeButton.click();
  }
}
