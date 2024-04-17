const { test, expect } = require("@playwright/test");

class LoginModal {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    (this.page = page),
      (this.headerModal = page.locator(".sys-popup.pp h2")),
      (this.fieldEmail = page.locator('[name="auth[email]"]')),
      (this.fieldPassword = page.locator('[name="auth[password]"]')),
      (this.checkboxRecapture = page.locator(
        '[tabindex="0"]#recaptcha-anchor',
      )),
      (this.btnLoginPassword = page.locator(
        '[data-type="password"] button[type="submit"]',
      )),
      (this.btnGetCode = page.locator(
        '[data-type="password"] button[type="submit"]',
      )),
      (this.toggleToPassword = page.locator('[data-toggle-to="password"]')),
      (this.toggleToCode = page.locator('[data-toggle-to="code"]')),
      (this.fieldAuthCode = page.locator('[name="auth[code]"]')),
      (this.btnLoginCode = page.locator('[data-step="2"] [data-text="Войти"]'));
  }

  /**
   * Метод заполняет поле "Ваш email"
   * @param {string} email
   */
  async fillEmail(email) {
    await this.fieldEmail.fill(email);
  }

  /**
   * Метод заполняет поле "Введите пароль"
   * @param {string} password
   */
  async fillPassword(password) {
    await this.fieldPassword.fill(password);
  }

  /**
   * Метод отмечает чекбокс "Я не робот"
   */
  async checkCapture() {
    await this.page
      .frameLocator('iframe[title="reCAPTCHA"]')
      .locator('[id="recaptcha-anchor"]')
      .click();
    // await this.checkboxRecapture.click()
  }

  /**
   * Метод отправляет форму авторизации по паролю
   */
  async submitAuthPasswordForm() {
    await this.btnLoginPassword.click();
  }

  /**
   * Метод переходит к форме авторизации по одноразовому коду
   */
  async toggle2AuthCodeForm() {
    await this.toggleToCode.click();
  }

  /**
   * Метод выполняет запрос на получение временного кода
   */
  async submitGetCodeForm() {
    await this.btnGetCode.click();
  }

  /**
   * Метод заполняет поле "Код из сообщения"
   * @param {string} authCode
   */
  async fillAuthCode(authCode) {
    await this.fieldAuthCode.fill(authCode);
  }

  /**
   * Метод отправляет форму авторизации по временному коду
   */
  async submitAuthCodeForm() {
    await this.btnLoginCode.click();
  }
}

module.exports = LoginModal;
