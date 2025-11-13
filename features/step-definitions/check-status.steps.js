import { Then } from "@wdio/cucumber-framework";

import AccountsOverviewPage from "../pageobjects/accounts-overview.page.js";

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
