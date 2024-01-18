const express = require('express');
const router = express.Router();
const { UserController } = require('../controller/index');
const { UserDataValidator } = require('../middleware/dataValidator/index');
const { ApiAuthValidator } = require('../middleware/authValidator/index');


router.post('/uploadPic', UserController.uploadPic);
router.get('/getUserDetailsById/:id', UserController.getUserDetailsById);

router.get('/profile', UserController.getUserProfile);
router.post('/add_animation', UserController.add_animation);
router.get('/getAnimationByUserId/:userId', UserController.getAnimationByUserId);
router.post('/deleteAnimation/:id', UserController.deleteAnimation);
router.post('/deleteDocumentById/:id', UserController.deleteDocumentById);
router.post('/editUser', UserController.editUser);
router.put('/editProfile', UserDataValidator.editProfile, ApiAuthValidator.validateAccessToken, UserController.editProfile);
router.post('/changePassword', UserDataValidator.changePassword, UserController.changePassword);
router.post('/resetPassword', UserController.resetPassword);
router.post('/forgotPassword', UserController.forgotPassword);
router.get('/filters', ApiAuthValidator.validateAccessToken, UserController.getFilters);
router.put('/updateFilters', ApiAuthValidator.validateAccessToken, UserController.updateUserFilters);

router.post('/createPropertyList', UserDataValidator.createList, ApiAuthValidator.validateAccessToken, UserController.createPropertylist);
router.get('/getPropertyList', ApiAuthValidator.validateAccessToken, UserController.getPropertyList);
router.post('/addPropertyToList', UserDataValidator.addPropertyToList, ApiAuthValidator.validateAccessToken, UserController.addPropertyToList);
router.get('/userListedProperties', UserDataValidator.userListedProperty, ApiAuthValidator.validateAccessToken, UserController.userPropertiesByListId);
router.post('/addFavoriteProperty', UserDataValidator.addFavoriteProperty, ApiAuthValidator.validateAccessToken, UserController.addFavoriteProperty);
router.get('/favoriteProperties', ApiAuthValidator.validateAccessToken, UserController.favoriteProperties);
router.post('/addHistory', UserDataValidator.addHistory, ApiAuthValidator.validateAccessToken, UserController.addHistory);
router.get('/getHistory', ApiAuthValidator.validateAccessToken, UserController.getHistory);
router.get('/getDocumentByUserid/:userId', UserController.getDocumentByUserid);



module.exports = router;
