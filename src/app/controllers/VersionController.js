const jsonInstance = require("../utils/JsonUtils");
const responeInstance = require("../utils/ResponeUtils");
const { validationResult } = require("express-validator");
const versionService = require("../service/VersionService");
const createError = require("http-errors");
var fs = require("fs");
var JSZip = require("jszip");
class VersionController {
  //POST
  async createVersion(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      responeInstance.error422(
        res,
        jsonInstance.jsonNoData({ errors: errors.array() })
      );
      return;
    }
    var respone = {
      versionName: req.body.versionName,
      description: req.body.description,
    };
    let idDeviceType = req.params.idDeviceType;
    console.log(`Result ID DEVICE TYPE ${idDeviceType}`);
    await versionService
      .createVersion(respone.name, respone.description, idDeviceType)
      .then((version) => {
        responeInstance.success200(
          res,
          jsonInstance.toJsonWithData(`ADD SUCCCESS!`, version)
        );
      })
      .catch((err) => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
      });
  }

  async queryAll(_, res) {
    await versionService
      .queryAllVersion()
      .then((version) => {
        responeInstance.success200(
          res,
          jsonInstance.toJsonWithData(`SUCCESS`, version)
        );
      })
      .catch((err) => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
      });
  }

  async query(req, res) {
    let id = req.params.id;
    if (id != null) {
      await versionService
        .queryWithId(id)
        .then((version) => {
          responeInstance.success200(
            res,
            jsonInstance.toJsonWithData(`SUCCESS`, version)
          );
        })
        .catch((err) => {
          responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
        });
    } else {
      responeInstance.error400(res, jsonInstance.jsonNoData(`url error`));
    }
  }
  async deleteVersion(req, res) {
    var respone = {
      idVersion: req.body.idVersion,
    };
    
    await versionService
      .deleteVersion(respone.idVersion)
      .then((version) => {
        responeInstance.success200(
          res,
          jsonInstance.toJsonWithData(`SUCCESS`, version)
        );
      })
      .catch((err) => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
      });
  }
  async unzipVersion(req, res, next) {
    const path = req.body.path;
    console.log(path);
    if(fs.existsSync(path)){
      console.log(true);
        fs.readFile(path, function(err, data) {
        if (err) throw err;
        JSZip.loadAsync(data)
        .then(function (zip) {
          responeInstance.success200(
            res,
            jsonInstance.toJsonWithData(`SUCCESS`, zip)
          );
        })
        .catch(err => responeInstance.error400(res, jsonInstance.jsonNoData(err.message)))
    });
    }else{
      responeInstance.error400(res, jsonInstance.jsonNoData('Not Found Path'))
    }
  
  }
}

module.exports = new VersionController();
