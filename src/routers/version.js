const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require("multer");
const versionRouter = require('../app/controllers/VersionController');
const verifyToken = require("../app/helpers/tokenCheker");

router.post('/add', verifyToken,versionRouter.createVersion);
router.get('/getAll',verifyToken,versionRouter.queryAll);
router.get('/get/:id',verifyToken,versionRouter.query);
router.post('/delete',versionRouter.deleteVersion)




module.exports = router;