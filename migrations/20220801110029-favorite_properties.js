module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.createTable('favorite_properties', {
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
		}).then(() => queryInterface.addConstraint('favorite_properties', {
			fields: ['userId'],
			type: 'foreign key',
			name: 'userid_fkey_constraint_name1', // optional
			references: {
				table: 'users',
				field: 'id',
			},
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})).then(() => queryInterface.addConstraint('favorite_properties', {
			fields: ['propertyId'],
			type: 'foreign key',
			name: 'propertyId_fkey_constraint_name1', // optional
			references: {
				table: 'properties',
				field: 'id',
			},
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}));
	},


	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('favorite_properties');
	},
};
