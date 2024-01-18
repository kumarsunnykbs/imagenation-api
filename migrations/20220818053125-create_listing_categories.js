
'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.createTable('listing_categories', {
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
		}).then(() => queryInterface.addConstraint('listing_categories', {
			fields: ['userId'],
			type: 'foreign key',
			name: 'listing_category_user_id', // optional
			references: {
				table: 'users',
				field: 'id',
			},
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}));
	},
	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('listing_categories');
	},
};
