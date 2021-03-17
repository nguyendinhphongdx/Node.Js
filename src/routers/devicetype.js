const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');
const debug  = require('debug')('server-bif:app');
const serveIndex = require('serve-index')
const deviceRouter = require("../app/controllers/DeviceTypeController");
const verifyToken = require("../app/helpers/tokenCheker");
const DeviceType = require("../app/models/DeviceType");
const Version = require("../app/models/Version");
var storage = multer.diskStorage({
    destination: async(req, file, cb) => {
        console.log(req);
        const _deviceType = await DeviceType.findById(req.params.idDeviceType);
        const nameFolder = _deviceType.name;
        const res =  _deviceType.versions.some(version => version.versionName == req.body.versionName);
        console.log(res);
        if(res){
            console.log('Version is exists...');
            throw new Error('Version is exists')
        }else{
            cb(null, `./public/${nameFolder}`)
        }       
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });
router.post("/create", verifyToken, deviceRouter.createDeviceType);
router.get("/getAll", verifyToken, deviceRouter.getAllDeviceType);
router.get("/get/:id", verifyToken, deviceRouter.queryWithId);
router.post("/add-version/:idDeviceType",verifyToken,upload.single('file'),deviceRouter.addVersion);
router.post("/delete",verifyToken,deviceRouter.deleteService);
router.post("/delete/version",deviceRouter.deleteVerInDeviceType);
router.post("/add-group",deviceRouter.addGroup);
// router.post("/add-device",deviceRouter.addDevice);
router.post('/device',deviceRouter.addDevice);
module.exports = router;
