const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	BASE_URL: process.env.BASE_URL,
	API_VERSION: process.env.API_VERSION,
	SERVER: process.env.SERVER,
	JWT_SECRET: process.env.JWT_SECRET,
	JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
	JWT_TOKEN_LIFE: process.env.JWT_TOKEN_LIFE,
	JWT_REFRESH_TOKEN_LIFE: process.env.JWT_REFRESH_TOKEN_LIFE,
	X_API_KEY: process.env.X_API_KEY,
	PWD_SECRET: process.env.PWD_SECRET,
};
