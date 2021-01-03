const express = require('express');
const router = express.Router();
const reportController = require('../app/controllers/ReportController');


//[GET] /report
router.use('/',reportController.index);

module.exports = router;