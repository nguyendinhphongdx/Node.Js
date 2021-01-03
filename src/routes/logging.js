const express = require('express');
const router = express.Router();
const loggingController = require('../app/controllers/LoggingController');


//[GET] /logging
router.use('/',loggingController.index);

module.exports = router;