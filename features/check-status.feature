Feature: Consulta de Estados de Cuentas

  Scenario: User logs in and sees all accounts with their balances
    Given I am on the login page
    When I login with john and demo
    Then I should see a text saying Accounts Overview
    And I should see the accounts overview table
    And I should see at least one account listed
    And each account should display a balance
