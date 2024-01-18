'use strict';

'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.createTable('notifications', {
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
			title: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			imageUrl: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			message: {
				type: Sequelize.STRING(255),
				allowNull: false,
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
		}).then(() => queryInterface.addConstraint('notifications', {
			fields: ['userId'],
			type: 'foreign key',
			name: 'userid_fkey_constraint_name3', // optional
			references: {
				table: 'users',
				field: 'id',
			},
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})).then(() => queryInterface.addConstraint('notifications', {
			fields: ['propertyId'],
			type: 'foreign key',
			name: 'propertyId_fkey_constraint_name3', // optional
			references: {
				table: 'properties',
				field: 'id',
			},
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}));
	},


	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('notifications');
	},
};

