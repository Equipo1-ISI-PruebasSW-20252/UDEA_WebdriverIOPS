import Page from "./page.js";
import { ROUTES } from "../../utils/constants.js";

/**
 * sub page containing specific selectors and methods for Transfer Funds page
 */
class TransferFundsPage extends Page {
  /**
   * define selectors using getter methods
   */
  get inputAmount() {
    return $("#amount");
  }

  get selectFromAccount() {
    return $("#fromAccountId");
  }

  get selectToAccount() {
    return $("#toAccountId");
  }

  get btnTransfer() {
    return $("input[type='submit'][value='Transfer']");
  }

  get transferSuccessMessage() {
    return $("#showResult");
  }

  get amountResult() {
    return $("#amountResult");
  }

  get fromAccountIdResult() {
    return $("#fromAccountIdResult");
  }

  get toAccountIdResult() {
    return $("#toAccountIdResult");
  }

  get errorMessage() {
    return $(".error");
  }

  /**
   * Method to perform a fund transfer
   * @param {string} amount - Amount to transfer
   * @param {string} fromAccount - Source account ID
   * @param {string} toAccount - Destination account ID
   */
  async transferFunds(amount, fromAccount, toAccount) {
    await this.inputAmount.setValue(amount);
    await this.selectFromAccount.selectByVisibleText(fromAccount);
    await this.selectToAccount.selectByVisibleText(toAccount);
    await this.btnTransfer.click();
  }

  /**
   * Method to set the transfer amount
   * @param {string} amount - Amount to transfer
   */
  async setAmount(amount) {
    await this.inputAmount.setValue(amount);
  }

  /**
   * Method to select the source account
   * @param {string} accountId - Account ID to select from
   */
  async selectFromAccountById(accountId) {
    await this.selectFromAccount.selectByAttribute("value", accountId);
  }

  /**
   * Method to select the destination account
   * @param {string} accountId - Account ID to select to
   */
  async selectToAccountById(accountId) {
    await this.selectToAccount.selectByAttribute("value", accountId);
  }

  /**
   * Method to click the transfer button
   */
  async clickTransfer() {
    await this.btnTransfer.click();
  }

  /**
   * Method to verify if transfer was successful
   * @returns {boolean} - True if transfer success message is displayed
   */
  async isTransferSuccessful() {
    return await this.transferSuccessMessage.isDisplayed();
  }

  /**
   * Method to get the transferred amount from the success message
   * @returns {string} - The amount transferred
   */
  async getTransferredAmount() {
    return await this.amountResult.getText();
  }

  /**
   * Method to get the source account ID from the success message
   * @returns {string} - The source account ID
   */
  async getFromAccountId() {
    return await this.fromAccountIdResult.getText();
  }

  /**
   * Method to get the destination account ID from the success message
   * @returns {string} - The destination account ID
   */
  async getToAccountId() {
    return await this.toAccountIdResult.getText();
  }

  /**
   * Method to check if an error message is displayed
   * @returns {boolean} - True if error message is displayed
   */
  async hasError() {
    try {
      return await this.errorMessage.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  /**
   * Method to get the available balance of an account
   * @param {string} accountId - Account ID to check balance
   * @returns {number} - The available balance
   */
  async getAccountBalance(accountId) {
    const accountSelect = await this.selectFromAccount;
    const options = await accountSelect.$$("option");

    for (const option of options) {
      const value = await option.getAttribute("value");
      if (value === accountId) {
        const text = await option.getText();
        // Extract balance from text like "12567 ($100.00)"
        const balanceMatch = text.match(/\$([0-9,.]+)\)/);
        if (balanceMatch) {
          return parseFloat(balanceMatch[1].replace(",", ""));
        }
      }
    }
    return 0;
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open(ROUTES.TRANSFER_FUNDS);
  }
}

export default new TransferFundsPage();
