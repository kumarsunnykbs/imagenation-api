const usersModel = require('../models/users');
const { Op } = require("sequelize");

/** function for check unique email in users table */
async function checkUniqueEmail(userdata, callback) {
	const result =  await usersModel.findOne({
		where: {
		email: userdata.email,
		  [Op.not]: [
			{ id: [userdata.id] }
		  ]
		}
	  });
	/** check if result or match found*/
	if (result) {
		/** send callback with false */
		return callback(false, false);
	} else {
		/** send callback with true */
		return callback(true, false);
	}
}

/** function for check unique phone number in users table */
async function checkUniquePhone(userdata, callback) {
	const result =  await usersModel.findOne({
		where: {
		phoneNumber: userdata.phoneNumber,
		  [Op.not]: [
			{ id: [userdata.id] }
		  ]
		}
	  });
	/** check if result or match found*/
	if (result) {
		/** send callback with false */
		return callback(false, false);
	} else {
		/** send callback with true */
		return callback(true, false);
	}
}

module.exports = {
	checkUniqueEmail, checkUniquePhone,
};
