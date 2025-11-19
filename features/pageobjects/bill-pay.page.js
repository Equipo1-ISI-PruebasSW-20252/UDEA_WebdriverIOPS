import Page from "./page.js";
import { ROUTES } from "../../utils/constants.js";

/**
 * sub page containing specific selectors and methods for Bill Pay page
 */
class BillPayPage extends Page {
  /**
   * define selectors using getter methods
   */
  get inputPayeeName() {
    return $('input[name="payee.name"]');
  }

  get inputPayeeAddress() {
    return $('input[name="payee.address.street"]');
  }

  get inputPayeeCity() {
    return $('input[name="payee.address.city"]');
  }

  get inputPayeeState() {
    return $('input[name="payee.address.state"]');
  }

  get inputPayeeZipCode() {
    return $('input[name="payee.address.zipCode"]');
  }

  get inputPayeePhone() {
    return $('input[name="payee.phoneNumber"]');
  }

  get inputPayeeAccount() {
    return $('input[name="payee.accountNumber"]');
  }

  get inputVerifyAccount() {
    return $('input[name="verifyAccount"]');
  }

  get inputAmount() {
    return $('input[name="amount"]');
  }

  get selectFromAccount() {
    return $('select[name="fromAccountId"]');
  }

  get btnSendPayment() {
    return $('input[type="button"][value="Send Payment"]');
  }

  get paymentSuccessMessage() {
    return $("#billpayResult");
  }

  get paymentAmountResult() {
    return $("#amount");
  }

  get payeeNameResult() {
    return $("#payeeName");
  }

  get fromAccountIdResult() {
    return $("#fromAccountId");
  }

  // Validation error messages
  get errorPayeeName() {
    return $("#validationModel-name");
  }

  get errorAddress() {
    return $("#validationModel-address");
  }

  get errorCity() {
    return $("#validationModel-city");
  }

  get errorState() {
    return $("#validationModel-state");
  }

  get errorZipCode() {
    return $("#validationModel-zipCode");
  }

  get errorPhoneNumber() {
    return $("#validationModel-phoneNumber");
  }

  get errorAccountEmpty() {
    return $("#validationModel-account-empty");
  }

  get errorAccountInvalid() {
    return $("#validationModel-account-invalid");
  }

  get errorVerifyAccountEmpty() {
    return $("#validationModel-verifyAccount-empty");
  }

  get errorVerifyAccountInvalid() {
    return $("#validationModel-verifyAccount-invalid");
  }

  get errorVerifyAccountMismatch() {
    return $("#validationModel-verifyAccount-mismatch");
  }

  get errorAmountEmpty() {
    return $("#validationModel-amount-empty");
  }

  get errorAmountInvalid() {
    return $("#validationModel-amount-invalid");
  }

  /**
   * Method to fill all payee information
   * @param {Object} payeeData - Object containing all payee information
   */
  async fillPayeeInformation(payeeData) {
    await this.inputPayeeName.setValue(payeeData.name);
    await this.inputPayeeAddress.setValue(payeeData.address);
    await this.inputPayeeCity.setValue(payeeData.city);
    await this.inputPayeeState.setValue(payeeData.state);
    await this.inputPayeeZipCode.setValue(payeeData.zipCode);
    await this.inputPayeePhone.setValue(payeeData.phone);
    await this.inputPayeeAccount.setValue(payeeData.account);
    await this.inputVerifyAccount.setValue(payeeData.verifyAccount);
    await this.inputAmount.setValue(payeeData.amount);
    await this.selectFromAccount.selectByAttribute(
      "value",
      payeeData.fromAccount
    );
  }

  /**
   * Method to set payee name
   * @param {string} name - Payee name
   */
  async setPayeeName(name) {
    await this.inputPayeeName.setValue(name);
  }

  /**
   * Method to set payee address
   * @param {string} address - Payee address
   */
  async setPayeeAddress(address) {
    await this.inputPayeeAddress.setValue(address);
  }

  /**
   * Method to set payee city
   * @param {string} city - Payee city
   */
  async setPayeeCity(city) {
    await this.inputPayeeCity.setValue(city);
  }

  /**
   * Method to set payee state
   * @param {string} state - Payee state
   */
  async setPayeeState(state) {
    await this.inputPayeeState.setValue(state);
  }

  /**
   * Method to set payee zip code
   * @param {string} zipCode - Payee zip code
   */
  async setPayeeZipCode(zipCode) {
    await this.inputPayeeZipCode.setValue(zipCode);
  }

  /**
   * Method to set payee phone
   * @param {string} phone - Payee phone number
   */
  async setPayeePhone(phone) {
    await this.inputPayeePhone.setValue(phone);
  }

  /**
   * Method to set payee account number
   * @param {string} account - Payee account number
   */
  async setPayeeAccount(account) {
    await this.inputPayeeAccount.setValue(account);
  }

  /**
   * Method to verify payee account number
   * @param {string} account - Account number to verify
   */
  async verifyPayeeAccount(account) {
    await this.inputVerifyAccount.setValue(account);
  }

  /**
   * Method to set payment amount
   * @param {string} amount - Payment amount
   */
  async setAmount(amount) {
    await this.inputAmount.setValue(amount);
  }

  /**
   * Method to select the source account
   * @param {string} accountId - Account ID to pay from
   */
  async selectFromAccountById(accountId) {
    await this.selectFromAccount.selectByAttribute("value", accountId);
  }

  /**
   * Method to click the send payment button
   */
  async clickSendPayment() {
    await this.btnSendPayment.click();
  }

  /**
   * Method to verify if payment was successful
   * @returns {boolean} - True if payment success message is displayed
   */
  async isPaymentSuccessful() {
    try {
      await this.paymentSuccessMessage.waitForDisplayed({ timeout: 5000 });
      return await this.paymentSuccessMessage.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  /**
   * Method to get the payment amount from the confirmation
   * @returns {string} - The payment amount
   */
  async getPaymentAmount() {
    await this.paymentAmountResult.waitForDisplayed({ timeout: 5000 });
    return await this.paymentAmountResult.getText();
  }

  /**
   * Method to get the payee name from the confirmation
   * @returns {string} - The payee name
   */
  async getPayeeName() {
    await this.payeeNameResult.waitForDisplayed({ timeout: 5000 });
    return await this.payeeNameResult.getText();
  }

  /**
   * Method to get the from account ID from the confirmation
   * @returns {string} - The from account ID
   */
  async getFromAccountId() {
    await this.fromAccountIdResult.waitForDisplayed({ timeout: 5000 });
    return await this.fromAccountIdResult.getText();
  }

  /**
   * Method to check if validation errors are displayed
   * @returns {boolean} - True if any validation error is displayed
   */
  async hasValidationErrors() {
    try {
      const nameError = await this.errorPayeeName.isDisplayed();
      const addressError = await this.errorAddress.isDisplayed();
      const cityError = await this.errorCity.isDisplayed();
      const stateError = await this.errorState.isDisplayed();
      const zipCodeError = await this.errorZipCode.isDisplayed();
      const phoneError = await this.errorPhoneNumber.isDisplayed();

      return (
        nameError ||
        addressError ||
        cityError ||
        stateError ||
        zipCodeError ||
        phoneError
      );
    } catch (error) {
      return false;
    }
  }

  /**
   * Method to check if account mismatch error is displayed
   * @returns {boolean} - True if mismatch error is displayed
   */
  async hasAccountMismatchError() {
    try {
      return await this.errorVerifyAccountMismatch.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  /**
   * Method to check if invalid amount error is displayed
   * @returns {boolean} - True if invalid amount error is displayed
   */
  async hasInvalidAmountError() {
    try {
      return await this.errorAmountInvalid.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open(ROUTES.BILL_PAY);
  }
}

export default new BillPayPage();
