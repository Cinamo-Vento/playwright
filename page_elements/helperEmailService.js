const { test, expect } = require("@playwright/test");
// const { config } = require('dotenv');
require("dotenv").config();

// const { configDotenv } = require('dotenv');
// const config = require('./playwright.config');

exports.HelperEmail = class HelperEmail {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    (this.page = page),
      (this.fieldEmail = page.locator(
        '[data-clipboard-target="#email .email"]',
      )),
      (this.listUnseenMessages = page.locator("#messages tr.unseen")),
      (this.textMessage = page.locator("#read iframe"));
  }

  /**
   * Метод открывает сайт, предоставляющий сервис одноразовой почты
   */
  async gotoEmailService() {
    await this.page.goto(process.env.EMAIL_SERVICE_URL);
  }

  /**
   * Метод возвращает временный email
   */
  async getEmail() {
    return await this.fieldEmail.innerText();
  }

  /**
   * Метод находит в списке непрочитанных сообщений соббщение с нужной темой и открывает его
   * @param {"string"} theme Тема сообщения
   */
  async openUnseenMessageByTheme(theme) {
    await this.listUnseenMessages.getByText(theme).click();
  }

  /**
   * Метод возвращает текст сообщения
   */
  async getTextMessage(theme) {
    await this.listUnseenMessages.getByText(theme).click();
    return await this.textMessage.textContent();
  }

  /**
   * Метод возвращает код для входа на сайт
   */
  async getAuthCode() {
    const theme = "Мир моделей - вход на сайт";
    const prefixText = "Ваш одноразовый код для входа на сайт: ";
    const suffixText = ". Никому его не сообщайте.";
    const textMessage = await this.getTextMessage(theme);
    let authCode = textMessage.replace(prefixText, "").replace(suffixText, "");
    return authCode;
  }

  /**
   * Метод принимает адрес электронной почты пользователя и возвращает часть с логином
   */
  async getLoginByEmail(email) {
    const login = email.split("@", 1)[0];
    return login;
  }
};
