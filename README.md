# MonoStatus

Telegram-бот проверяет доступность сайта `https://monogram.de1.netrun.io` и
отправляет администратору сообщение при ошибке ответа.

## Файлы проекта

- `index.js` — корневая точка запуска бота.
- `package.json` — корневые зависимости и команда `npm start`.
- `Dockerfile` — сборка для Bothost из корневых файлов проекта.

## Запуск

Нужны переменные окружения `BOT_TOKEN` и `ADMIN_ID`. Не добавляйте их значения
в Git. В Replit задайте их в Secrets; в Bothost задайте их в настройках сервиса.

Запустить локально после установки зависимостей:

```sh
npm start
```

Для BotHost выберите Telegram / Node.js. Он использует корневые
`package.json` и `package-lock.json` и запускает `index.js` командой Node.js.
Проверка сайта использует встроенный `fetch`, дополнительный HTTP-пакет не нужен.

Бот использует long polling. Перед запуском копии на Bothost остановите
workflow `MonoStatus Bot` в Replit, чтобы два процесса не спорили за обновления
одного Telegram-бота.
