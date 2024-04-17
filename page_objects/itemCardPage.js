const { test, expect } = require("@playwright/test");
const BasePage = require("./basePage");

class CardPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    (this.page = page),
      (this.titlePage = page.locator('h1[itemprop="name"]')),
      (this.valueItemArticle = page
        .getByText("Артикул:")
        .locator("span[class]"));
  }

  /**
   * Метод возвращает значие артикула из карточки товара
   */
  async getItemArticle() {
    return await this.valueItemArticle.innerText();
  }
}

module.exports = CardPage;
