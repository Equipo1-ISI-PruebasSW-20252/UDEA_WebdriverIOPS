import Page from "./page.js";
import { ROUTES } from "../../utils/constants.js";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
  /**
   * define selectors using getter methods
   */
  get inputUsername() {
    return $("input[name='username']");
  }

  get inputPassword() {
    return $("input[name='password']");
  }

  /**
   * a submit button element inside the login form without direct child combinator
   */
  get btnSubmit() {
    return $("form[name='login'] input[type='submit']");
  }

  /**
   * check if the login button is enabled
   */
  async isLoginButtonEnabled() {
    return await this.btnSubmit.isEnabled();
  }

  /**
   * clear all input fields
   */
  async clearFields() {
    await this.inputUsername.clearValue();
    await this.inputPassword.clearValue();
  }

  /**
   * set only username field
   */
  async setUsername(username) {
    await this.inputUsername.setValue(username);
  }

  /**
   * set only password field
   */
  async setPassword(password) {
    await this.inputPassword.setValue(password);
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  async login(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open(ROUTES.ROOT_LOGIN);
  }
}

export default new LoginPage();
