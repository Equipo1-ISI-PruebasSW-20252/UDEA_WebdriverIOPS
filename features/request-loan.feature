Feature: Para Bank Request Loan Feature

  Como usuario,
  quiero solicitar un préstamo,
  para obtener fondos adicionales cuando los necesite.

  Background:
    Given I am on the login page
    When I login with john and demo
    Then I should see a text saying Accounts Overview

  Scenario: Solicitud de préstamo exitosa con datos válidos
    Given I am on the request loan page
    When I enter loan amount "100"
    And I enter down payment "10"
    And I select the account "13122"
    And I click the apply now button
    Then I should see a loan approval confirmation
    And the loan status should be "Approved"
    And I should see the new account number

  Scenario: Solicitud de préstamo rechazada con montos inválidos
    Given I am on the request loan page
    When I enter loan amount "0"
    And I enter down payment "0"
    And I select the account "13122"
    And I click the apply now button
    Then I should see a loan error message

  Scenario: Validación de campos obligatorios vacíos
    Given I am on the request loan page
    When I click the apply now button
    Then I should see validation errors for loan required fields

  Scenario: Solicitud de préstamo con monto alto
    Given I am on the request loan page
    When I enter loan amount "10000"
    And I enter down payment "500"
    And I select the account "13122"
    And I click the apply now button
    Then I should see a loan response
