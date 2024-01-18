const SHA256 = require('crypto-js/sha256');

const commonConfig = require('../config/common.config');
const usersModel = require('../models/users');

const otpModel = require('../models/userOtp');
const tokenService = require('./TokenService');
const userOtp = require('../models/userOtp');
const sendOtpTOPhone = require('../common/twilioSms');
const sendOtpMail = require('../common/mailers/sendMail');
const { QueryTypes } = require('sequelize');

class AuthService {
	/** ***** User Service: Method to Signup User ******/
	async signup(req, res, next) {
		try {
			const result = await usersModel.findOne({ where: { email: req.body.email }, raw: true });
			/**
			 * @ param object
			 */
			const payload = req.body;

			/** ** generated hashed password ****/

			const cipherText = SHA256(payload.password, commonConfig.PWD_SECRET).toString();
			/**
			 * @ param {string} fullName, user fullname
			 * @ param {string} email, user email
			 * @ param {string} password, user password
			 * @ param {string} phoneNumber, user phoneNumber
			 */
			const dataToCreate = {
				fullName: req.body.fullName,
				email: req.body.email,
				age: req.body.age || 0,
				password: cipherText,
				phoneNumber: req.body.phoneNumber,
				fcmToken: req.body.fcmToken ?? '',
				activation_code: new Date().getTime()
			};

			if (result) {
				return res.status(403).json({ status: false, message: 'Email already exists', result: { 'email': payload.email } });
			} else {
				const data = await usersModel.create(dataToCreate);
				/** ** generate accessToken and refreshToken with email and id ****/
				const token = tokenService.generateTokens({ email: dataToCreate.email, id: data.id });
				const response = {
					fullName: data.fullName,
					email: data.email,
					phoneNumber: data.phoneNumber,
					accessToken: token.accessToken,
					refreshToken: token.refreshToken,
					userId: data.id,
				};

				const mailTemplate = await sequelize.query("SELECT * FROM `gb_mail_templates` WHERE id=12 order by id asc", { type: QueryTypes.SELECT });

				if (mailTemplate.length > 0) {
					dataToCreate.message = mailTemplate[0].template_body;
					dataToCreate.subject = mailTemplate[0].template_subject;

					const sendMail = await this.sentMail(dataToCreate);
				}

				return res.status(200).json({ status: true, message: 'You have successfully signed up, please verify your email' });
			}
		} catch (error) {
			console.log('++++++++++', error);
			return res.status(500).json({ status: false, message: error });
		}
	}

	/** ***** User Service: Method to do login ******/
	async userLogin(req, res, next) {
		try {
			/**
			 * @ param {string} email, user email
			 * @ param {string} password, user password
			 */
			const payload = req.body;
			/** ** find user data with email ****/
			const data = await usersModel.findOne({ where: { email: payload.email }, raw: true });
			if (data) {
				/** ** generate hashed password and compare with existing password ****/
				if (data.status == 1) {
					const cipherText = SHA256(req.body.password, commonConfig.PWD_SECRET).toString();
					if (cipherText === data.password) {
						/** ** generate accessToken and refreshToken with email and id ****/
						const token = tokenService.generateTokens({ email: data.email, id: data.id });
						/** ** response object  ****/
						const response = {
							fullName: data.fullName,
							email: data.email,
							phoneNumber: data.phoneNumber,
							accessToken: token.accessToken,
							refreshToken: token.refreshToken,
							userId: data.id,
							profileImage: data.profileImage,
						};
						return res.status(200).json({ status: true, message: 'Login Successfully', result: response });
					} else {
						return res.status(401).json({ status: false, message: 'Incorrect Password' });
					}
				} else {
					return res.status(401).json({ status: false, message: 'Profile not activate , Please confirm your email' });
				}
			} else {
				return res.status(401).json({ status: false, message: 'Email not found' });
			}
		} catch (error) {
			return res.status(500).json({ status: false, message: error });
		}
	}

	async forgotPassword(req, res, next) {
		try {
			/**
			 * @ param {string} email, user email
			 * @ param {string} password, user password
			 */
			const OTP = Math.floor(1000 + Math.random() * 9000);

			const payload = req.body;
			/** ** find user data with email ****/
			payload.email ? payload.email : payload.phoneNumber;
			let data = '';
			if (payload.email) {
				data = await usersModel.findOne({ where: { email: payload.email }, raw: true });
			} else if (payload.phoneNumber) {
				data = await usersModel.findOne({ where: { phoneNumber: payload.phoneNumber }, raw: true });
			}
			if (data) {
				const ext = process.env.TWILIO_EXTENSION_NUMBER;
				const number = ext.concat(payload.phoneNumber);
				/** ** generate hashed password and compare with existing password ****/
				const otpData = await otpModel.findOne({ where: { userId: data.id }, raw: true });

				if (otpData) {
					await otpModel.update({ otp: OTP }, { where: { userId: data.id } });
					if (payload.phoneNumber) {
						/** sending sms with otp using twilio */
						await sendOtpTOPhone({ number, OTP });
					}
					/** sending email with otp using nodemailer  */
					sendOtpMail({ email: payload.email, OTP: OTP });
					const message = payload.email ? 'Email sent to registered email successfully' : 'Otp sent to registered number successfully';
					return res.status(200).json({ status: true, message: message, result: { otp: OTP } });
				} else {
					const dataToCreate = {
						userId: data.id,
						otp: OTP,
					};
					await otpModel.create(dataToCreate);
					if (payload.phoneNumber) {
						/** sending sms with otp using twilio */
						await sendOtpTOPhone({ number, OTP });
					}
					/** sending email with otp using nodemailer  */
					sendOtpMail({ email: payload.email, OTP: OTP });

					const message = payload.email ? 'Email sent to registered email successfully' : 'Otp sent to registered number successfully';
					return res.status(200).json({ status: true, message: message, result: { otp: OTP } });
				}
			} else {
				return res.status(401).json({ status: false, message: payload.email ? 'Email not found' : 'Phone number not found' });
			}
		} catch (error) {
			return res.status(500).json({ status: false, message: error });
		}
	}

	async verifyOtp(req, res, next) {
		try {
			/**
			 * @ param {string} otp, user otp
			 */
			const payload = req.body;
			const data = await userOtp.findOne({ where: { otp: payload.otp }, raw: true });
			/** check for otp match with existing otp and payload otp is mathched or not*/
			if (data.otp == payload.otp) {
				return res.status(200).json({ status: true, message: 'Otp Verified Successfully', result: { userId: data.userId } });
			} else {
				return res.status(401).json({ status: false, message: 'Not Verified' });
			}
		} catch (error) {
			return res.status(500).json({ status: false, message: error });
		}
	}

	async sentMail(argument) {
		const sgMail = require('@sendgrid/mail');
		sgMail.setApiKey('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');

		if (argument.email) {
			var username = argument.fullName;
			var message = argument.message;
			message = message.replace('[username]', username);
			message = message.replace('[activation_code]', argument.activation_code);
			message = message.replace('[activation_code]', argument.activation_code);
			message = message.replace('[activation_code]', argument.activation_code);
			let messageBodyJson = message
			const msg = {
				to: argument.email,
				//  from: "info@sixprofit.com",
				from: "Imagenation <info@imagenationapp.com>",
				subject: 'Registration Confirmation Mail',
				text: 'and easy to do anywhere, even with Node.js',
				html: messageBodyJson
			};

			//sgMail.send(msg);

			// Send Email With Exception Handling
			sgMail.send(msg)
				.then(() => {
					console.log(`mail to ${argument.email} is sent`);
				}).catch(error => {
					const { message, code, response } = error;
					console.log(`${error.code} :${error.message}`);
				});
		} else {
			console.log("Please provide the emailID", argument);
		}
	}

	async confirmation(req, res, next) {
		try {
			/**
			 * @ param {string} otp, user otp
			 */
			const activationCode = req.params.activation_code;
			console.log('+++++++activationCode', activationCode);
			const data = await usersModel.findOne({ where: { activation_code: activationCode }, raw: true });

			console.log("dataaaaaaaaaaaa", data)
			if (data) {

				/** check for otp match with existing otp and payload otp is mathched or not*/
				if (data.activation_code == activationCode) {

					/** ** generate accessToken and refreshToken with email and id ****/
						const token = tokenService.generateTokens({ email: data.email, id: data.id });
						/** ** response object  ****/
						const response1 = {
							fullName: data.fullName,
							email: data.email,
							phoneNumber: data.phoneNumber,
							accessToken: token.accessToken,
							refreshToken: token.refreshToken,
							userId: data.id,
							profileImage: data.profileImage,
						};
					await usersModel.update({ status: 1 }, { where: { id: data.id } });

					return res.status(200).json({ status: true, message: 'Emai Verified Successfully', result: response1 });
				} else {
					return res.status(401).json({ status: false, message: 'Not Verified' });
				}
			} else {
				return res.status(500).json({ status: false, message: 'No such activation code found' });
			}
		} catch (error) {
			console.log('=================', error)
			return res.status(500).json({ status: false, message: error });
		}
	}


	async socialLogin(req, res, next) {
		try {
			const payload = req.body;
			console.log("Payload______", payload)
			const dataToInsert = {

				email: payload.email,
				fullName: payload.fullName,
				provider: payload.provider,
				profileImage: payload.profileImage,
				providerId: payload.providerId,
				// accessToken: payload.authToken,


			}
			console.log("*******", dataToInsert)
			const findUser = await usersModel.findOne({ where: { email: payload.email } });
			// console.log('findUserfindUserfindUser', findUser);
			if (findUser) {
				console.log("email already exist", findUser)
				const token = tokenService.generateTokens({ email: payload.email, id: findUser.id });
				const finalResult = {
					userId: findUser.id,
					email: findUser.email,
					accessToken: token.accessToken,
					fullName: findUser.fullName,
					profileImage: findUser.profileImage,
				}
				return res.status(200).json({ status: true, message: 'Login Successfully', result: finalResult })
			} else {
				const response = await usersModel.create(dataToInsert);
				console.log("Insert", response);
				// return
				// let token = jwt.sign({ id: dataToInsert.id, email: dataToInsert.email, }, config.secret, { expiresIn: "1 days" });
				const token = tokenService.generateTokens({ email: payload.email });
				const finalResult = {
					userId: dataToInsert.id,
					email: payload.email,
					accessToken: token.accessToken,
					fullName: payload.fullName,
					provider: payload.provider,
					profileImage: payload.profileImage,
					providerId: payload.providerId,

				}
				return res.status(200).json({ status: true, message: 'Login Successfully', result: finalResult })

			}



		} catch (error) {
			console.log("errorrrrrrr", error)
			res.status(500).json({ status: false, message: error.message });
		}
	}


}


module.exports = new AuthService();

