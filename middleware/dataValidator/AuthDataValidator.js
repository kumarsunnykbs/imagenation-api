const Yup = require('yup');
const commonConstants = require('../../constants/constant');

class AuthDataValidator {
	/** ***** User Data Validateor: Method to validate add user request ******/
	validateSignup(req, res, next) {
		const schema = Yup.object().shape({
			fullName: Yup.string().trim().required('Full Name is required').min(3, 'Name should be atleast 3 characters').max(30, 'Name should max 30 characters'),
			email: Yup.string().required('Email is required').email('Invalid Email'),
			password: Yup.string().trim().required('Please Enter your password').matches(commonConstants.PASSWORD, 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'),
			phoneNumber: Yup.string().required('Phone Number is required').matches(commonConstants.PHONE_REGEXP, 'Phone number is not valid'),
		});
		schema.validate(req.body, {abortEarly: false}).then((response) => {
			next();
		}).catch((err) => {
			next(err);
		});
	}

	/** ***** Auth data validator: Method to validate email & password present in login request ******/
	login(req, res, next) {
		const schema = Yup.object().shape({
			email: Yup.string().required('Email is required').email('Invalid Email'),
			password: Yup.string().trim().required('Please Enter your password'),
		});
		schema.validate(req.body, {abortEarly: false}).then((response) => {
			const platform = req.headers['platform'].toLowerCase();
			if (platform == 'web') {
				next();
			} else {
				return res.status(400).json({status: false, message: 'Bad Request', errors: ['Platform not valid']});
			}
		}).catch((err) => {
			next(err);
		});
	}

	forgotPassword(req, res, next) {
		const schema = Yup.object().shape({
			email: Yup.string().email('Invalid Email'),
			phoneNumber: Yup.string().matches(commonConstants.PHONE_REGEXP, 'Phone number is not valid'),
		});
		schema.validate(req.body, {abortEarly: false}).then((response) => {
			const platform = req.headers['platform'].toLowerCase();
			if (platform == 'web') {
				next();
			} else {
				return res.status(400).json({status: false, message: 'Bad Request', errors: ['Platform not valid']});
			}
		}).catch((err) => {
			next(err);
		});
	}
}

module.exports = new AuthDataValidator();
