const WizardScene = require("telegraf/scenes/wizard");
const text = require("../constants/text");
const axios = require("axios");

const questNumber = 5;

const icons = ["🥇", "🥈", "🥉", "🎖", "🎖", "⚡️", "⚡️", "⚡️", "⚡️"];

const points = ["10XP", "7XP", "5XP", "3XP", "2XP", "1XP", "1XP", "1XP", "1XP"];

module.exports = new WizardScene(
  "quest5",
  async (ctx) => {
    try {
      await ctx.replyWithPhoto(
        { url: text.url_5 },
        { caption: `${text.quest_5}` }
      );
      return ctx.wizard.next();
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
      const user = await axios.get(
        `http://localhost:5000/api/quest/telegram?questNumber=1&${
          chatId && `chatId=${chatId}`
        }`
      );
      const limit = 9;
      if (questAnswer.trim().toLowerCase() === text.answer_5) {
        const data = {
          method: "telegram",
          chatId: chatId,
          discord: user.data.discord,
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
