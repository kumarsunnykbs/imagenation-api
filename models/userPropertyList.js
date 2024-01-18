const Sequelize = require('sequelize');
const sequelize = require('../database/connection');
const properties = require('../models/properties');

const userPropertyList = sequelize.define('user_property_lists', {
	id: {
		type: Sequelize.BIGINT,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,

	},
	listId: {
		type: Sequelize.STRING(255),
		allowNull: false,
		foreignKey: true,
	},
	propertyId: {
		type: Sequelize.BIGINT,
		allowNull: false,
		foreignKey: true,
	},
	isDeleted: {
		type: Sequelize.BOOLEAN(0, 1),
		defaultValue: 0,
	},
	isDeleted: {
		type: Sequelize.TINYINT(1),
		allowNull: false,
		defaultValue: 0,
	},
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,
});

userPropertyList.belongsTo(properties, {
	foreignKey: 'propertyId',
});

module.exports = userPropertyList;
