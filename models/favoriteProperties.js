const Sequelize = require('sequelize');
const sequelize = require('../database/connection');
const properties = require('../models/properties');

const favoriteProperties = sequelize.define('favorite_properties', {
	id: {
		type: Sequelize.BIGINT,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	userId: {
		type: Sequelize.BIGINT,
		allowNull: false,
		foreignKey: true,
	},
	propertyId: {
		type: Sequelize.BIGINT,
		allowNull: false,
		foreignKey: true,
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

favoriteProperties.belongsTo(properties, {
	foreignKey: 'propertyId',
});

module.exports = favoriteProperties;
