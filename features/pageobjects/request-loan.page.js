import Page from "./page.js";
import { ROUTES } from "../../utils/constants.js";

/**
 * sub page containing specific selectors and methods for Request Loan page
 */
class RequestLoanPage extends Page {
  /**
   * define selectors using getter methods
   */
  get inputLoanAmount() {
    return $("#amount");
  }

  get inputDownPayment() {
    return $("#downPayment");
  }

  get selectFromAccount() {
    return $("#fromAccountId");
  }

  get btnApplyNow() {
    return $('input[type="button"][value="Apply Now"]');
  }

  get loanRequestResult() {
    return $("#requestLoanResult");
  }

  get loanRequestError() {
    return $("#requestLoanError");
  }

  get loanProviderName() {
    return $("#loanProviderName");
  }

  get loanResponseDate() {
    return $("#responseDate");
  }

  get loanStatus() {
    return $("#loanStatus");
  }

  get newAccountId() {
    return $("#newAccountId");
  }

  get loanRequestApproved() {
    return $("#loanRequestApproved");
  }

  get loanRequestDenied() {
    return $("#loanRequestDenied");
  }

  // Validation error messages
  get errorLoanAmount() {
    return $("#amount-error");
  }

  get errorDownPayment() {
    return $("#downPayment-error");
  }

  get errorFromAccount() {
    return $("#fromAccountId-error");
  }

  /**
   * Method to set loan amount
   * @param {string} amount - Loan amount
   */
  async setLoanAmount(amount) {
    await this.inputLoanAmount.setValue(amount);
  }

  /**
   * Method to set down payment
   * @param {string} downPayment - Down payment amount
   */
  async setDownPayment(downPayment) {
    await this.inputDownPayment.setValue(downPayment);
  }

  /**
   * Method to select the source account
   * @param {string} accountId - Account ID to use for the loan
   */
  async selectFromAccountById(accountId) {
    await this.selectFromAccount.selectByAttribute("value", accountId);
  }

  /**
   * Method to click the apply now button
   */
  async clickApplyNow() {
    await this.btnApplyNow.click();
  }

  /**
   * Method to fill the complete loan request form
   * @param {Object} loanData - Object containing loan information
   */
  async fillLoanRequest(loanData) {
    await this.inputLoanAmount.setValue(loanData.amount);
    await this.inputDownPayment.setValue(loanData.downPayment);
    await this.selectFromAccount.selectByAttribute(
      "value",
      loanData.fromAccount
    );
  }

  /**
   * Method to verify if loan was approved
   * @returns {boolean} - True if loan was approved
   */
  async isLoanApproved() {
    try {
      await this.loanRequestResult.waitForDisplayed({ timeout: 5000 });
      await this.loanRequestApproved.waitForDisplayed({ timeout: 5000 });
      const isApproved = await this.loanRequestApproved.isDisplayed();

      if (isApproved) {
        const statusText = await this.loanStatus.getText();
        return statusText.includes("Approved");
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Method to verify if loan was denied
   * @returns {boolean} - True if loan was denied
   */
  async isLoanDenied() {
    try {
      await this.loanRequestResult.waitForDisplayed({ timeout: 5000 });
      await this.loanRequestDenied.waitForDisplayed({ timeout: 5000 });
      const isDenied = await this.loanRequestDenied.isDisplayed();

      if (isDenied) {
        const statusText = await this.loanStatus.getText();
        return statusText.includes("Denied");
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Method to get the loan status
   * @returns {string} - The loan status (Approved or Denied)
   */
  async getLoanStatus() {
    await this.loanStatus.waitForDisplayed({ timeout: 5000 });
    return await this.loanStatus.getText();
  }

  /**
   * Method to get the new account number
   * @returns {string} - The new account number
   */
  async getNewAccountNumber() {
    await this.newAccountId.waitForDisplayed({ timeout: 5000 });
    return await this.newAccountId.getText();
  }

  /**
   * Method to get the loan provider name
   * @returns {string} - The loan provider name
   */
  async getLoanProviderName() {
    await this.loanProviderName.waitForDisplayed({ timeout: 5000 });
    return await this.loanProviderName.getText();
  }

  /**
   * Method to get the response date
   * @returns {string} - The response date
   */
  async getResponseDate() {
    await this.loanResponseDate.waitForDisplayed({ timeout: 5000 });
    return await this.loanResponseDate.getText();
  }

  /**
   * Method to check if loan error message is displayed
   * @returns {boolean} - True if error message is displayed
   */
  async hasLoanError() {
    try {
      await this.loanRequestError.waitForDisplayed({ timeout: 5000 });
      const text = await this.loanRequestError.getText();
      return text.includes("Error!");
    } catch (error) {
      return false;
    }
  }

  /**
   * Method to check if validation errors are displayed
   * @returns {boolean} - True if any validation error is displayed
   */
  async hasValidationErrors() {
    try {
      // Wait a bit for validation to trigger
      await browser.pause(500);

      const amountError = await this.errorLoanAmount
        .isDisplayed()
        .catch(() => false);
      const downPaymentError = await this.errorDownPayment
        .isDisplayed()
        .catch(() => false);
      const accountError = await this.errorFromAccount
        .isDisplayed()
        .catch(() => false);

      return amountError || downPaymentError || accountError;
    } catch (error) {
      return false;
    }
  }

  /**
   * Method to verify if loan result is displayed (approved or denied)
   * @returns {boolean} - True if loan result is displayed
   */
  async hasLoanResult() {
    try {
      await this.loanRequestResult.waitForDisplayed({ timeout: 5000 });
      return await this.loanRequestResult.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open(ROUTES.REQUEST_LOAN);
  }
}

export default new RequestLoanPage();
