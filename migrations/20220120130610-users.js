'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable('users', {

			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			fullName: {
				type: Sequelize.STRING(25),
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING(80),
				unique: true,
			},
			password: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			phoneNumber: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			profileImage: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			role: {
				type: Sequelize.ENUM,
				values: ['user', 'admin'],
				defaultValue: 'user',
			},
			fcmToken: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			accessToken: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			refreshToken: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			status: {
				type: Sequelize.TINYINT(1),
				allowNull: false,
				defaultValue: 0,
			},
			isDeleted: {
				type: Sequelize.TINYINT(1),
				allowNull: false,
				defaultValue: 0,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
		});
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('users');
	},
};
