Feature: Para Bank Bill Pay Feature

  Como usuario autenticado,
  quiero realizar pagos a beneficiarios,
  para cumplir con mis compromisos financieros.

  Background:
    Given I am on the login page
    When I login with john and demo
    Then I should see a text saying Accounts Overview

  Scenario: Pago exitoso a un beneficiario con todos los datos válidos
    Given I am on the bill pay page
    When I enter payee name "Laura Mendoza"
    And I enter payee address "2487 Willow Creek Rd"
    And I enter payee city "Denver"
    And I enter payee state "CO"
    And I enter payee zip code "80204"
    And I enter payee phone "7205554831"
    And I enter payee account "13344"
    And I verify payee account "13344"
    And I enter payment amount "100"
    And I select the account to pay from "12345"
    And I click the send payment button
    Then I should see a payment confirmation message
    And the payment amount should be "$100.00"
    And the payee name should be "Laura Mendoza"

  Scenario: Validación de campos obligatorios vacíos
    Given I am on the bill pay page
    When I click the send payment button
    Then I should see validation errors for required fields

  Scenario: Validación de cuentas no coincidentes
    Given I am on the bill pay page
    When I enter payee name "Laura Mendoza"
    And I enter payee address "2487 Willow Creek Rd"
    And I enter payee city "Denver"
    And I enter payee state "CO"
    And I enter payee zip code "80204"
    And I enter payee phone "7205554831"
    And I enter payee account "13344"
    And I verify payee account "13355"
    And I enter payment amount "100"
    And I select the account to pay from "12345"
    And I click the send payment button
    Then I should see an account mismatch error

  Scenario: Pago con monto inválido
    Given I am on the bill pay page
    When I enter payee name "Laura Mendoza"
    And I enter payee address "2487 Willow Creek Rd"
    And I enter payee city "Denver"
    And I enter payee state "CO"
    And I enter payee zip code "80204"
    And I enter payee phone "7205554831"
    And I enter payee account "13344"
    And I verify payee account "13344"
    And I enter payment amount "invalid"
    And I select the account to pay from "12345"
    And I click the send payment button
    Then I should see an invalid amount error
