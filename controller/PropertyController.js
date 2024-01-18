const {PropertyService} = require('../services/index');

class PropertyController {
	/** ***** Auth Controller: Method to Signup User ******/
	async fetchproperty(req, res, next) {
		try {
			await PropertyService.fetchProperty(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}


	async propertiesDetail(req, res, next) {
		try {
			await PropertyService.propertiesDetail(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}
}


module.exports = new PropertyController();
