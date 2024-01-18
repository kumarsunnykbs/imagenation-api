const express = require('express');
const router = express.Router();
const { AuthController } = require('../controller/index');
const { AuthDataValidator } = require('../middleware/dataValidator/index');
const { ApiAuthValidator } = require('../middleware/authValidator/index');

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.userLogin);
router.post('/sendOTP', AuthDataValidator.forgotPassword, AuthController.forgotPassword);
router.post('/verifyOtp', AuthController.verifyOtp);
router.get("/confirmation/:activation_code", AuthController.confirmation);
router.post('/socialLogin', AuthController.socialLogin);

router.post('/generate_access_token', ApiAuthValidator.validateRefreshToken, AuthController.generateAccessToken);

module.exports = router;
