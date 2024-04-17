const { test, expect } = require("@playwright/test");
const LoginModal = require("../page_elements/loginModalElement");

class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    (this.page = page),
      (this.headerUpper = page.locator("header .h-up-upper")),
      (this.headerUpper = page.locator("header .h-d-outer")),
      (this.titlePage = page.locator("span.category-name h1")),
      (this.listItem = page.locator("#product-list"));
  }

  /**
   * Метод переходит по url
   * @param {url} url
   */
  async goto(url) {
    await this.page.goto(url);
  }

  /**
   * Метод открывает форму "Вход или регистрация"
   */
  async openLoginForm() {
    await this.page.getByRole("link", { name: "Вход / Регистрация" }).click();
  }

  /**
   * Метод переходит в личный кабинет
   */
  async goToUserCabinet() {
    await this.page.getByRole("link", { name: "Кабинет" }).click();
  }
}

module.exports = BasePage;
