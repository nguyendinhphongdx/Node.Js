const jsonInstance = require("../utils/JsonUtils");
const responeInstance = require("../utils/ResponeUtils");
const { validationResult } = require("express-validator");
const authenService = require("../service/AuthenService");
const devicetypeService = require("../service/DeviceTypeService");
const { authuShema } = require("../validate/authenSchema");
const createError = require("http-errors");
const versionSerive = require("../service/VersionService");
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
    var respone = {
      name: req.body.name,
      description: req.body.description,
    };
    await devicetypeService
      .createDeviceType(respone.name, respone.description)
      .then((device) => {
        responeInstance.success200(
          res,
          jsonInstance.toJsonWithData(`ADD SUCCCESS!`, device)
        );
      })
      .catch((err) => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
      });
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
  async addVersion(req, res) {
    var response = {
      versionName: req.body.versionName,
      description: req.body.description,
      idDeviceType: req.body.idDeviceType,
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      encoding: req.file.encoding,
      minetype: req.file.minetype,
      destination: req.file.destination,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
    };
    // const { versionName, description, idDeviceType } = req.body;
    const errors = validationResult(response);
    if (!errors.isEmpty()) {
      responeInstance.error422(
        res,
        jsonInstance.jsonNoData({ errors: errors.array() })
      );
      return;
    }
    if (response.versionName && response.description && response.idDeviceType) {
      console.log(`fileName ${response.filename}`);
      
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
          // console.log(`Result data = ${res}`);
        })
        .catch((err) => {
          responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
        });
    } else {
      responeInstance.error400(res, jsonInstance.jsonNoData(`url error`));
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
