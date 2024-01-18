'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return Promise.all([
			queryInterface.addColumn(
				'properties', // table name
				'sqft', // new field name
				{
					type: Sequelize.BIGINT,
					defaultValue: 0,
				},
			),
			queryInterface.addColumn(
				'properties', // table name
				'lot_size', // new field name
				{
					type: Sequelize.BIGINT,
					defaultValue: 0,
				},
			),
		]);
	},
	async down(queryInterface, Sequelize) {
		//
	},
};
