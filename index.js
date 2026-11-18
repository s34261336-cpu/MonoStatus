const axios = require("axios");
const { Bot } = require("node-telegram-bot-api");

const SITE_URL = "https://monogram.de1.netrun.io";
const CHECK_INTERVAL_MS = 240_000;
const REQUEST_TIMEOUT_MS = 15_000;

const { BOT_TOKEN, ADMIN_ID } = process.env;

if (!BOT_TOKEN || !ADMIN_ID) {
  const missingVariables = [
    !BOT_TOKEN && "BOT_TOKEN",
    !ADMIN_ID && "ADMIN_ID",
  ].filter(Boolean);

  console.error(`Missing required environment variables: ${missingVariables.join(", ")}`);
  process.exit(1);
}

const bot = new Bot(BOT_TOKEN);

bot.command("start", async (context) => {
  await context.reply("Бот-MonoStatus запущен. Слежу за сайтом");
});

bot.catch((error) => {
  console.error("Telegram update handler failed:", error.name || "unknown error");
});

async function pingSite() {
  try {
    const response = await axios.get(SITE_URL, {
      timeout: REQUEST_TIMEOUT_MS,
      validateStatus: () => true,
    });

    if (response.status !== 200) {
      throw new Error(`Unexpected HTTP status: ${response.status}`);
    }
  } catch (error) {
    const reason = axios.isAxiosError(error)
      ? error.code || `HTTP_${error.response?.status || "ERROR"}`
      : "SITE_CHECK_FAILED";

    console.error("Site check failed:", reason);

    try {
      await bot.api.sendMessage({
        chat_id: ADMIN_ID,
        text: "⚠️ Сайт упал!",
      });
    } catch {
      console.error("Could not send the site-down alert to Telegram.");
    }
  }
}

setInterval(pingSite, CHECK_INTERVAL_MS);

bot.startPolling().catch((error) => {
  console.error("Telegram polling could not start:", error.name || "unknown error");
  process.exitCode = 1;
});
