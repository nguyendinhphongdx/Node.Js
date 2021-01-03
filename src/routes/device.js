const express = require('express');
const router = express.Router();
const deviceController = require('../app/controllers/DeviceController');


//[GET] /device
router.use('/',deviceController.index);

module.exports = router;