const WizardScene = require('telegraf/scenes/wizard')
const text = require('../constants/text')
const UserModel = require('../models')

const regex = /^.{3,32}#[0-9]{4}$/

module.exports = new WizardScene(
	'quest',
	async (ctx) => {
		try {
			await ctx.replyWithHTML(`${text.discord}`)
			return ctx.wizard.next()
		} catch {
			console.error('Error of the start command')
		}
	},
	async (ctx) => {
		try {
			const chatId = ctx.message.chat.id
			const user = await UserModel.findOne({ where: { chatId: String(chatId) } })
			if (user) {
				await ctx.replyWithHTML(`🏆<b>${user.discord}</b>, you have already participated in the quest and took the <b>${user.id}th position</b>. ${text.warning}`, {
					reply_markup: {
						inline_keyboard: [
							[{ text: '🧩Menu', callback_data: 'back' }],
						]
					}
				})
				await ctx.scene.leave()
			} else {
				const discord = ctx.message.text
				ctx.session.discord = discord
				const index = ctx.wizard.cursor
				if (regex.test(discord) === true) {
					await ctx.replyWithHTML(`${text.successDiscord}`)
					await ctx.replyWithPhoto({ url: 'https://sun9-29.userapi.com/impg/xEsITsOVV_4QbcF-Qs9u30ei-I72J1yWRH9aYw/5cx5xsIaA1Q.jpg?size=1920x1080&quality=96&sign=44894bacd46064def956e9c63d356201&type=album' }, {
						caption: `${text.key}`,
					})
					return ctx.wizard.next()
				} else {
					await ctx.replyWithHTML(`${text.error}`)
					await ctx.wizard.selectStep(index)
				}
			}
		} catch {
			await ctx.scene.leave()
			console.error('Error of the discord command')
		}
	},
	async (ctx) => {
		try {
			const answer2 = ctx.message.text
			const index = ctx.wizard.cursor
			const chatId = ctx.message.chat.id
			const discord = ctx.session.discord
			if (answer2.trim().toLowerCase() === 'ceremony') {
				await UserModel.create({ chatId: String(chatId), discord: discord })
				const user = await UserModel.findOne({ where: { chatId: String(chatId) } })
				await ctx.replyWithHTML(`🥳Congratulations, warrior! <b>${user.discord}</b>, you took a <b>${user.id}th position</b>! ${text.warning}`, {
					reply_markup: {
						inline_keyboard: [
							[{ text: '🧩Menu', callback_data: 'back' }],
						]
					}
				})
				await ctx.scene.leave()
			} else {
				await ctx.replyWithHTML(`${text.error}`)
				await ctx.wizard.selectStep(index)
			}
		} catch (error) {
			console.error('Error of the result command')
		}
	}
)