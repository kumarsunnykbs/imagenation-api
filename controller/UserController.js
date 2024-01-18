const { UserService } = require('../services/index');

class UserController {
	/** ***** User Controller: Method to get profile ******/
	async getUserProfile(req, res, next) {
		try {
			await UserService.getUserProfile(req, res, next);
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}
	async changePassword(req, res, next) {
		try {
			await UserService.changePassword(req, res, next);
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}
	async resetPassword(req, res, next) {
		try {
			await UserService.resetPassword(req, res, next);
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}
	async editProfile(req, res, next) {
		try {
			await UserService.editProfile(req, res, next);
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}

	async getFilters(req, res, next) {
		try {
			await UserService.getFilters(req, res, next);
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}
	async updateUserFilters(req, res, next) {
		try {
			await UserService.updateUserFilters(req, res, next);
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}
	async createPropertylist(req, res, next) {
		try {
			await UserService.createPropertylist(req, res, next);
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}
	async getPropertyList(req, res, next) {
		try {
			await UserService.getPropertyList(req, res, next);
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}
	async addPropertyToList(req, res, next) {
		try {
			await UserService.addPropertyToList(req, res, next);
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}
	async userPropertiesByListId(req, res, next) {
		try {
			await UserService.userPropertiesByListId(req, res, next);
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}
	async addFavoriteProperty(req, res, next) {
		try {
			await UserService.addFavoriteProperty(req, res, next);
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}
	async favoriteProperties(req, res, next) {
		try {
			await UserService.userFavoriteProperties(req, res, next);
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}
	async addHistory(req, res, next) {
		try {
			await UserService.addHistory(req, res, next);
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}
	async getHistory(req, res, next) {
		try {
			await UserService.getHistory(req, res, next);
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}
	async uploadPic(req, res, next) {
		try {
			await UserService.uploadPic(req, res, next);
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}
	async forgotPassword(req, res, next) {
		try {
			await UserService.forgotPassword(req, res, next);
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}

	async add_animation(req, res, next) {
		try {
			await UserService.add_animation(req, res, next);
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}

	async getAnimationByUserId(req, res, next) {
		try {
			await UserService.getAnimationByUserId(req, res, next);
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}

	async deleteAnimation(req, res, next) {
		try {
			await UserService.deleteAnimation(req, res, next);
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}
	async getDocumentByUserid(req, res, next) {
		try {
			await UserService.getDocumentByUserid(req, res, next);
		} catch (error) {
			return res.status(500).json({ status: false, message: 'error' });
		}
	}

	async editUser(req, res, next) {
		try {
			await UserService.editUser(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}

	async getUserDetailsById(req, res, next) {
		try {
			await UserService.getUserDetailsById(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}

	async deleteDocumentById(req, res, next) {
		try {
			await UserService.deleteDocumentById(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: 'error'});
		}
	}
}

module.exports = new UserController();
