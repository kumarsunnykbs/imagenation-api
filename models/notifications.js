const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const favoriteProperties = sequelize.define('notifications', {
	id: {
		type: Sequelize.BIGINT,
		allowNull: false,
	},
	userId: {
		type: Sequelize.BIGINT,
		allowNull: false,

	},
	propertyId: {
		type: Sequelize.BIGINT,
		allowNull: false,
	},
	title: {
		type: Sequelize.STRING(255),
		allowNull: false,
	},
	imageUrl: {
		type: Sequelize.STRING(255),
		allowNull: false,
	},
	message: {
		type: Sequelize.STRING(255),
		allowNull: false,
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

module.exports = favoriteProperties;
