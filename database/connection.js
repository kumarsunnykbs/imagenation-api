const {Sequelize} = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB_NAME, dbConfig.DB_USER, dbConfig.DB_PASSWORD, {
	host: dbConfig.DB_HOST,
	dialect: dbConfig.DB_DIALECT,
	operatorsAliases: 0,
});

sequelize.authenticate().then(() => {
	console.log('Connection has been established successfully to database - ' + dbConfig.DB_NAME);
}).catch((err) => {
	console.error('Unable to connect to the database - ' + dbConfig.DB_NAME + ': ', err);
});

module.exports = sequelize;
global.sequelize = sequelize;
