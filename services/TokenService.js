const jwt = require('jsonwebtoken');
const commonConfig = require('../config/common.config');

module.exports = {

	/** ***** Token Service: Method to generate access and refresh token at the time of login ******/
	generateTokens(data) {
		const accessToken = jwt.sign(data, commonConfig.JWT_SECRET, {expiresIn: commonConfig.JWT_TOKEN_LIFE});
		const refreshToken = jwt.sign(data, commonConfig.JWT_REFRESH_TOKEN_SECRET, {expiresIn: commonConfig.JWT_REFRESH_TOKEN_LIFE});
		const token = {
			accessToken: accessToken,
			refreshToken: refreshToken,
		};
		return token;
	},

	/** ***** Token Service: Method to generate access token after expiry ******/
	generateAccessTokens(data) {
		const accessToken = jwt.sign(data, commonConfig.JWT_SECRET, {expiresIn: commonConfig.JWT_TOKEN_LIFE});
		const token = {
			accessToken: accessToken,
		};
		return token;
	},

	/** ***** Token Service: Method to get expiry of token ******/
	getTokenExpiry(token) {
		const decode = jwt.verify(token, commonConfig.JWT_SECRET);
		return decode;
	},

	/** ***** Token Service: Method to generate email token after expiry ******/
	generateEmailTokens(data) {
		const emailToken = jwt.sign(data, commonConfig.JWT_EMAIL_TOKEN_SECRET, {expiresIn: commonConfig.JWT_EMAIL_TOKEN_LIFE});
		return emailToken;
	},

};
