const WizardScene = require("telegraf/scenes/wizard");
const text = require("../constants/text");
const axios = require("axios");

const regex = /^.{3,32}#[0-9]{4}$/;
const questNumber = 1;

const icons = ["🥇", "🥈", "🥉", "🎖", "🎖", "⚡️", "⚡️", "⚡️", "⚡️"];

const points = ["10XP", "7XP", "5XP", "3XP", "2XP", "1XP", "1XP", "1XP", "1XP"];

module.exports = new WizardScene(
  "quest1",
  async (ctx) => {
    try {
      await ctx.replyWithHTML(`${text.discord}`);
      return ctx.wizard.next();
    } catch {
      console.error("Error of the discord command");
    }
  },
  async (ctx) => {
    try {
      const discord = ctx.message.text;
      ctx.session.discord = discord;
      const index = ctx.wizard.cursor;
      const users = await axios.get(
        `http://localhost:5000/api/quest?${
          questNumber && `questNumber=${questNumber}`
        }`
      );
      const discords = users.data.map((item) => item.discord);
      if (regex.test(discord) === true && !discords.includes(discord)) {
        await ctx.replyWithHTML(`${text.successDiscord}`);
        await ctx.replyWithPhoto(
          { url: text.url_1 },
          { caption: `${text.quest_1}` }
        );
        return ctx.wizard.next();
      } else {
        discords.includes(discord)
          ? await ctx.replyWithHTML(`${text.errorExist}`)
          : await ctx.replyWithHTML(`${text.errorDiscord}`);
        await ctx.wizard.selectStep(index);
      }
    } catch {
      await ctx.scene.leave();
      console.error("Error of the discord command");
    }
  },
  async (ctx) => {
    try {
      const questAnswer = ctx.message.text;
      const index = ctx.wizard.cursor;
      const chatId = ctx.message.chat.id;
      const discord = ctx.session.discord;
      const limit = 9;
      if (questAnswer.trim().toLowerCase() === text.answer_1) {
        const data = {
          method: "telegram",
          chatId: chatId,
          discord: discord,
          questNumber: questNumber,
        };
        await axios.post("http://localhost:5000/api/quest", data);
        const users = await axios.get(
          `http://localhost:5000/api/quest?${
            questNumber && `questNumber=${questNumber}`
          }&${limit && `limit=${limit}`}`
        );
        await ctx.replyWithHTML(
          `🥳Congratulations, warrior!\n\n<b>Leaderboard</b> for <b>Quest ${questNumber}:</b>\n\n${users.data
            .map(
              (user, index) =>
                `${icons[index]} ${user.discord} - ${points[index]};\n`
            )
            .join("")}`,
          {
            reply_markup: {
              inline_keyboard: [
                [{ text: "➡️Continue", callback_data: "quests" }],
                [{ text: "🧩Menu", callback_data: "back" }],
              ],
            },
          }
        );
        await ctx.scene.leave();
      } else {
        await ctx.replyWithHTML(`${text.error}`);
        await ctx.wizard.selectStep(index);
      }
    } catch (error) {
      console.error("Error of the result command");
    }
  }
);
