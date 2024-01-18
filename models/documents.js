const Sequelize = require("sequelize");
const sequelize = require("../database/connection");
const properties = require("../models/properties");

const documents = sequelize.define("documents", {
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  image_url: {
    type: Sequelize.BIGINT,
    allowNull: true,
  },
  secure_url: {
    type: Sequelize.BIGINT,
    allowNull: true,
  },
  userId: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  isMainImage: {
    type: Sequelize.ENUM("0", "1"),
    defaultValue: "0",
	allowNull: false
  },
  isDeleted: {
    type: Sequelize.ENUM("0", "1"),
    defaultValue: "0",
	allowNull: false
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

module.exports = documents;
