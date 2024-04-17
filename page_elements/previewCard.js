const { test, expect } = require("@playwright/test");

class PreviewCard {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    (this.page = page),
      (this.cardItem = page.locator('[itemprop="itemOffered"]')),
      (this.nameItem = page.locator(
        '[itemprop="itemOffered"] [itemprop="name"]',
      )),
      (this.priceItem = page.locator(
        '[itemprop="itemOffered"] .slide-m-price',
      ));
  }

  /**
   * Метод переходит на страницу товара
   */
  async openItemPage() {
    await this.cardItem.click();
  }

  /**
   * Метод переходит на страницу товара с определенным именем
   */
  async openItemPageByFullName(fullname) {
    await this.cardItem.getByTitle(fullname).click();
  }

  async getPriceValue() {
    return await this.priceItem.innerText();
  }
}

module.exports = PreviewCard;
