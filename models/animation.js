const Sequelize = require('sequelize');
const sequelize = require('../database/connection');
const properties = require('../models/properties');

const animation_store = sequelize.define('animation_stores', {
	id: {
		type: Sequelize.BIGINT,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	userId: {
		type: Sequelize.STRING,
		allowNull: true,
		
	},
	resultAnimation: {
		type: Sequelize.STRING,
		allowNull: true,
		
	},
	croppedArray: {
		type: Sequelize.TEXT('long'),
		allowNull: true,
		
	},
	isDeleted: {
        type: Sequelize.ENUM("0", "1"),
        allowNull: false,
		defaultValue: "0"
	},
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE
});


module.exports = animation_store;
