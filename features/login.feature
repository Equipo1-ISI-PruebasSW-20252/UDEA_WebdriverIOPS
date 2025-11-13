Feature: Para Bank Login Feature

  Scenario: Login button should be disabled when fields are empty
    Given I am on the login page
    When I clear all login fields
    Then the login button should be disabled

  Scenario: Login button should be disabled when only username is filled
    Given I am on the login page
    When I clear all login fields
    And I enter username "john"
    Then the login button should be disabled

  Scenario: Login button should be disabled when only password is filled
    Given I am on the login page
    When I clear all login fields
    And I enter password "demo"
    Then the login button should be disabled

  Scenario: Login button should be enabled when both fields are filled
    Given I am on the login page
    When I clear all login fields
    And I enter username "john"
    And I enter password "demo"
    Then the login button should be enabled

  Scenario Outline: As a user, I can log into the Parabank Accounts Service Page
    Given I am on the login page
    When I login with <username> and <password>
    Then I should see a text saying <message>

    Examples:
      | username        | password | message           |
      | invalidUsername | password | Error!            |
      | john            | demo     | Accounts Overview |
