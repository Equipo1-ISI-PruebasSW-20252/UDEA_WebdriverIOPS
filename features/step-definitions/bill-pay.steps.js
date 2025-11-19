import { Given, When, Then } from "@wdio/cucumber-framework";

import BillPayPage from "../pageobjects/bill-pay.page.js";

Given(/^I am on the bill pay page$/, async () => {
  await BillPayPage.open();
});

When(/^I enter payee name "([^"]*)"$/, async (name) => {
  await BillPayPage.setPayeeName(name);
});

When(/^I enter payee address "([^"]*)"$/, async (address) => {
  await BillPayPage.setPayeeAddress(address);
});

When(/^I enter payee city "([^"]*)"$/, async (city) => {
  await BillPayPage.setPayeeCity(city);
});

When(/^I enter payee state "([^"]*)"$/, async (state) => {
  await BillPayPage.setPayeeState(state);
});

When(/^I enter payee zip code "([^"]*)"$/, async (zipCode) => {
  await BillPayPage.setPayeeZipCode(zipCode);
});

When(/^I enter payee phone "([^"]*)"$/, async (phone) => {
  await BillPayPage.setPayeePhone(phone);
});

When(/^I enter payee account "([^"]*)"$/, async (account) => {
  await BillPayPage.setPayeeAccount(account);
});

When(/^I verify payee account "([^"]*)"$/, async (account) => {
  await BillPayPage.verifyPayeeAccount(account);
});

When(/^I enter payment amount "([^"]*)"$/, async (amount) => {
  await BillPayPage.setAmount(amount);
});

When(/^I select the account to pay from "([^"]*)"$/, async (accountId) => {
  await BillPayPage.selectFromAccountById(accountId);
});

When(/^I click the send payment button$/, async () => {
  await BillPayPage.clickSendPayment();
});

Then(/^I should see a payment confirmation message$/, async () => {
  const isSuccessful = await BillPayPage.isPaymentSuccessful();
  await expect(isSuccessful).toBe(true);
});

Then(/^the payment amount should be "([^"]*)"$/, async (expectedAmount) => {
  const actualAmount = await BillPayPage.getPaymentAmount();
  await expect(actualAmount).toBe(expectedAmount);
});

Then(/^the payee name should be "([^"]*)"$/, async (expectedName) => {
  const actualName = await BillPayPage.getPayeeName();
  await expect(actualName).toBe(expectedName);
});

Then(/^I should see validation errors for required fields$/, async () => {
  const hasErrors = await BillPayPage.hasValidationErrors();
  await expect(hasErrors).toBe(true);
});

Then(/^I should see an account mismatch error$/, async () => {
  const hasMismatchError = await BillPayPage.hasAccountMismatchError();
  await expect(hasMismatchError).toBe(true);
});

Then(/^I should see an invalid amount error$/, async () => {
  const hasInvalidAmountError = await BillPayPage.hasInvalidAmountError();
  await expect(hasInvalidAmountError).toBe(true);
});
