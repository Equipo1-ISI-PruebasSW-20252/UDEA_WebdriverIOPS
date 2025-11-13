import Page from "./page.js";

/**
 * Page Object for Account Details
 */
class AccountDetailsPage extends Page {
  /**
   * define selectors using getter methods
   */
  get accountDetailsPanel() {
    return $("#rightPanel");
  }

  get accountNumberElement() {
    return $("#accountId");
  }

  get accountTypeElement() {
    return $("#accountType");
  }

  get balanceElement() {
    return $("#balance");
  }

  get availableElement() {
    return $("#availableBalance");
  }

  /**
   * check if account details are displayed
   */
  async areAccountDetailsDisplayed() {
    try {
      // Esperar a que el panel de detalles esté visible
      await this.accountDetailsPanel.waitForDisplayed({ timeout: 5000 });

      // Esperar a que cada elemento exista
      await this.accountNumberElement.waitForExist({ timeout: 5000 });
      await this.accountTypeElement.waitForExist({ timeout: 5000 });
      await this.balanceElement.waitForExist({ timeout: 5000 });
      await this.availableElement.waitForExist({ timeout: 5000 });

      // Verificar que todos estén visibles
      const accountNumber = await this.accountNumberElement.isDisplayed();
      const accountType = await this.accountTypeElement.isDisplayed();
      const balance = await this.balanceElement.isDisplayed();
      const available = await this.availableElement.isDisplayed();

      return accountNumber && accountType && balance && available;
    } catch (error) {
      return false;
    }
  }

  /**
   * get current account details
   */
  async getAccountDetails() {
    // Esperar a que el panel esté visible
    await this.accountDetailsPanel.waitForDisplayed({ timeout: 5000 });

    // Esperar a que cada elemento exista antes de obtener su texto
    await this.accountNumberElement.waitForExist({ timeout: 5000 });
    await this.accountTypeElement.waitForExist({ timeout: 5000 });
    await this.balanceElement.waitForExist({ timeout: 5000 });
    await this.availableElement.waitForExist({ timeout: 5000 });

    const accountNumber = await this.accountNumberElement.getText();
    const accountType = await this.accountTypeElement.getText();
    const balance = await this.balanceElement.getText();
    const available = await this.availableElement.getText();

    return {
      accountNumber,
      accountType,
      balance,
      available,
    };
  }

  /**
   * navigate back to accounts overview
   */
  async goBackToAccountsOverview() {
    await browser.back();
    // Esperar a que la tabla de cuentas esté visible
    await $("#accountTable").waitForDisplayed({ timeout: 5000 });
  }
}

export default new AccountDetailsPage();
