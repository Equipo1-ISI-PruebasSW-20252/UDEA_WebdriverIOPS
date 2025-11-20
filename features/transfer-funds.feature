Feature: Para Bank Transfer Funds Feature

  Como usuario autenticado,
  quiero transferir fondos entre mis cuentas,
  para administrar mi dinero de forma flexible.

  Background:
    Given I am on the login page
    When I login with john and demo
    Then I should see a text saying Accounts Overview

  Scenario: Transferencia exitosa entre cuentas con saldo suficiente
    Given I am on the transfer funds page
    When I enter transfer amount "50"
    And I select from account "13233"
    And I select to account "12900"
    And I click the transfer button
    Then I should see a successful transfer message
    And the transferred amount should be "$50.00"
    And the from account should be "13233"
    And the to account should be "12900"

  Scenario: Validación de monto que excede el saldo disponible
    Given I am on the transfer funds page
    When I enter transfer amount "200"
    And I select from account "13011"
    And I select to account "12900"
    And I click the transfer button
    Then I should see an error message
