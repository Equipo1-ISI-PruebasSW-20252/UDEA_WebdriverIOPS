import { Given, When, Then } from "@wdio/cucumber-framework";

import LoginPage from "../pageobjects/login.page.js";

const pages = {
  login: LoginPage,
};

Given(/^I am on the (\w+) page$/, async (page) => {
  await pages[page].open();
});

//LOGIN
When(/^I login with (\w+) and (.+)$/, async (username, password) => {
  await LoginPage.login(username, password);
});

When(/^I clear all login fields$/, async () => {
  await LoginPage.clearFields();
});

When(/^I enter username "([^"]*)"$/, async (username) => {
  await LoginPage.setUsername(username);
});

When(/^I enter password "([^"]*)"$/, async (password) => {
  await LoginPage.setPassword(password);
});

Then(/^I should see a text saying (.*)$/, async (message) => {
  if (message == "Error!") {
    // invalid username or password
    await expect($(".title")).toBeExisting();
    await expect($(".title")).toHaveTextContaining(message);
  } else {
    // valid username or password
    await expect($(".title")).toBeExisting();
    await expect($(".title")).toHaveTextContaining(message);
  }
});

Then(/^the login button should be disabled$/, async () => {
  const isEnabled = await LoginPage.isLoginButtonEnabled();
  await expect(isEnabled).toBe(false);
});

Then(/^the login button should be enabled$/, async () => {
  const isEnabled = await LoginPage.isLoginButtonEnabled();
  await expect(isEnabled).toBe(true);
});
