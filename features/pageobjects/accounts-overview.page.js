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
    console.log("🔍 Verificando que todas las cuentas tengan balance...");

    // Esperar a que las filas existan
    await this.firstAccountRow.waitForExist({ timeout: 5000 });

    // Obtener todas las filas
    const rows = await this.accountRows;
    console.log("📊 Total de filas a verificar:", rows.length);

    if (rows.length === 0) {
      console.log("❌ No se encontraron filas");
      return false;
    }

    // Iterar sobre todas las filas EXCEPTO la última (que es "Total")
    const accountRowsOnly = rows.slice(0, -1);
    console.log("📊 Filas de cuentas (sin Total):", accountRowsOnly.length);

    for (let i = 0; i < accountRowsOnly.length; i++) {
      const row = accountRowsOnly[i];

      // Obtener todas las columnas <td> de esta fila
      const columns = await row.$$("td");
      console.log(`  Fila ${i + 1}: ${columns.length} columnas`);

      // Verificar que tenga exactamente 3 columnas
      if (columns.length !== 3) {
        console.log(`  ❌ Fila ${i + 1} no tiene 3 columnas`);
        return false;
      }

      // Obtener el texto de la columna del medio (índice 1 = Balance)
      const balanceText = await columns[1].getText();
      console.log(`  Balance en fila ${i + 1}: "${balanceText}"`);

      // Verificar que contenga el símbolo $
      if (!balanceText.includes("$")) {
        console.log(`  ❌ Fila ${i + 1} no tiene símbolo $ en el balance`);
        return false;
      }

      console.log(`  ✅ Fila ${i + 1} válida`);
    }

    console.log("✅ Todas las cuentas tienen balance correctamente");
    return true;
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open(ROUTES.ACCOUNTS_OVERVIEW);
  }
}

export default new AccountsOverviewPage();
