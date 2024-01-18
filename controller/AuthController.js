const { AuthService } = require('../services/index');

class AuthController {
	/** ***** Auth Controller: Method to Signup User ******/
	async signup(req, res, next) {
		try {
			await AuthService.signup(req, res, next);
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}

	/** ***** Auth Controller: Method to do user login ******/
	async userLogin(req, res, next) {
		try {
			await AuthService.userLogin(req, res, next);
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}
	/** ***** Auth Controller: Method to do user forgot password ******/
	async forgotPassword(req, res, next) {
		try {
			await AuthService.forgotPassword(req, res, next);
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}

	async verifyOtp(req, res, next) {
		try {
			await AuthService.verifyOtp(req, res, next);
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}

	/** ***** Auth Controller: Method to generate new access token ******/
	async generateAccessToken(req, res, next) {
		try {
			await AuthService.generateAccessToken(req, res, next);
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}

	async confirmation(req, res, next) {
		try {
			await AuthService.confirmation(req, res, next);
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}

	async socialLogin(req, res, next) {
		try {
			await AuthService.socialLogin(req, res, next);
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}

}

module.exports = new AuthController();
