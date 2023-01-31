const { Composer, Stage, session } = require('telegraf')
const text = require('../constants/text')
const sequelize = require('../db')
const UserModel = require('../models')

const composer = new Composer()

composer.command('start', async (ctx) => {
	try {
		await sequelize.authenticate()
		await sequelize.sync()
		ctx.users.push(ctx.from.id)
		await ctx.replyWithPhoto({ url: 'https://sun9-55.userapi.com/impg/6i-1wrWR4FrUl7nV_CRCwSygCPX_ZZocB9mD8A/VYKLCmNJ8i8.jpg?size=995x506&quality=96&sign=a763d42fccb7ab25d1d317105a3255f4&type=album' },
			{
				caption: `🖐Welcome to Aleo Quests, ${ctx.from.first_name}. ${text.startText}`,
				reply_markup: {
					inline_keyboard: [
						[{ text: '🧩Go to Quests', callback_data: 'quests' }],
						[{ text: '🏆Leaderboard', callback_data: 'leaderboard' }],
						[{ text: '💰Rewards', callback_data: 'rewards' }],
						[{ text: '📕FAQ', callback_data: 'faq' }],
					]
				}
			})
	} catch (e) {
		console.error('error start command')
	}
})

composer.action('faq', async (ctx) => {
	try {
		await ctx.replyWithHTML(`${text.faqText}`, {
			reply_markup: {
				inline_keyboard: [
					[{ text: '⬅️ Back', callback_data: 'back' }],
				]
			}
		})
	} catch (e) {
		console.error('error faq command')
	}
})

composer.action('back', async (ctx) => {
	try {
		await ctx.replyWithPhoto({ url: 'https://sun9-55.userapi.com/impg/6i-1wrWR4FrUl7nV_CRCwSygCPX_ZZocB9mD8A/VYKLCmNJ8i8.jpg?size=995x506&quality=96&sign=a763d42fccb7ab25d1d317105a3255f4&type=album' },
			{
				caption: `Welcome to Aleo Quests, ${ctx.from.first_name}. ${text.startText}`,
				reply_markup: {
					inline_keyboard: [
						[{ text: '🧩Go to Quests', callback_data: 'quests' }],
						[{ text: '🏆Leaderboard', callback_data: 'leaderboard' }],
						[{ text: '💰Rewards', callback_data: 'rewards' }],
						[{ text: '📕FAQ', callback_data: 'faq' }],
					]
				}
			})
	} catch (e) {
		console.error('error start command')
	}
})

composer.action('leaderboard', async (ctx) => {
	try {
		const firstUser = await UserModel.findOne({ where: { id: 1 } })
		const secondUser = await UserModel.findOne({ where: { id: 2 } })
		const thirdUser = await UserModel.findOne({ where: { id: 3 } })
		const fourthUser = await UserModel.findOne({ where: { id: 4 } })
		const fivethUser = await UserModel.findOne({ where: { id: 5 } })
		if (firstUser && secondUser && thirdUser && fourthUser && fivethUser) {
			await ctx.replyWithHTML(`${text.leaderboard}\n🥇 ${firstUser.discord} - 10XP\n🥈 ${secondUser.discord} - 7XP\n🥉 ${thirdUser.discord} - 5XP\n🎖 ${fourthUser.discord} - 3XP\n🎖 ${fivethUser.discord} - 2XP\n\n⚡️6th - 1000th place - 1XP`, {
				reply_markup: {
					inline_keyboard: [
						[{ text: '⭐️My points', callback_data: 'points' }],
						[{ text: '⬅️ Back', callback_data: 'back' }],
					]
				}
			})
		} else {
			await ctx.replyWithHTML(`${text.warning}`, {
				reply_markup: {
					inline_keyboard: [
						[{ text: '⬅️ Back', callback_data: 'back' }],
					]
				}
			})
		}
	} catch (error) {
		console.error('error leaderboard command')
	}
})

composer.action('points', async (ctx) => {
	try {
		const chatId = ctx.chat.id
		const user = await UserModel.findOne({ where: { chatId: String(chatId) } })
		if (user) {
			switch (user.id) {
				case 1: await ctx.replyWithHTML(`<b>${user.discord}</b>, you number of points: <b>10XP</b>`)
					break;
				case 2: await ctx.replyWithHTML(`<b>${user.discord}</b>, you number of points: <b>7XP</b>`)
					break;
				case 3: await ctx.replyWithHTML(`<b>${user.discord}</b>, you number of points: <b>5XP</b>`)
					break;
				case 4: await ctx.replyWithHTML(`<b>${user.discord}</b>, you number of points: <b>3XP</b>`)
					break;
				case 5: await ctx.replyWithHTML(`<b>${user.discord}</b>, you number of points: <b>2XP</b>`)
					break;
				default: await ctx.replyWithHTML(`<b>${user.discord}</b>, you number of points: <b>1XP</b>`)
					break;
			}
		} else {
			await ctx.replyWithHTML(`${text.errorMessage}`, {
				reply_markup: {
					inline_keyboard: [
						[{ text: '⬅️ Back', callback_data: 'back' }],
					]
				}
			})
		}
	} catch (error) {
		console.error('error points command')
	}
})

composer.action('rewards', async (ctx) => {
	await ctx.replyWithHTML(`${text.rewards}`, {
		reply_markup: {
			inline_keyboard: [
				[{ text: '⬅️ Back', callback_data: 'back' }],
			]
		}
	})
})

const stage = new Stage([require('../scenes/quest.scene')])
composer.use(session())
composer.use(stage.middleware())

composer.action('quests', async (ctx) => {
	await ctx.replyWithHTML(`${text.aboutQuests}`, {
		reply_markup: {
			inline_keyboard: [
				[{ text: 'Quest 1 - Introducion', callback_data: 'quest1' }],
				[{ text: '⬅️ Back', callback_data: 'back' }],
			]
		}
	})
})

composer.action('quest1', async (ctx) => {
	try {
		await ctx.scene.enter('quest')
	} catch (error) {
		console.error('error quest1 command')
	}
})

module.exports = composer