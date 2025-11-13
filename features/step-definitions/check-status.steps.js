import { When, Then } from "@wdio/cucumber-framework";

import AccountsOverviewPage from "../pageobjects/accounts-overview.page.js";
import AccountDetailsPage from "../pageobjects/account-details.page.js";

// Variable para almacenar los detalles de la primera cuenta
let firstAccountDetails = null;

When(/^I click on the first account$/, async () => {
  await AccountsOverviewPage.clickFirstAccount();
});

When(/^I click on the second account$/, async () => {
  await AccountsOverviewPage.clickSecondAccount();
});

When(/^I go back to accounts overview$/, async () => {
  await AccountDetailsPage.goBackToAccountsOverview();
});

Then(/^I should see the accounts overview table$/, async () => {
  const isDisplayed = await AccountsOverviewPage.isAccountsTableDisplayed();
  await expect(isDisplayed).toBe(true);
});

Then(/^I should see at least one account listed$/, async () => {
  const count = await AccountsOverviewPage.getAccountsCount();
  await expect(count).toBeGreaterThan(0);
});

Then(/^each account should display a balance$/, async () => {
  const hasBalances = await AccountsOverviewPage.allAccountsHaveBalance();
  await expect(hasBalances).toBe(true);
});

Then(/^I should be redirected to the account details page$/, async () => {
  const isOnDetailsPage = await AccountsOverviewPage.isOnAccountDetailsPage();
  await expect(isOnDetailsPage).toBe(true);
});

Then(/^I should see the account details displayed$/, async () => {
  const areDetailsDisplayed =
    await AccountDetailsPage.areAccountDetailsDisplayed();
  await expect(areDetailsDisplayed).toBe(true);

  // Guardar los detalles de la primera cuenta para comparación posterior
  firstAccountDetails = await AccountDetailsPage.getAccountDetails();
});

Then(/^I should see different account details$/, async () => {
  const areDetailsDisplayed =
    await AccountDetailsPage.areAccountDetailsDisplayed();
  await expect(areDetailsDisplayed).toBe(true);

  // Obtener los detalles de la segunda cuenta
  const secondAccountDetails = await AccountDetailsPage.getAccountDetails();

  // Verificar que el número de cuenta sea diferente
  await expect(secondAccountDetails.accountNumber).not.toBe(
    firstAccountDetails.accountNumber
  );
});
