const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const debug = require("debug")("server-bif:app");
const uploadController = require("../app/controllers/UploadConfigController");
const util = require('util');
const verifyToken = require("../app/helpers/tokenCheker");
var serveIndex = require('serve-index')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });


router.post(
  "/uploadFile",
  upload.single("file"),
  function (req, res) {
    debug(req.file);
    console.log("storage location is ", req.hostname + "/" + req.file.path);
    return res.send(req.file);
  }
);

router.use("/ftp",express.static("public"),serveIndex("public", { icons: true }));

router.use("/public/:folder/:filename", (req, res) => {
  const path = `${process.cwd()}/public/${req.params.folder}/${req.params.filename}`;
  res.download(path);
});

router.post("/config",uploadController.multipleUpload)

module.exports = router;
