const { test, expect } = require("@playwright/test");
const PreviewCard = require("../page_elements/previewCard");
const BasePage = require("../page_objects/basePage");
const FilterSidebar = require("../page_elements/filterSidebar");

test.describe(`Фильтрация товаров по цене`, async () => {
  const params = [
    { cat: "radioupravlyaemye-modeli", min: null, max: "14000" },
    { cat: "akkumulyatory-i-zaryadnye-ustroystva", min: "150", max: "5000" },
    { cat: "akkumulyatory-i-zaryadnye-ustroystva", min: "1299", max: "15000" },
  ];

  for (const param of params) {
    test(`Фильтрация товаров  категории ${param.cat} по цене ${param.min} - ${param.max}`, async ({
      page,
    }) => {
      const basePage = new BasePage(page);
      const filterSidebar = new FilterSidebar(page);
      const previewCard = new PreviewCard(page);

      const filterUrl = await filterSidebar.getFilterUrlByParams(
        param.cat,
        param.max,
        param.min,
      );
      await basePage.goto(`/${param.cat}/`);
      await page.waitForLoadState();

      await filterSidebar.fillMaxPriceField(param.max);
      await filterSidebar.fillMinPriceField(param.min);

      await page.waitForLoadState();

      await filterSidebar.btnShowItems.click();

      await page.waitForLoadState();
      await page.waitForURL(filterUrl);
      await page.waitForLoadState();

      for (const item of await previewCard.priceItem.all()) {
        let price = (await item.innerText())
          .replace(" руб.", "")
          .replace(" ", "");
        await expect(Number(price)).toBeGreaterThanOrEqual(Number(param.min));
        await expect(Number(price)).toBeLessThanOrEqual(Number(param.max));
      }
    });
  }
});

test.describe(`После сброса настроек фильтрации по цене список становится прежним`, {
  tag: ['@filter'],
}, async () => {
  const params = [
    { cat: "radioupravlyaemye-modeli", min: null, max: "1000" },
    { cat: "akkumulyatory-i-zaryadnye-ustroystva", min: "2500", max: "5000" },
    { cat: "akkumulyatory-i-zaryadnye-ustroystva", min: "1299", max: "15000" },
  ];
  for (const param of params) {
    test.beforeEach(async ({ page }) => {
      const basePage = new BasePage(page);
      const filterSidebar = new FilterSidebar(page);

      const filterUrl = await filterSidebar.getFilterUrlByParams(
        param.cat,
        param.max,
        param.min,
      );
      await basePage.goto(filterUrl);
      await page.waitForLoadState();
    });

    test(`После сброса настроек фильтрации по цене ${param.min} - ${param.max} список товаров ${param.cat} становится прежним`, async ({
      page,
    }) => {
      const previewCard = new PreviewCard(page);

      const filterList = await previewCard.priceItem.all();

      await page.getByRole("link", { name: "Сбросить" }).click();
      await page.waitForLoadState();

      const lessFilterList = await previewCard.priceItem.all();
      expect(filterList.length).toBeLessThan(lessFilterList.length);
    });
  }
});
