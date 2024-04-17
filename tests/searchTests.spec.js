// @ts-check
const { test, expect } = require("@playwright/test");
const SearchPage = require("../page_objects/searchPage");
const CardPage = require("../page_objects/itemCardPage");
const PreviewCard = require("../page_elements/previewCard");

test("Поиск товара по названию выдает список релевантных товаров", {
  tag: ['@search'],
}, async ({
  page,
}) => {
  const searchValue = "корабль";
  const regExpStr = searchValue.slice(0, -1);
  const search = new SearchPage(page);
  const previeCard = new PreviewCard(page);

  await search.goto("/");
  await search.fillSearchBox(searchValue);
  await search.submitSearchResponse();

  await expect(search.titlePage).toContainText(`Поиск: ${searchValue}`);

  for (const name of await previeCard.nameItem.all()) {
    await expect(name).toContainText(new RegExp(regExpStr, "i"));
  }
});

test("Поиск товара по артикулу выдает нужный товар", async ({ page }) => {
  const searchValue = "SMP-0202";
  const Search = new SearchPage(page);
  const previwCard = new PreviewCard(page);
  const Item = new CardPage(page);

  await Search.goto("/");
  await Search.fillSearchBox(searchValue);
  await Search.submitSearchResponse();

  await expect(Search.titlePage).toContainText(`Поиск: ${searchValue}`);
  expect(await previwCard.cardItem.all()).toHaveLength(1);

  await previwCard.openItemPage();
  const valueArticule = await Item.getItemArticle();
  await expect(valueArticule).toBe(searchValue);
});

test("При попытке поиска по несуществующему артикулу/названию выводится сообщение об отсутствии соответствий", async ({
  page,
}) => {
  const searchValue = "чизкейк";
  const Search = new SearchPage(page);
  const previwCard = new PreviewCard(page);

  await Search.goto("/");
  await Search.fillSearchBox(searchValue);
  await Search.submitSearchResponse();

  await expect(Search.titlePage).toContainText(`Поиск: ${searchValue}`);
  await expect(Search.listItem).toContainText(`В этой категории нет товаров`);
  await expect(await previwCard.cardItem.all()).toHaveLength(0);
});
