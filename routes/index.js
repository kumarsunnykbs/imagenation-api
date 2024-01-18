const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const userRoutes = require('./user');
const propertyRoutes = require('./property');

const {ApiAuthValidator} = require('../middleware/authValidator/index');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/property', ApiAuthValidator.validateAccessToken, propertyRoutes);
module.exports = router;
