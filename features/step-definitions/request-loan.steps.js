import { Given, When, Then } from "@wdio/cucumber-framework";
import RequestLoanPage from "../pageobjects/request-loan.page.js";

Given(/^I am on the request loan page$/, async () => {
  await RequestLoanPage.open();
});

When(/^I enter loan amount "([^"]*)"$/, async (amount) => {
  await RequestLoanPage.setLoanAmount(amount);
});

When(/^I enter down payment "([^"]*)"$/, async (downPayment) => {
  await RequestLoanPage.setDownPayment(downPayment);
});

When(/^I select the account "([^"]*)"$/, async (accountId) => {
  await RequestLoanPage.selectFromAccountById(accountId);
});

When(/^I click the apply now button$/, async () => {
  await RequestLoanPage.clickApplyNow();
});

Then(/^I should see a loan approval confirmation$/, async () => {
  const isApproved = await RequestLoanPage.isLoanApproved();
  await expect(isApproved).toBe(true);
});

Then(/^the loan status should be "([^"]*)"$/, async (expectedStatus) => {
  const status = await RequestLoanPage.getLoanStatus();
  await expect(status).toBe(expectedStatus);
});

Then(/^I should see the new account number$/, async () => {
  const newAccountNumber = await RequestLoanPage.getNewAccountNumber();
  await expect(newAccountNumber).toBeTruthy();
  await expect(newAccountNumber.length).toBeGreaterThan(0);
});

Then(/^I should see a loan error message$/, async () => {
  const hasError = await RequestLoanPage.hasLoanError();
  await expect(hasError).toBe(true);
});

Then(/^I should see validation errors for loan required fields$/, async () => {
  const hasErrors = await RequestLoanPage.hasValidationErrors();
  await expect(hasErrors).toBe(true);
});

Then(/^I should see a loan response$/, async () => {
  const hasResult = await RequestLoanPage.hasLoanResult();
  await expect(hasResult).toBe(true);
});
