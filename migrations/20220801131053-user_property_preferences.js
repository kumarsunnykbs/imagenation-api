'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable('user_property_preferences', {
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
			priceMin: {
				type: Sequelize.INTEGER(60),
				allowNull: false,
			},
			priceMax: {
				type: Sequelize.INTEGER(60),
				allowNull: false,
			},
			storyMin: {
				type: Sequelize.INTEGER(60),
				allowNull: false,
			},
			storyMax: {
				type: Sequelize.INTEGER(60),
				allowNull: false,
			},
			latitude: {
				type: Sequelize.DECIMAL(16, 6),
				allowNull: true,
			},
			longitude: {
				type: Sequelize.DECIMAL(16, 6),
				allowNull: true,
			},
			bathroom: {
				type: Sequelize.INTEGER(60),
				allowNull: false,
			},
			bedroom: {
				type: Sequelize.INTEGER(60),
				allowNull: false,
			},
			propertyType: {
				type: Sequelize.ENUM,
				values: ['Apartment', 'House', 'TownHouse', 'Others'],
				defaultValue: 'Others',
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
		}).then(() => queryInterface.addConstraint('user_property_preferences', {
			fields: ['userId'],
			type: 'foreign key',
			// name: 'userproperty_fkey_constraint_name3', // optional
			references: {
				table: 'users',
				field: 'id',
			},
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}));
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('user_property_preferences');
	},
};
