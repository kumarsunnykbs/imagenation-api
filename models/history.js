const Sequelize = require('sequelize');
const sequelize = require('../database/connection');
const properties = require('./properties');

const history = sequelize.define('histories', {
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
		type: Sequelize.BOOLEAN(0, 1),
		defaultValue: 1,
	},
	isDeleted: {
		type: Sequelize.BOOLEAN(0, 1),
		defaultValue: 0,
	},
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,
});

history.belongsTo(properties, {
	foreignKey: 'propertyId',
});

module.exports = history;
