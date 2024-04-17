const { test, expect } = require("@playwright/test");
const Captcha = require("2captcha");
const BasePage = require("./basePage");

class SearchPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    (this.page = page),
      (this.btnLoginSignUp = page.locator('[data-url="/go-login-signup/"]')),
      (this.fieldSearch = page.locator('[placeholder="Поиск товаров"]')),
      (this.btnSearch = page.locator('[action="/search/"] [type="submit"]')),
      (this.listSearchPreview = page.locator('[action="/search/"] .atcpl'));
  }

  /**
   * Метод выполняет ввод значения в окно поиска
   */
  async fillSearchBox(item) {
    await this.fieldSearch.fill(item);
  }

  /**
   * Метод выполняет поисковый запрос
   */
  async submitSearchResponse() {
    await this.btnSearch.click();
  }
}

module.exports = SearchPage;
