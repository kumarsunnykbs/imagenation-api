const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const favoriteProperties = sequelize.define('property_images', {
	id: {
		type: Sequelize.BIGINT,
		allowNull: false,

	},
	images: {
		type: Sequelize.STRING(255),
		allowNull: false,
	},
	propertyId: {
		type: Sequelize.BIGINT,
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
