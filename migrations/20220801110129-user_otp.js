'use strict';

'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.createTable('user_otps', {
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
			otp: {
				type: Sequelize.INTEGER(50),
				allowNull: false,
			},
			otpTime: {
				type: Sequelize.STRING(255),
				allowNull: true,
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
		}).then(() => queryInterface.addConstraint('user_otps', {
			fields: ['userId'],
			type: 'foreign key',
			name: 'userid_fkey_constraint_name', // optional
			references: {
				table: 'users',
				field: 'id',
			},
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}));
	},


	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('user_otps');
	},
};


