const express = require('express');
const router = express.Router();
const objectController = require('../app/controllers/ObjectController');


//[GET] /object
router.use('/',objectController.index);

module.exports = router;