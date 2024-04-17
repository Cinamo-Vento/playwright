const { test, expect } = require("@playwright/test");
const BasePage = require("./basePage");

class ProfilePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.page = page;
    (this.titlePage = page.getByRole("heading", { name: "Личный кабинет" })),
      (this.titleHelloUser = page.locator("div.my-hello-inner b"));
  }

  /**
   * Метод переходит по url
   * @param {url} url
   */
  async goto(url) {
    await this.page.goto(url);
  }
}

module.exports = ProfilePage;
