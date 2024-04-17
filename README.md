# playwright

Данный репозиторий включает UI тесты для сайта https://modelsworld.ru/

**Тестовые наборы:**

1. Поиск товаров - npx playwright test --grep '@search',
2. Фильтрация товаров - npx playwright test --grep '@filter'
3. Авторизация(падает из-за капчи) - npx playwright test --grep '@auth'

**Команды:**

1. запустить все тесты в headless - npm run test:all,
2. запустить тесты для chrome в UI режиме - npm run test:chrome:ui,
3. сгенерировать отчет в аллюре - npm run allure:generate_report,
4. открыть отчет в аллюре - npm run allure:open_report

