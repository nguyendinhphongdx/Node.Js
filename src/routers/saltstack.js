const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require("multer");
const saltrouter = require('../app/controllers/SaltStackController');
const verifyToken = require("../app/helpers/tokenCheker");
// const { exec } = require('child_process');
let Client = require('ssh2-sftp-client');
let execFile = require('child_process').execFile
var client = require('scp2')
var fs = require("fs");
var exec = require('child_process').exec;
var conn = new Client();
router.post('/netapi',verifyToken,saltrouter.func);
router.post('/netapi/kwarg',saltrouter.fullargs);
router.get('/keys/:device',saltrouter.getKeyNameDevice);
router.get('/minions',saltrouter.getMinions);
router.post('/keys/all',saltrouter.funcKeys);
router.get('/history',saltrouter.history);
router.get('/history/:jid',saltrouter.detailHistory);
router.get('/name-device',saltrouter.getDeviceName);
router.post('/sendfile',saltrouter.sendFile);
router.post('/execute',saltrouter.execute);
// router.post('initDevice',saltrouter.)
// router.post('/keys/accept',saltrouter.funcAccept)


module.exports = router;