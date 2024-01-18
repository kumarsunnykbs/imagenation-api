const Sequelize = require('sequelize');
const sequelize = require('../database/connection');
const userPropertyList = require('./userPropertyList');

const listingCategories = sequelize.define('listing_categories', {
	id: {
		type: Sequelize.BIGINT,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,

	},
	listName: {
		type: Sequelize.STRING(255),
		allowNull: false,
	},
	userId: {
		type: Sequelize.BIGINT,
		allowNull: false,
		foreignKey: true,
	},
	status: {
		type: Sequelize.BOOLEAN(0, 1),
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

listingCategories.hasMany(userPropertyList, {
	foreignKey: 'listId',
});

module.exports = listingCategories;
