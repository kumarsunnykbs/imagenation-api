const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const userOtp = sequelize.define('user_otps', {
	id: {
		type: Sequelize.BIGINT,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	userId: {
		type: Sequelize.BIGINT,
		allowNull: false,
	},
	otp: {
		type: Sequelize.INTEGER(50),
		allowNull: false,
	},
	otpTime: {
		type: Sequelize.STRING(255),
		allowNull: true,
	},
	status: {
		type: Sequelize.TINYINT(1),
		allowNull: false,
		defaultValue: 1,
	},
	isDeleted: {
		type: Sequelize.TINYINT(1),
		allowNull: false,
		defaultValue: 0,
	},
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,
});

module.exports = userOtp;
