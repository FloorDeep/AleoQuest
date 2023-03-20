const { Composer, Stage, session } = require("telegraf");
const text = require("../constants/text");
const axios = require("axios");

const composer = new Composer();

const limit = 9;

let activeQuest = 2;

const icons = ["🥇", "🥈", "🥉", "🎖", "🎖", "⚡️", "⚡️", "⚡️", "⚡️"];

const points = ["10XP", "7XP", "5XP", "3XP", "2XP", "1XP", "1XP", "1XP", "1XP"];

const increment = () => {
  return (activeQuest += 1);
};

composer.command("start", async (ctx) => {
  try {
    ctx.users.push(ctx.from.id);
    await ctx.replyWithPhoto(
      {
        url: "https://sun9-55.userapi.com/impg/6i-1wrWR4FrUl7nV_CRCwSygCPX_ZZocB9mD8A/VYKLCmNJ8i8.jpg?size=995x506&quality=96&sign=a763d42fccb7ab25d1d317105a3255f4&type=album",
      },
      {
        caption: `🖐Welcome to Aleo Quests, ${ctx.from.first_name}. ${text.startText}`,
        reply_markup: {
          inline_keyboard: [
            [{ text: "🧩Go to Quests", callback_data: "quests" }],
            [{ text: "🏆Leaderboard", callback_data: "leaderboard" }],
            [{ text: "💰Rewards", callback_data: "rewards" }],
            [{ text: "📕FAQ", callback_data: "faq" }],
          ],
        },
      }
    );
  } catch (e) {
    console.error("error start command");
  }
});

composer.action("faq", async (ctx) => {
  try {
    await ctx.replyWithHTML(`${text.faqText}`, {
      reply_markup: {
        inline_keyboard: [[{ text: "⬅️ Back", callback_data: "back" }]],
      },
    });
  } catch (e) {
    console.error("error faq command");
  }
});

composer.action("back", async (ctx) => {
  try {
    await ctx.replyWithPhoto(
      {
        url: "https://sun9-55.userapi.com/impg/6i-1wrWR4FrUl7nV_CRCwSygCPX_ZZocB9mD8A/VYKLCmNJ8i8.jpg?size=995x506&quality=96&sign=a763d42fccb7ab25d1d317105a3255f4&type=album",
      },
      {
        caption: `Welcome to Aleo Quests, ${ctx.from.first_name}. ${text.startText}`,
        reply_markup: {
          inline_keyboard: [
            [{ text: "🧩Go to Quests", callback_data: "quests" }],
            [{ text: "🏆Leaderboard", callback_data: "leaderboard" }],
            [{ text: "💰Rewards", callback_data: "rewards" }],
            [{ text: "📕FAQ", callback_data: "faq" }],
          ],
        },
      }
    );
  } catch (e) {
    console.error("error start command");
  }
});

composer.action("leaderboard", async (ctx) => {
  try {
    await ctx.replyWithHTML(`${text.select_leaderboard}`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "🧩Quest 1", callback_data: "quest_1" }],
          [{ text: "🌍Quest 2", callback_data: "quest_2" }],
          [{ text: "😎Quest 3", callback_data: "quest_3" }],
          [{ text: "❗️Quest 4", callback_data: "quest_4" }],
          [{ text: "🕶Quest 5", callback_data: "quest_5" }],
          [{ text: "🚩Quest 6", callback_data: "quest_6" }],
          [{ text: "⬅️ Back", callback_data: "back" }],
        ],
      },
    });
  } catch (error) {
    console.error("error leaderboard command");
  }
});

composer.action("quest_1", async (ctx) => {
  try {
    const questNumber = 1;
    const users = await axios.get(
      `http://localhost:5000/api/quest?${
        questNumber && `questNumber=${questNumber}`
      }&${limit && `limit=${limit}`}`
    );
    if (users.data.length === 0) {
      await ctx.replyWithHTML(`${text.errorPassed}`, {
        reply_markup: {
          inline_keyboard: [
            [{ text: "⬅️ Back", callback_data: "leaderboard" }],
          ],
        },
      });
    } else {
      await ctx.replyWithHTML(
        `${text.leaderboard}\n<b>🧩Quest ${questNumber}:</b>\n\n${users.data
          .map(
            (user, index) =>
              `${icons[index]} ${user.discord} - ${points[index]};\n`
          )
          .join("")}`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "⬅️ Back", callback_data: "leaderboard" }],
            ],
          },
        }
      );
    }
  } catch (error) {
    console.error(`error quest ${questNumber} command`);
  }
});

composer.action("quest_2", async (ctx) => {
  try {
    const questNumber = 2;
    const users = await axios.get(
      `http://localhost:5000/api/quest?${
        questNumber && `questNumber=${questNumber}`
      }&${limit && `limit=${limit}`}`
    );
    if (users.data.length === 0) {
      await ctx.replyWithHTML(`${text.errorPassed}`, {
        reply_markup: {
          inline_keyboard: [
            [{ text: "⬅️ Back", callback_data: "leaderboard" }],
          ],
        },
      });
    } else {
      await ctx.replyWithHTML(
        `${text.leaderboard}\n<b>🧩Quest ${questNumber}:</b>\n\n${users.data
          .map(
            (user, index) =>
              `${icons[index]} ${user.discord} - ${points[index]};\n`
          )
          .join("")}`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "⬅️ Back", callback_data: "leaderboard" }],
            ],
          },
        }
      );
    }
  } catch (error) {
    console.error(`error quest ${questNumber} command`);
  }
});

composer.action("quest_3", async (ctx) => {
  try {
    const questNumber = 3;
    const users = await axios.get(
      `http://localhost:5000/api/quest?${
        questNumber && `questNumber=${questNumber}`
      }&${limit && `limit=${limit}`}`
    );
    if (users.data.length === 0) {
      await ctx.replyWithHTML(`${text.errorPassed}`, {
        reply_markup: {
          inline_keyboard: [
            [{ text: "⬅️ Back", callback_data: "leaderboard" }],
          ],
        },
      });
    } else {
      await ctx.replyWithHTML(
        `${text.leaderboard}\n<b>🧩Quest ${questNumber}:</b>\n\n${users.data
          .map(
            (user, index) =>
              `${icons[index]} ${user.discord} - ${points[index]};\n`
          )
          .join("")}`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "⬅️ Back", callback_data: "leaderboard" }],
            ],
          },
        }
      );
    }
  } catch (error) {
    console.error(`error quest ${questNumber} command`);
  }
});

composer.action("quest_4", async (ctx) => {
  try {
    const questNumber = 4;
    const users = await axios.get(
      `http://localhost:5000/api/quest?${
        questNumber && `questNumber=${questNumber}`
      }&${limit && `limit=${limit}`}`
    );
    console.log(users);
    if (users.data.length === 0) {
      await ctx.replyWithHTML(`${text.errorPassed}`, {
        reply_markup: {
          inline_keyboard: [
            [{ text: "⬅️ Back", callback_data: "leaderboard" }],
          ],
        },
      });
    } else {
      await ctx.replyWithHTML(
        `${text.leaderboard}\n<b>🧩Quest ${questNumber}:</b>\n\n${users.data
          .map(
            (user, index) =>
              `${icons[index]} ${user.discord} - ${points[index]};\n`
          )
          .join("")}`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "⬅️ Back", callback_data: "leaderboard" }],
            ],
          },
        }
      );
    }
  } catch (error) {
    console.error(`error quest ${questNumber} command`);
  }
});

composer.action("quest_5", async (ctx) => {
  try {
    const questNumber = 5;
    const users = await axios.get(
      `http://localhost:5000/api/quest?${
        questNumber && `questNumber=${questNumber}`
      }&${limit && `limit=${limit}`}`
    );
    if (users.data.length === 0) {
      await ctx.replyWithHTML(`${text.errorPassed}`, {
        reply_markup: {
          inline_keyboard: [
            [{ text: "⬅️ Back", callback_data: "leaderboard" }],
          ],
        },
      });
    } else {
      await ctx.replyWithHTML(
        `${text.leaderboard}\n<b>🧩Quest ${questNumber}:</b>\n\n${users.data
          .map(
            (user, index) =>
              `${icons[index]} ${user.discord} - ${points[index]};\n`
          )
          .join("")}`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "⬅️ Back", callback_data: "leaderboard" }],
            ],
          },
        }
      );
    }
  } catch (error) {
    console.error(`error quest ${questNumber} command`);
  }
});

composer.action(`quest_6`, async (ctx) => {
  try {
    const questNumber = 6;
    const users = await axios.get(
      `http://localhost:5000/api/quest?${
        questNumber && `questNumber=${questNumber}`
      }&${limit && `limit=${limit}`}`
    );
    if (users.data.length === 0) {
      await ctx.replyWithHTML(`${text.errorPassed}`, {
        reply_markup: {
          inline_keyboard: [
            [{ text: "⬅️ Back", callback_data: "leaderboard" }],
          ],
        },
      });
    } else {
      await ctx.replyWithHTML(
        `${text.leaderboard}\n<b>🧩Quest ${questNumber}:</b>\n\n${users.data
          .map(
            (user, index) =>
              `${icons[index]} ${user.discord} - ${points[index]};\n`
          )
          .join("")}`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "⬅️ Back", callback_data: "leaderboard" }],
            ],
          },
        }
      );
    }
  } catch (error) {
    console.error(`error quest ${questNumber} command`);
  }
});

composer.action("rewards", async (ctx) => {
  await ctx.replyWithHTML(`${text.rewards}`, {
    reply_markup: {
      inline_keyboard: [[{ text: "⬅️ Back", callback_data: "back" }]],
    },
  });
});

const stage = new Stage([
  require("../scenes/quest1.scene"),
  require("../scenes/quest2.scene"),
  require("../scenes/quest3.scene"),
  require("../scenes/quest4.scene"),
  require("../scenes/quest5.scene"),
  require("../scenes/quest6.scene"),
]);
composer.use(session());
composer.use(stage.middleware());

composer.action("quests", async (ctx) => {
  await ctx.replyWithHTML(`${text.aboutQuests}`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🧩Quest 1", callback_data: "quest1" }],
        [{ text: "🌍Quest 2", callback_data: "quest2" }],
        [{ text: "😎Quest 3", callback_data: "quest3" }],
        [{ text: "❗️Quest 4", callback_data: "quest4" }],
        [{ text: "🕶Quest 5", callback_data: "quest5" }],
        [{ text: "🚩Quest 6", callback_data: "quest6" }],
        [{ text: "⬅️ Back", callback_data: "back" }],
      ],
    },
  });
});

composer.action("quest1", async (ctx) => {
  try {
    const chatId = ctx.chat.id;
    const questNumber = 1;

    const userQuest1 = await axios.get(
      `http://localhost:5000/api/quest/telegram?${
        questNumber && `questNumber=${questNumber}`
      }&${chatId && `chatId=${chatId}`}`
    );

    if (!userQuest1.data) {
      activeQuest !== questNumber
        ? await ctx.replyWithHTML(`${text.notPassed}`)
        : (await ctx.scene.enter("quest1")) && increment();
    } else {
      const users = await axios.get(
        `http://localhost:5000/api/quest?${
          questNumber && `questNumber=${questNumber}`
        }&${limit && `limit=${limit}`}`
      );
      await ctx.replyWithHTML(
        `<b>${
          userQuest1.data.discord
        }</b>, you have already participated in the <b>Quest ${questNumber}</b>.\n\n<b>Leaderboard for Quest ${questNumber}:</b>\n\n${users.data
          .map(
            (user, index) =>
              `${icons[index]} ${user.discord} - ${points[index]};\n`
          )
          .join("")}`,
        {
          reply_markup: {
            inline_keyboard: [[{ text: "⬅️ Back", callback_data: "quests" }]],
          },
        }
      );
    }
  } catch (error) {
    console.error("error quest1 command");
  }
});

composer.action("quest2", async (ctx) => {
  try {
    const chatId = ctx.chat.id;
    const questNumber = 2;

    const userQuest2 = await axios.get(
      `http://localhost:5000/api/quest/telegram?${
        questNumber && `questNumber=${questNumber}`
      }&${chatId && `chatId=${chatId}`}`
    );

    if (!userQuest2.data) {
      activeQuest !== questNumber
        ? await ctx.replyWithHTML(`${text.notPassed}`)
        : (await ctx.scene.enter("quest2")) && increment();
    } else {
      const users = await axios.get(
        `http://localhost:5000/api/quest?${
          questNumber && `questNumber=${questNumber}`
        }&${limit && `limit=${limit}`}`
      );
      await ctx.replyWithHTML(
        `<b>${
          userQuest2.data.discord
        }</b>, you have already participated in the <b>Quest ${questNumber}</b>.\n\n<b>Leaderboard for Quest ${questNumber}:</b>\n\n${users.data
          .map(
            (user, index) =>
              `${icons[index]} ${user.discord} - ${points[index]};\n`
          )
          .join("")}`,
        {
          reply_markup: {
            inline_keyboard: [[{ text: "⬅️ Back", callback_data: "quests" }]],
          },
        }
      );
    }
  } catch (error) {
    console.error("error quest2 command");
  }
});

composer.action("quest3", async (ctx) => {
  try {
    const chatId = ctx.chat.id;
    const questNumber = 3;

    const userQuest3 = await axios.get(
      `http://localhost:5000/api/quest/telegram?${
        questNumber && `questNumber=${questNumber}`
      }&${chatId && `chatId=${chatId}`}`
    );

    if (!userQuest3.data) {
      activeQuest !== questNumber
        ? await ctx.replyWithHTML(`${text.notPassed}`)
        : (await ctx.scene.enter("quest3")) && increment();
    } else {
      const users = await axios.get(
        `http://localhost:5000/api/quest?${
          questNumber && `questNumber=${questNumber}`
        }&${limit && `limit=${limit}`}`
      );
      await ctx.replyWithHTML(
        `<b>${
          userQuest3.data.discord
        }</b>, you have already participated in the <b>Quest ${questNumber}</b>.\n\n<b>Leaderboard for Quest ${questNumber}:</b>\n\n${users.data
          .map(
            (user, index) =>
              `${icons[index]} ${user.discord} - ${points[index]};\n`
          )
          .join("")}`,
        {
          reply_markup: {
            inline_keyboard: [[{ text: "⬅️ Back", callback_data: "quests" }]],
          },
        }
      );
    }
  } catch (error) {
    console.error("error quest3 command");
  }
});

composer.action("quest4", async (ctx) => {
  try {
    const chatId = ctx.chat.id;
    const questNumber = 4;

    const userQuest4 = await axios.get(
      `http://localhost:5000/api/quest/telegram?${
        questNumber && `questNumber=${questNumber}`
      }&${chatId && `chatId=${chatId}`}`
    );

    if (!userQuest4.data) {
      activeQuest !== questNumber
        ? await ctx.replyWithHTML(`${text.notPassed}`)
        : (await ctx.scene.enter("quest4")) && increment();
    } else {
      const users = await axios.get(
        `http://localhost:5000/api/quest?${
          questNumber && `questNumber=${questNumber}`
        }&${limit && `limit=${limit}`}`
      );
      await ctx.replyWithHTML(
        `<b>${
          userQuest4.data.discord
        }</b>, you have already participated in the <b>Quest ${questNumber}</b>.\n\n<b>Leaderboard for Quest ${questNumber}:</b>\n\n${users.data
          .map(
            (user, index) =>
              `${icons[index]} ${user.discord} - ${points[index]};\n`
          )
          .join("")}`,
        {
          reply_markup: {
            inline_keyboard: [[{ text: "⬅️ Back", callback_data: "quests" }]],
          },
        }
      );
    }
  } catch (error) {
    console.error("error quest4 command");
  }
});

composer.action("quest5", async (ctx) => {
  try {
    const chatId = ctx.chat.id;
    const questNumber = 5;

    const userQuest5 = await axios.get(
      `http://localhost:5000/api/quest/telegram?${
        questNumber && `questNumber=${questNumber}`
      }&${chatId && `chatId=${chatId}`}`
    );

    if (!userQuest5.data) {
      activeQuest !== questNumber
        ? await ctx.replyWithHTML(`${text.notPassed}`)
        : (await ctx.scene.enter("quest5")) && increment();
    } else {
      const users = await axios.get(
        `http://localhost:5000/api/quest?${
          questNumber && `questNumber=${questNumber}`
        }&${limit && `limit=${limit}`}`
      );
      await ctx.replyWithHTML(
        `<b>${
          userQuest5.data.discord
        }</b>, you have already participated in the <b>Quest ${questNumber}</b>.\n\n<b>Leaderboard for Quest ${questNumber}:</b>\n\n${users.data
          .map(
            (user, index) =>
              `${icons[index]} ${user.discord} - ${points[index]};\n`
          )
          .join("")}`,
        {
          reply_markup: {
            inline_keyboard: [[{ text: "⬅️ Back", callback_data: "quests" }]],
          },
        }
      );
    }
  } catch (error) {
    console.error("error quest5 command");
  }
});

composer.action("quest6", async (ctx) => {
  try {
    const chatId = ctx.chat.id;
    const questNumber = 6;

    const userQuest6 = await axios.get(
      `http://localhost:5000/api/quest/telegram?${
        questNumber && `questNumber=${questNumber}`
      }&${chatId && `chatId=${chatId}`}`
    );

    if (!userQuest6.data) {
      activeQuest !== questNumber
        ? await ctx.replyWithHTML(`${text.notPassed}`)
        : (await ctx.scene.enter("quest6")) && increment();
    } else {
      const users = await axios.get(
        `http://localhost:5000/api/quest?${
          questNumber && `questNumber=${questNumber}`
        }&${limit && `limit=${limit}`}`
      );
      await ctx.replyWithHTML(
        `<b>${
          userQuest6.data.discord
        }</b>, you have already participated in the <b>Quest ${questNumber}</b>.\n\n<b>Leaderboard for Quest ${questNumber}:</b>\n\n${users.data
          .map(
            (user, index) =>
              `${icons[index]} ${user.discord} - ${points[index]};\n`
          )
          .join("")}`,
        {
          reply_markup: {
            inline_keyboard: [[{ text: "⬅️ Back", callback_data: "quests" }]],
          },
        }
      );
    }
  } catch (error) {
    console.error("error quest6 command");
  }
});

module.exports = composer;
