import { Given, When, Then } from "@wdio/cucumber-framework";

import TransferFundsPage from "../pageobjects/transfer-funds.page.js";

Given(/^I am on the transfer funds page$/, async () => {
  await TransferFundsPage.open();
});

When(/^I enter transfer amount "([^"]*)"$/, async (amount) => {
  await TransferFundsPage.setAmount(amount);
});

When(/^I select from account "([^"]*)"$/, async (accountId) => {
  await TransferFundsPage.selectFromAccountById(accountId);
});

When(/^I select to account "([^"]*)"$/, async (accountId) => {
  await TransferFundsPage.selectToAccountById(accountId);
});

When(/^I click the transfer button$/, async () => {
  await TransferFundsPage.clickTransfer();
});

Then(/^I should see a successful transfer message$/, async () => {
  const isSuccessful = await TransferFundsPage.isTransferSuccessful();
  await expect(isSuccessful).toBe(true);
});

Then(/^the transferred amount should be "([^"]*)"$/, async (expectedAmount) => {
  const actualAmount = await TransferFundsPage.getTransferredAmount();
  await expect(actualAmount).toBe(expectedAmount);
});

Then(/^the from account should be "([^"]*)"$/, async (expectedAccountId) => {
  const actualAccountId = await TransferFundsPage.getFromAccountId();
  await expect(actualAccountId).toBe(expectedAccountId);
});

Then(/^the to account should be "([^"]*)"$/, async (expectedAccountId) => {
  const actualAccountId = await TransferFundsPage.getToAccountId();
  await expect(actualAccountId).toBe(expectedAccountId);
});

Then(/^I should see an error message$/, async () => {
  const hasError = await TransferFundsPage.hasError();
  await expect(hasError).toBe(true);
});

Then(/^the transfer result should be "([^"]*)"$/, async (expectedResult) => {
  if (expectedResult === "success") {
    const isSuccessful = await TransferFundsPage.isTransferSuccessful();
    await expect(isSuccessful).toBe(true);
  } else if (expectedResult === "error") {
    const hasError = await TransferFundsPage.hasError();
    await expect(hasError).toBe(true);
  }
});

Then(
  /^the account "([^"]*)" balance should be at least "([^"]*)"$/,
  async (accountId, minimumBalance) => {
    const balance = await TransferFundsPage.getAccountBalance(accountId);
    await expect(balance).toBeGreaterThanOrEqual(parseFloat(minimumBalance));
  }
);
