'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.dropTable('property_images');
	},
};

