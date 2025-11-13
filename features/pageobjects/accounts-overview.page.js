import Page from "./page.js";
import { ROUTES } from "../../utils/constants.js";

/**
 * Page Object for Accounts Overview
 */
class AccountsOverviewPage extends Page {
  /**
   * define selectors using getter methods
   */
  get accountsTable() {
    return $("#accountTable");
  }

  get accountRows() {
    return $$("#accountTable tbody tr");
  }

  get firstAccountRow() {
    return $("#accountTable tbody tr:first-child");
  }

  /**
   * check if accounts overview table is displayed
   */
  async isAccountsTableDisplayed() {
    await this.accountsTable.waitForDisplayed({ timeout: 5000 });
    return await this.accountsTable.isDisplayed();
  }

  /**
   * get the number of accounts listed
   */
  async getAccountsCount() {
    // Esperar a que exista al menos una fila en el tbody
    await this.firstAccountRow.waitForExist({ timeout: 5000 });

    // Obtiene la cantidad de filas después de asegurarse de que están cargadas
    const rows = await this.accountRows;

    // Resta 1 para excluir la fila del encabezado si es necesario
    const accountCount = rows.length > 0 ? rows.length - 1 : 0;
    return accountCount;
  }

  /**
   * check if all accounts display a balance
   * Verifica que cada fila de cuenta (excepto la última que es "Total")
   * tenga 3 columnas y la del medio contenga el símbolo $
   */
  async allAccountsHaveBalance() {
    // Esperar a que las filas existan
    await this.firstAccountRow.waitForExist({ timeout: 5000 });

    // Obtener todas las filas
    const rows = await this.accountRows;

    if (rows.length === 0) {
      return false;
    }

    // Iterar sobre todas las filas EXCEPTO la última (que es "Total")
    const accountRowsOnly = rows.slice(0, -1);

    for (let i = 0; i < accountRowsOnly.length; i++) {
      const row = accountRowsOnly[i];

      // Obtener todas las columnas de esta fila
      const columns = await row.$$("td");

      // Verificar que tenga exactamente 3 columnas
      if (columns.length !== 3) {
        return false;
      }

      // Obtener el texto de la columna del balance (índice 1)
      const balanceText = await columns[1].getText();

      // Verificar que contenga el símbolo $
      if (!balanceText.includes("$")) {
        return false;
      }
    }

    return true;
  }

  /**
   * click on the first account link
   */
  async clickFirstAccount() {
    // Esperar a que exista la primera fila
    await this.firstAccountRow.waitForExist({ timeout: 5000 });

    // Obtener el link dentro de la primera columna de la primera fila
    const firstAccountLink = await this.firstAccountRow.$("td:first-child a");

    // Click en el link
    await firstAccountLink.click();
  }

  /**
   * click on the second account link
   */
  async clickSecondAccount() {
    // Esperar a que existan las filas
    await this.firstAccountRow.waitForExist({ timeout: 5000 });

    // Obtener todas las filas (excepto la última que es Total)
    const rows = await this.accountRows;
    const accountRowsOnly = rows.slice(0, -1);

    // Verificar que existe una segunda cuenta
    if (accountRowsOnly.length < 2) {
      throw new Error("No hay segunda cuenta disponible");
    }

    // Obtener el link de la segunda fila
    const secondAccountLink = await accountRowsOnly[1].$("td:first-child a");

    // Click en el link
    await secondAccountLink.click();
  }

  /**
   * check if user is on account details page
   */
  async isOnAccountDetailsPage() {
    // Verificar que la URL contiene "activity.htm?id="
    const currentUrl = await browser.getUrl();
    return currentUrl.includes("activity.htm?id=");
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open(ROUTES.ACCOUNTS_OVERVIEW);
  }
}

export default new AccountsOverviewPage();
