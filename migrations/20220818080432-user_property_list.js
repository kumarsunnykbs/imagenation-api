'use strict';


module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.createTable('user_property_lists', {
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,

			},
			listId: {
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
		}).then(() => queryInterface.addConstraint('user_property_lists', {
			fields: ['listId'],
			type: 'foreign key',
			name: 'foregin_key1', // optional
			references: {
				table: 'listing_categories',
				field: 'id',
			},
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})).then(() => queryInterface.addConstraint('user_property_lists', {
			fields: ['propertyId'],
			type: 'foreign key',
			name: 'foregin_key2', // optional
			references: {
				table: 'properties',
				field: 'id',
			},
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}));
	},


	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('user_property_lists');
	},
};

