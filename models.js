const sequelize = require('./db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('users', {
	id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
	chatId: { type: DataTypes.STRING, unique: true },
	discord: { type: DataTypes.STRING, unique: true },
})

module.exports = User;