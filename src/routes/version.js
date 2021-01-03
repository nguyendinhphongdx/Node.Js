const express = require('express');
const router = express.Router();
const versionController = require('../app/controllers/VersionController');


//[GET] /version
router.use('/',versionController.index);

module.exports = router;