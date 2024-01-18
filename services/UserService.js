const usersModel = require('../models/users');
const userPreferencesModel = require('../models/userPropertyPreferences');
const listingCategories = require('../models/listing_categories');
const userPropertyList = require('../models/userPropertyList');
const properties = require('../models/properties');
const favoriteProperty = require('../models/favoriteProperties');
const history = require('../models/history');
const SHA256 = require('crypto-js/sha256');
const commonConfig = require('../config/common.config');
const checkUnique = require('../helpers/checkUnique');
const documents = require("../models/documents");
const animation_store = require("../models/animation");
const { QueryTypes } = require("sequelize");
const { Op } = require("sequelize");
const path = require('path');
const { promisify } = require('util');
const cloudinary = require('cloudinary').v2;
const uploader = promisify(cloudinary.uploader.upload);

cloudinary.config({
	cloud_name: "dxp1wldpg",
	api_key: "738589463131114",
	api_secret: "T63Ywp8xyAzEmYQU1C-2fuHzLXg",
});


class UserService {
	/** ***** User Service: Method to get user profile Info******/
	async getUserProfile(req, res, next) {
		try {
			const result = await usersModel.findOne({ attributes: { exclude: ['password', 'accessToken', 'refreshToken', 'status', 'isDeleted', 'createdAt', 'updatedAt'] }, where: { id: req.decoded.id }, raw: true });
			if (result) {
				return res.status(200).json({ status: true, message: 'User Profile', result: result });
			} else {
				return res.status(200).json({ status: false, message: 'User details not found' });
			}
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}
	async changePassword(req, res, next) {
		try {
			const payload = req.body;
			const result = await usersModel.findOne({ where: { id: payload.userId }, raw: true });
			if (result) {
				/** ** generate hashed password and compare with existing password ****/
				const cipherText = SHA256(req.body.currentPassword, commonConfig.PWD_SECRET).toString();
				if (cipherText === result.password) {
					/** ** generate hash for newPassword ****/
					const newPassword = SHA256(payload.newPassword, commonConfig.PWD_SECRET).toString();

					await usersModel.update({ password: newPassword }, { where: { id: payload.userId } });
					return res.status(200).json({ status: true, message: 'Password Changed' });
				} else {
					return res.status(404).json({ status: false, message: 'Incorrect Password' });
				}
			} else {
				return res.status(404).json({ status: false, message: 'Not found' });
			}
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}

	async editProfile(req, res, next) {
		try {
			/** req.body object */
			let payload = req.body;
			const userId = req.decoded.id;
			payload.id = userId;
			/** calls checkUniqueEmail function and send a callback */
			checkUnique.checkUniqueEmail(payload, async function (callbackres) {
				if (callbackres == false) {
					/** callback return false for match Email */
					return res.status(200).json({ status: false, message: 'Email Already Exist' });
				} else {
					/** calls checkUniquePhone function and send a callback */
					checkUnique.checkUniquePhone(payload, async function (callbackres) {
						if (callbackres == false) {
							/** callback return false for match Phone number */
							return res.status(200).json({ status: false, message: 'Phone number Already Exist' });
						} else {
							/**  object data for edit fields*/
							const dataToUpdate = {
								fullName: payload.fullName,
								email: payload.email,
								phoneNumber: payload.phoneNumber,
							};
							/** sequelize update  */
							await usersModel.update(dataToUpdate, { where: { id: userId } });
							return res.status(200).json({ status: true, message: 'Profile Updated' });
						}
					});
				}
			});
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}
	async getFilters(req, res, next) {
		try {
			const userId = req.decoded.id;
			const usersFilters = await userPreferencesModel.findOne({ where: { userId: userId }, raw: true });
			if (usersFilters) {
				/** ** obj response object ****/
				const respData = {
					userId: usersFilters.userId,
					propertyType: usersFilters.propertyType,
					latitude: usersFilters.latitude,
					longitude: usersFilters.longitude,
					lowPriceRange: usersFilters.priceMin,
					upperPriceRange: usersFilters.priceMax,
					bedRooms: usersFilters.bedroom,
					bathrooms: usersFilters.bathroom,
					storyMax: usersFilters.storyMax,
					storyMin: usersFilters.storyMin,
					pooles: 0,
				};
				return res.status(200).json({ status: true, message: 'Property filters', result: respData });
			} else {
				return res.status(404).json({ status: false, message: 'Filters Not found' });
			}
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}
	async updateUserFilters(req, res, next) {
		try {
			const userId = req.decoded.id;
			const payload = req.body;
			/** object for update data */
			const objToUpdate = {
				propertyType: payload.propertyType,
				latitude: payload.latitude,
				longitude: payload.longitude,
				priceMin: payload.lowPriceRange,
				priceMax: payload.upperPriceRange,
				bedroom: payload.bedRooms,
				bathroom: payload.bathrooms,
				storyMax: payload.storyMax,
				storyMin: payload.storyMin,
				pools: payload.pools,
			};
			await userPreferencesModel.update(objToUpdate, { where: { userId: userId } });
			return res.status(200).json({ status: true, message: 'User Property filters Updated' });
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}
	async createPropertylist(req, res, next) {
		try {
			const userId = req.decoded.id;
			const payload = req.body;
			/** object for create list data */
			const dataToCreate = {
				listName: payload.listName,
				userId: userId,
			};
			/** check for duplicate entry for list name */
			const duplicateList = await listingCategories.findOne({ where: { listName: payload.listName } });
			/** if duplicate entry found */
			if (duplicateList) {
				return res.status(200).json({ status: false, message: `List With ${payload.listName} name is already exist ` });
			} else {
				const result = await listingCategories.create(dataToCreate);
				if (result) {
					const result = await listingCategories.findAll({
						/** get listed data, properties count by reference mentioned in model */
						include: [
							{
								model: userPropertyList,
							}],
						where: { userId: userId },
						order: [
							['createdAt', 'DESC'],
						],
					});
					const dataArray = [];

					result.forEach((item) => {
						/**  response object */
						const obj = {
							'title': item.listName,
							'id': item.id,
							'noOfProperties': item.user_property_lists.length,
						};
						dataArray.push(obj);
					});
					return res.status(200).json({ status: true, message: 'Property List Created', result: dataArray });
				} else {
					return res.status(404).json({ status: false, message: 'Something wrong' });
				}
			}
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}
	async getPropertyList(req, res, next) {
		try {
			const userId = req.decoded.id;
			/** find all list of users with its no pf properties */
			const result = await listingCategories.findAll({
				/** get listed data, properties count by reference mentioned in model */
				include: [
					{
						model: userPropertyList,
					}],
				where: { userId: userId },
			});
			const dataArray = [];
			result.forEach((item) => {
				/**  response object */
				const obj = {
					'title': item.listName,
					'id': item.id,
					'noOfProperties': item.user_property_lists.length,
				};
				dataArray.push(obj);
			});
			return res.status(200).json({ status: true, message: 'Categories List', result: dataArray });
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}
	async addPropertyToList(req, res, next) {
		try {
			const payload = req.body;
			/** object for create list */
			const objToCreate = {
				'listId': payload.listId,
				'propertyId': payload.property_id,
			};
			await userPropertyList.create(objToCreate);
			return res.status(200).json({ status: true, message: 'success' });
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}
	async userPropertiesByListId(req, res, next) {
		try {
			const payload = req.query;

			/** find all properties by list id*/
			const result = await userPropertyList.findAll({
				/** get property data by reference mentioned in model */
				include: [
					{
						model: properties,
					}],
				where: { listId: payload.listId },
			});
			/* array for show properties of user which are added in */
			const dataArray = [];
			result.forEach((item) => {
				dataArray.push(item.property);
			});
			return res.status(200).json({ status: true, message: 'User Properties by List', result: dataArray });
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}
	async addFavoriteProperty(req, res, next) {
		try {
			const payload = req.body;
			/** object for create favorite property  data */
			const objToCreate = {
				userId: req.decoded.id,
				propertyId: payload.propertyId,
			};
			/** check for duplicat, if property already added to favorite */
			const duplicateFavoriteProperty = await favoriteProperty.findOne({ where: { propertyId: payload.propertyId } });
			/** if found duplicate */
			if (duplicateFavoriteProperty) {
				return res.status(200).json({ status: false, message: 'Property already added to favorite' });
			} else {
				await favoriteProperty.create(objToCreate);
				return res.status(200).json({ status: true, message: 'Favorite Property Created' });
			}
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}
	async userFavoriteProperties(req, res, next) {
		try {
			const userId = req.decoded.id;
			/** find all favorite properties */
			const result = await favoriteProperty.findAll({
				/** get property data by reference mentioned in model */
				include: [
					{
						model: properties,
					}],
				where: { userId: userId },
			});
			const dataArray = [];

			result.forEach((item) => {
				dataArray.push(item.property);
			});
			return res.status(200).json({ status: true, message: 'Favorite Properties List', result: dataArray });
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}
	async addHistory(req, res, next) {
		try {
			const payload = req.body;
			/** object for create favorite property  data */
			const objToCreate = {
				userId: req.decoded.id,
				propertyId: payload.propertyId,
			};

			await history.create(objToCreate);
			return res.status(200).json({ status: true, message: 'History Created' });
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}
	async getHistory(req, res, next) {
		try {
			const userId = req.decoded.id;
			/** find all favorite properties */
			const result = await history.findAll({
				/** get property data by reference mentioned in model */
				include: [
					{
						model: properties,
					}],
				where: { userId: userId },
			});
			const dataArray = [];

			result.forEach((item) => {
				dataArray.push(item.property);
			});
			return res.status(200).json({ status: true, message: 'history', result: dataArray });
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}
	async uploadPic(req, res, next) {
		try {
			const result = await uploadPicture(req);
			if (result.msg === "error") {
				return res
					.status(404)
					.json({
						status: false,
						message: "Please select an image.",
						result: [],
					});
			}

			if (result.url) {
				const dataToCreate = {
					image_url: result.url,
					secure_url: result.secure_url,
					userId: req.body.user_id,
					isMainImage: req.body.is_main_image
				};

				const result1 = await documents.create(dataToCreate);
				if (result1) {
					return res
						.status(200)
						.json({
							status: true,
							message: "Image URL inserted successfully",
							result: result1,
						});
				} else {
					return res.status(200).json({ status: false, message: "Error" });
				}
			} else {
				return res.status(500).json({ status: false, message: "Error" });
			}
		} catch (error) {
			console.log("errorerrorerrorerror", error);
			return res.status(500).json({ status: false, message: "Error" });
		}
	}
	async resetPassword(req, res, next) {
		try {
			const payload = req.body;
			if (!payload.new_password || !payload.code) {
				return res.status(404).json({ status: false, message: "Please fill required params" });
			} else {
				/** find user details with code */
				const result = await usersModel.findOne({
					where: { code: payload.code },
					raw: true,
				});
				if (result) {
					const cipherText = SHA256(
						payload.new_password,
						commonConfig.PWD_SECRET
					).toString();
					await usersModel.update(
						{ password: cipherText },
						{ where: { id: result.id } }
					);
					return res
						.status(200)
						.json({ status: true, message: "Password Changed" });

					/** ** generate hashed password ****/
				} else {
					return res.status(404).json({ status: false, message: "Invalid Code" });
				}
			}

		} catch (error) {
			return res.status(500).json({ status: false, message: "error" });
		}
	}



	async forgotPassword(req, res, next) {
		try {
			const payload = req.body;
			/** find user details with email */
			const result = await usersModel.findOne({
				where: { email: payload.email },
				raw: true,
			});
			if (result) {
				const forgotPasswordCode = generateForgotPasswordCode(5);

				const datatoupdate = {
					code: forgotPasswordCode,
				};
				const result1 = await usersModel.update(datatoupdate, {
					where: { id: result.id },
				});
				const newcode = {
					code: forgotPasswordCode,
				};

				if (result1) {
					const mailTemplate = await sequelize.query(
						"SELECT * FROM `gb_mail_templates` WHERE id=13 order by id asc",
						{ type: QueryTypes.SELECT }
					);

					//   console.log("========================", mailTemplate);

					if (mailTemplate.length > 0) {
						const dataToCreate = {
							fullName: result.fullName, // Assuming you have a fullName field in the user model
							email: payload.email,
							message: mailTemplate[0].template_body,
							subject: mailTemplate[0].template_subject,
							activation_code: forgotPasswordCode,
						};
						console.log('forgotPasswordCodeforgotPasswordCodeforgotPasswordCode', dataToCreate.activation_code);

						const sentmaill = await this.sentMail(dataToCreate);

						return res.status(200).json({ status: true, message: "Forgotten password code is sent to your mail." });
					} else {
						return res
							.status(404)
							.json({ status: false, message: "Mail template not found" });
					}
				} else {
					return res.status(200).json({ status: false, message: "Error!" });
				}
			} else {
				return res.status(404).json({ status: false, message: "Not found" });
			}
		} catch (error) {
			console.log("errorrrrrrrrrrrr", error);
			return res.status(500).json({ status: false, message: "error" });
		}
	}

	async sentMail(argument) {
		const sgMail = require("@sendgrid/mail");
		sgMail.setApiKey(
			"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"
		);
		console.log("arrrrrrrr", argument)

		if (argument.email) {
			var username = argument.fullName;
			var message = argument.message;
			message = message.replace("[username]", username);
			message = message.replace("[forgotten_password_code]", argument.activation_code);
			message = message.replace("[forgotten_password_code]", argument.activation_code);
			message = message.replace("[forgotten_password_code]", argument.activation_code);
			let messageBodyJson = message;

			const msg = {
				to: argument.email,
				from: "Imagenation <info@imagenationapp.com>",
				subject: "Forgot Password Email",
				text: "and easy to do anywhere, even with Node.js",
				html: messageBodyJson,
			};

			try {
				await sgMail.send(msg);
				console.log(`Email to ${argument.email} has been sent`);
			} catch (error) {
				console.error(`Failed to send email to ${argument.email}:`, error);
			}
		} else {
			console.log("Please provide the email ID", argument);
		}
	}

	async add_animation(req, res, next) {
		try {
			const payload = req.body;

			const dataToCreate = {
				userId: payload.user_id,
				resultAnimation: payload.result_animation,
				croppedArray: payload.cropped_array
			};
			await animation_store.create(dataToCreate);
			return res.status(200).json({ status: true, message: "Animations added successfully" });
		} catch (error) {
			return res.status(500).json({ status: false, message: "Error" });
		}
	}

	async getAnimationByUserId(req, res, next) {
		try {
			const payload = req.params;

			const result = await animation_store.findAll({ where: { [Op.and]: [{ userId: payload.userId }, { isDeleted: "0" }] } });
			if (result) {
				return res.status(200).json({ status: true, message: result.length ? "Fetched successully" : "No records found", body: result });
			} else {
				return res.status(200).json({ status: true, message: "No records found", body: [] });
			}
		} catch (error) {
			return res.status(500).json({ status: false, message: "Error" });
		}
	}

	async deleteAnimation(req, res, next) {
		try {
			const payload = req.params;

			const result = await animation_store.update({ isDeleted: "1" }, { where: { id: payload.id } });
			if (result) {
				return res.status(200).json({ status: true, message: "Deleted successully" });
			}
		} catch (error) {
			return res.status(500).json({ status: false, message: "Error" });
		}
	}

	async getDocumentByUserid(req, res, next) {
		try {
			const payload = req.params;
			const result = await documents.findAll({
				where: {
				  isMainImage: "1",
				  [Op.and]: [
					{ userId: payload.userId },
					{ isDeleted: "0" }
				  ]
				}
			  });
			if (result) {
				return res.status(200).json({ status: true, message: "Data fetched successfully", body: result });
			} else {
				return res.status(404).json({ status: false, message: "No data found", body: [] });

			}

		} catch (error) {
			return res.status(500).json({ status: false, message: "Error" });
		}
	}

	
	async editUser(req, res, next) {
		try {
		  const payload = req.body;
	
		  const updata = {
			fullName : payload.fullName,
			age: payload.age
		  }
	
	   const result = await usersModel.update(updata,{where: {id: payload.id}});
	   if(result){
		return res.status(200).json({ status: true, message: "Updated successully"});
	   }
		} catch (error) {
		  return res.status(500).json({ status: false, message: "Error" });
		}
	  }


	  async getUserDetailsById(req, res, next) {
		try {
		  const payload = req.params;
	
	   const finalresult = await usersModel.findOne({where: {id: payload.id}});
	   if(finalresult){
		return res.status(200).json({ status: true, message: "Get successully", body: finalresult });
	   }
		} catch (error) {
		  console.log("errorerrorerrorerror", error);
		  return res.status(500).json({ status: false, message: "Error" });
		}
	  }

	  async deleteDocumentById(req, res, next) {
		try {
		  const payload = req.params;
	
	   const result = await documents.update({isDeleted: "1"},{where: {id: payload.id}});
	   if(result){
		return res.status(200).json({ status: true, message: "Deleted successully"});
	   }
		} catch (error) {
		  console.log("errorerrorerrorerror", error);
		  return res.status(500).json({ status: false, message: "Error" });
		}
	  }
}
const generateForgotPasswordCode = (length) => {
	const characters = "0123456789";
	let code = "";

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		code += characters[randomIndex];
	}

	return code;
};

async function uploadPicture(req) {
	if (req.files && req.files.file) {
		const file = req.files.file.name;
		const imagePath = req.files.file.tempFilePath;
		const extension = path.extname(file);
		const basename = path.basename(file, extension);

		let newName = Date.now() + "-" + basename;

		return new Promise(function (resolve, reject) {
			cloudinary.uploader.upload(imagePath, { public_id: newName }, (error, result) => {
				if (error) {
					resolve({ msg: 'error', data: [] });
				} else {
					resolve(result);
				}
			});
		});
	} else {
		return Promise.resolve({ msg: 'error', data: [] });
	}
}

module.exports = new UserService();


