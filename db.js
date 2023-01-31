const { Sequelize } = require('sequelize')
require('dotenv').config();

module.exports = new Sequelize({
	database: process.env.POSTGRES_DATABASE,
	username: process.env.POSTGRES_USERNAME,
	password: process.env.POSTGRES_PASSWORD,
	host: process.env.POSTGRES_HOST,
	port: process.env.POSTGRES_PORT,
	dialect: "postgres",
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false
		}
	},
});