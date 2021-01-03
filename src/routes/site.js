const express = require('express');
const router = express.Router();
const sitesController = require('../app/controllers/SitesController');

//[GET] /search
router.use('/search',sitesController.search);

//[GET] / -> home
router.use('/',sitesController.index);

module.exports = router;