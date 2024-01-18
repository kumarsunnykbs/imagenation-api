module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.createTable('histories', {
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
				type: Sequelize.BOOLEAN(0, 1),
				defaultValue: 1,
			},
			isDeleted: {
				type: Sequelize.BOOLEAN(0, 1),
				defaultValue: 0,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
		}).then(() => queryInterface.addConstraint('histories', {
			fields: ['userId'],
			type: 'foreign key',
			name: 'fkname1', // optional
			references: {
				table: 'users',
				field: 'id',
			},
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})).then(() => queryInterface.addConstraint('histories', {
			fields: ['propertyId'],
			type: 'foreign key',
			name: 'fkname2', // optional
			references: {
				table: 'properties',
				field: 'id',
			},
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}));
	},


	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('histories');
	},
};
