
'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable('properties', {
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			property_id: {
				type: Sequelize.STRING(100),
				allowNull: true,
				unique: true,
			},
			listing_id: {
				type: Sequelize.STRING(100),
				allowNull: true,
			},
			products: {
				type: Sequelize.JSON,
				allowNull: true,
			},
			rdc_web_url: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			prop_type: {
				type: Sequelize.STRING(50),
				allowNull: true,
			},
			prop_sub_type: {
				type: Sequelize.STRING(50),
				allowNull: true,
			},
			address: {
				type: Sequelize.JSON,
				allowNull: true,
			},
			latitude: {
				type: Sequelize.DECIMAL(16, 6),
				allowNull: true,
			},
			longitude: {
				type: Sequelize.DECIMAL(16, 6),
				allowNull: true,
			},
			lat_request: {
				type: Sequelize.DECIMAL(16, 6),
				allowNull: true,

			},
			long_request: {
				type: Sequelize.DECIMAL(16, 6),
				allowNull: true,

			},
			branding: {
				type: Sequelize.JSON,
				allowNull: true,
			},
			prop_status: {
				type: Sequelize.STRING(50),
				allowNull: true,
			},
			price: {
				type: Sequelize.STRING(50),
				allowNull: true,
			},
			baths_half: {
				type: Sequelize.TINYINT(1),
				allowNull: true,
			},
			baths_full: {
				type: Sequelize.TINYINT(1),
				allowNull: true,
			},
			baths: {
				type: Sequelize.TINYINT(1),
				allowNull: true,
			},
			beds: {
				type: Sequelize.TINYINT(1),
				allowNull: true,
			},
			agents: {
				type: Sequelize.JSON,
				allowNull: true,
			},
			office: {
				type: Sequelize.JSON,
				allowNull: true,
			},
			last_update: {
				type: Sequelize.STRING(50),
				allowNull: true,
			},
			client_display_flags: {
				type: Sequelize.JSON,
				allowNull: true,
			},
			lead_forms: {
				type: Sequelize.JSON,
				allowNull: true,
			},
			photo_count: {
				type: Sequelize.TINYINT(0),
				allowNull: true,
			},
			page_no: {
				type: Sequelize.TINYINT(0),
				allowNull: true,
			},
			rank: {
				type: Sequelize.TINYINT(0),
				allowNull: true,
			},
			list_tracking: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			mls: {
				type: Sequelize.JSON,
				allowNull: true,
			},
			data_source_name: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			thumbnail: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			isFavourite: {
				type: Sequelize.TINYINT(1),
				allowNull: true,
			},
			propertyOverview: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			agent: {
				type: Sequelize.JSON,
				allowNull: true,
			},
			broker: {
				type: Sequelize.JSON,
				allowNull: true,
			},
			photos: {
				type: Sequelize.JSON,
				allowNull: true,
			},
			transactionType: {
				type: Sequelize.STRING(50),
				allowNull: true,
			},
			transactionAmount: {
				type: Sequelize.STRING(255),
				allowNull: true,
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
		});
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('properties');
	},
};
