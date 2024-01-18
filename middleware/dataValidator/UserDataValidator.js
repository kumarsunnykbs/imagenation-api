const Yup = require('yup');
const commonConstants = require('../../constants/constant');

class UserDataValidator {
	changePassword(req, res, next) {
		const schema = Yup.object().shape({
			newPassword: Yup.string().trim().required('Please Enter your password').matches(commonConstants.PASSWORD, 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'),

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
	editProfile(req, res, next) {
		const schema = Yup.object().shape({
			fullName: Yup.string().trim().required('Full Name is required').min(3, 'Name should be atleast 3 characters').max(30, 'Name should max 30 characters'),
			email: Yup.string().required('Email is required').email('Invalid Email'),
			phoneNumber: Yup.string().required('Phone Number is required').matches(commonConstants.PHONE_REGEXP, 'Phone number is not valid'),
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
	resetPassword(req, res, next) {
		const schema = Yup.object().shape({
			password: Yup.string().trim().required('Please Enter your password').matches(commonConstants.PASSWORD, 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'),

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
	createList(req, res, next) {
		const schema = Yup.object().shape({
			listName: Yup.string().trim().required('Please Enter List Name'),
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
	addPropertyToList(req, res, next) {
		const schema = Yup.object().shape({
			listId: Yup.string().trim().required('Please Enter ListId'),
			property_id: Yup.string().trim().required('Please Enter propertyId'),

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
	addFavoriteProperty(req, res, next) {
		const schema = Yup.object().shape({
			propertyId: Yup.string().trim().required('Please Enter PropertyId'),

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
	addHistory(req, res, next) {
		const schema = Yup.object().shape({
			propertyId: Yup.string().trim().required('Please Enter PropertyId'),

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
	userListedProperty(req, res, next) {
		const schema = Yup.object().shape({
			listId: Yup.string().trim().required('Please Enter listId'),

		});
		schema.validate(req.query, {abortEarly: false}).then((response) => {
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
	editProfile(req, res, next) {
		const schema = Yup.object().shape({
			fullName: Yup.string().trim().required('Full Name is required').min(3, 'Name should be atleast 3 characters').max(30, 'Name should max 30 characters'),
			email: Yup.string().required('Email is required').email('Invalid Email'),
			phoneNumber: Yup.string().required('Phone Number is required').matches(commonConstants.PHONE_REGEXP, 'Phone number is not valid'),

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

module.exports = new UserDataValidator();
