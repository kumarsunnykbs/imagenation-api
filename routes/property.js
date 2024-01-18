const express = require('express');
const router = express.Router();
const {PropertyController} = require('../controller/index');


router.post('/fetchProperty', PropertyController.fetchproperty);
router.post('/detail', PropertyController.propertiesDetail);
module.exports = router;
