// @ts-check
const { test, expect, chromium } = require("@playwright/test");
const LoginModal = require("../page_elements/loginModalElement");
const BasePage = require("../page_objects/basePage");
const { HelperEmail } = require("../page_elements/helperEmailService");
const ProfilePage = require("../page_objects/profilePage");

//не удается пройти второй этап капчи - тест падает
test("Авторизация по временному коду", {
  tag: ['@auth'],
}, async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const helperPage = await context.newPage();

  const Base = new BasePage(page);
  const helper = new HelperEmail(helperPage);
  const Login = new LoginModal(page);
  const Profile = new ProfilePage(page);

  await Base.goto("/");
  await Base.openLoginForm();
  await Login.toggle2AuthCodeForm();
  await helper.gotoEmailService();
  const emailAdress = await helper.getEmail();

  await Login.fillEmail(emailAdress);
  await Login.checkCapture(); //не удается пройти второй этап капчи - тест падает
  await Login.submitGetCodeForm();
  const authCode = await helper.getAuthCode();
  await Login.fillAuthCode(authCode);
  await Login.submitAuthCodeForm();

  await expect(Profile.titlePage).toBeVisible;
  await expect(Profile.titleHelloUser).toContainText(
    await helper.getLoginByEmail(emailAdress),
  );
  await context.close();
});
