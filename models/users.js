const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const users = sequelize.define('users', {
	id: {
		type: Sequelize.BIGINT,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	fullName: {
		type: Sequelize.STRING(25),
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING(80),
		unique: true,
	},
	password: {
		type: Sequelize.STRING(255),
		allowNull: true,
	},
	age: {
		type: Sequelize.INTEGER(10),
		allowNull: false,
	},
	phoneNumber: {
		type: Sequelize.STRING(255),
		allowNull: true,
	},
	profileImage: {
		type: Sequelize.STRING(255),
		allowNull: true,
	},
	provider: {
		type: Sequelize.STRING(255),
		allowNull: true,
	},
	providerId: {
		type: Sequelize.STRING(255),
		allowNull: true,
	},
	role: {
		type: Sequelize.STRING(255),
		allowNull: true,
	},
	fcmToken: {
		type: Sequelize.STRING(255),
		allowNull: true,
	},
	accessToken: {
		type: Sequelize.STRING(255),
		allowNull: true,
	},
	refreshToken: {
		type: Sequelize.STRING(255),
		allowNull: true,
	},
	activation_code: {
		type: Sequelize.STRING(100),
		allowNull: true,
	},
	status: {
		type: Sequelize.TINYINT(1),
		allowNull: false,
		defaultValue: 0,
	},
	code: {
		type: Sequelize.STRING(255),
		allowNull: true,
	},
	isDeleted: {
		type: Sequelize.TINYINT(1),
		allowNull: false,
		defaultValue: 0,
	},
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,
});

module.exports = users;
