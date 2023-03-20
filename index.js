const { Telegraf } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const users = [];

bot.use(require("./composers/start.composer"));

bot.context.users = users;

bot.command("stats", async (ctx) => {
  try {
    await ctx.replyWithHTML(`Number of users: ${users.length}`);
  } catch (e) {
    console.error("Error of the starts command", e);
  }
});

bot.launch().then(() => {
  console.log(`bot started on @${bot.options.username}`);
});
