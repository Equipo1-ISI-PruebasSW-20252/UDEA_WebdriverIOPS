Feature: Consulta de Estados de Cuentas

  Scenario: User logs in and sees all accounts with their balances
    Given I am on the login page
    When I login with john and demo
    Then I should see a text saying Accounts Overview
    And I should see the accounts overview table
    And I should see at least one account listed
    And each account should display a balance

  Scenario: User can click on an account to view details
    Given I am on the login page
    When I login with john and demo
    And I click on the first account
    Then I should be redirected to the account details page
    And I should see the account details displayed

  Scenario: Account details update when switching between accounts
    Given I am on the login page
    When I login with john and demo
    And I click on the first account
    Then I should see the account details displayed
    When I go back to accounts overview
    And I click on the second account
    Then I should see different account details
