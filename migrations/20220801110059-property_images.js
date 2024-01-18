'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.createTable('property_images', {
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,

			},
			images: {
				type: Sequelize.STRING(255),
				allowNull: false,
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
		}).then(() => queryInterface.addConstraint('property_images', {
			fields: ['propertyId'],
			type: 'foreign key',
			name: 'propertyid_fkey_constraint_name', // optional
			references: {
				table: 'properties',
				field: 'id',
			},
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}));
	},


	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('property_images');
	},
};
