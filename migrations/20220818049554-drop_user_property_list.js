'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.dropTable('user_property_list');
	},
};

