# MonoStatus Bot on Bothost

The repository root is a pnpm workspace, so the root package manager setup is
not used for the bot deployment. Bothost can build this repository with the
root `Dockerfile`, which installs only the bot's runtime dependencies.

## Configure Bothost

1. Connect this Git repository and choose Telegram / Node.js.
2. In additional settings, enable **Use custom Dockerfile**.
3. Enter the Telegram token in Bothost's bot token field; Bothost provides it
   to the process as `BOT_TOKEN`.
4. Add `ADMIN_ID` as an environment variable with your numeric Telegram ID.
5. Deploy the bot.

The project does not contain token values. Do not commit secrets to Git.

## Avoid two polling processes

This bot uses long polling, and Telegram allows only one active polling process
per bot token. Stop the `MonoStatus Bot` workflow in Replit immediately before
starting the Bothost deployment, or the two copies will compete for updates.
