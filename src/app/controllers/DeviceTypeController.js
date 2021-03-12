const jsonInstance = require("../utils/JsonUtils");
const responeInstance = require("../utils/ResponeUtils");
const { validationResult } = require("express-validator");
const authenService = require("../service/AuthenService");
const devicetypeService = require("../service/DeviceTypeService");
const { authuShema } = require("../validate/authenSchema");
const createError = require("http-errors");
const versionSerive = require("../service/VersionService");
const pathUpload = process.cwd() +'/public/';
const DeviceType = require("../models/DeviceType");
const fs = require('fs');
class DeviceTypeController {
  //POST
  async createDeviceType(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      responeInstance.error422(
        res,
        jsonInstance.jsonNoData({ errors: errors.array() })
      );
      return;
    }
    try {
      var respone = {
        name: req.body.name,
        description: req.body.description,
      };
      await devicetypeService
        .createDeviceType(respone.name, respone.description)
        .then((device) => {
          var dir =  pathUpload+`${device.name}`;
          if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir);
              console.log('created',dir);
              responeInstance.success200(
                res,
                jsonInstance.toJsonWithData(`ADD SUCCCESS!`, device)
              );
          }else{
            console.log('uncreated',dir);
            throw new Error('Error creating folder')
          }
        })
        .catch((err) => {
          responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
        });
    } catch (error) {
      responeInstance.error400(res, jsonInstance.jsonNoData(error.message));
    }
  }
  async getAllDeviceType(_, res) {
    await devicetypeService
      .queryAllDeviceType()
      .then((device) => {
        responeInstance.success200(
          res,
          jsonInstance.toJsonWithData(`SUCCESS`, device)
        );
      })
      .catch((err) => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
      });
  }
  //POST
  async queryWithId(req, res) {
    let id = req.params.id;
    if (id != null) {
      await devicetypeService
        .queryWithId(id)
        .then((device) => {
          responeInstance.success200(
            res,
            jsonInstance.toJsonWithData("SUCCESS", device)
          );
        })
        .catch((err) => {
          responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
        });
    } else {
      responeInstance.error400(res, jsonInstance.jsonNoData(`URL ERROR`));
    }
  }
  async addVersion(req, res,next) {
    var response = {
      versionName: req.body.versionName,
      description: req.body.description,
      idDeviceType: req.params.idDeviceType,
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      encoding: req.file.encoding,
      minetype: req.file.minetype,
      destination: req.file.destination,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
    };
    const errors = validationResult(response);
    if (!errors.isEmpty()) {
      responeInstance.error422(
        res,
        jsonInstance.jsonNoData({ errors: errors.array() })
      );
      return;
    }
    try {
      if (response.versionName && response.description && response.idDeviceType) {
           await versionSerive.createVersion(
            response.versionName,
            response.description,
            response.fieldname,
            response.originalname,
            response.encoding,
            response.minetype,
            response.destination,
            response.filename,
            response.path,
            response.size)
          .then(async (device) => {
            // console.log(`create version =${device}`);
            await devicetypeService
              .addVersion(device, response.idDeviceType)
              .then((version) => {
                responeInstance.success200(
                  res,
                  jsonInstance.toJsonWithData(`create successfully`, version)
                );
              });
          })
          .catch((err) => {
            responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
          });
      } else {
        responeInstance.error400(res, jsonInstance.jsonNoData(`url error`));
      }
    } catch (error) {
      responeInstance.error400(res, jsonInstance.jsonNoData(error));
    }
  }
  async deleteService(req, res) {
    var response = {
      idDeviceType: req.body.idDeviceType,
    };
    if (response.idDeviceType != null) {
      await devicetypeService
        .deleteDeviceType(response.idDeviceType)
        .then((device) => {
          responeInstance.success200(
            res,
            jsonInstance.toJsonWithData("SUCCESS", device)
          );
        })
        .catch((err) => {
          responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
        });
    } else {
      responeInstance.error400(res, jsonInstance.jsonNoData(`URL ERROR`));
    }
  }
  async deleteVerInDeviceType(req, res) {
    var response = {
      idDeviceType: req.body.idDeviceType,
      idVersion: req.body.idVersion,
    };
    if (response.idDeviceType != null) {
      await devicetypeService.deleteVersion(response.idDeviceType, response.idVersion)
      .then(async (data) => {
        await versionSerive.deleteVersion(response.idVersion)
          .then((result) => {
            responeInstance.success200(
              res,
              jsonInstance.toJsonWithData(`delete success`, result)
            )
          })
      })
      .catch((err) => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
      });
    } else {
      responeInstance.error400(res, jsonInstance.jsonNoData(`URL ERROR`));
    }
  }
}

module.exports = new DeviceTypeController();
