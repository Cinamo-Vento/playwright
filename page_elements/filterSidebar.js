const { test, expect } = require("@playwright/test");

class FilterSidebar {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    (this.page = page),
      (this.filterPrice = page.locator('[data-feature="price"]')),
      (this.fieldPriceMin = page.locator('[name="price_min"]')),
      (this.fieldPriceMax = page.locator('[name="price_max"]')),
      (this.btnShowItems = page.getByRole("button", { name: "Показать" }));
  }

  /**
   * Метод устанавливает минимальную и максимальную цену в фильтре
   * @param {string} minPrice
   */
  async fillMinPriceField(minPrice) {
    await this.page.waitForSelector("input");

    if (minPrice != null) {
      await expect(this.fieldPriceMin).toBeVisible();
      await this.fieldPriceMin.click();
      await this.fieldPriceMin.fill(minPrice);
      await this.fieldPriceMax.click();
    }
  }

  /**
   * Метод устанавливает максимальную цену в фильтре
   * @param {string} maxPrice
   */
  async fillMaxPriceField(maxPrice) {
    await this.page.waitForSelector("input");

    if (maxPrice) {
      await expect(this.fieldPriceMax).toBeVisible();
      await this.fieldPriceMax.click();
      await this.fieldPriceMax.fill(maxPrice);
      await this.fieldPriceMin.click();
    }
  }

  /**
   * Метод нажимает на кнопку "Показать" (отправляет форму с настройками фильтрации)
   */
  async submitFilterForm() {
    this.btnShowItems.click();
  }

  /**
   * Метод формирует url при определенных настройках фильтрации товаров по цене
   * @param {string} cat
   * @param {string} maxPrice
   * @param {string} minPrice
   * @returns
   */
  async getFilterUrlByParams(cat, maxPrice = null, minPrice = null) {
    let filterUrl = `/${cat}/`;

    if (maxPrice && minPrice) {
      filterUrl = `${filterUrl}?price_max=${maxPrice}&price_min=${minPrice}`;
    }
    if (maxPrice && !minPrice) {
      filterUrl = `${filterUrl}?price_max=${maxPrice}`;
    }
    if (minPrice && !maxPrice) {
      filterUrl = `${filterUrl}?price_min=${minPrice}`;
    }

    console.log(filterUrl, "URL");
    return filterUrl;
  }
}

module.exports = FilterSidebar;
