const jsonInstance = require("../utils/JsonUtils");
const responeInstance = require("../utils/ResponeUtils");
const { validationResult } = require("express-validator");
const authenService = require("../service/AuthenService");
const devicetypeService = require("../service/DeviceTypeService");
const { authuShema } = require("../validate/authenSchema");
const createError = require("http-errors");
const versionSerive = require("../service/VersionService");
const deviceService = require("../service/DeviceService");
class DeviceController {
//   //POST
//   async createDevice(req, res) {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       responeInstance.error422(
//         res,
//         jsonInstance.jsonNoData({ errors: errors.array() })
//       );
//       return;
//     }
//     var respone = {
//       name: req.body.name,
//       description: req.body.description,
//     };
//     await devicetypeService
//       .createDeviceType(respone.name, respone.description)
//       .then((device) => {
//         responeInstance.success200(
//           res,
//           jsonInstance.toJsonWithData(`ADD SUCCCESS!`, device)
//         );
//       })
//       .catch((err) => {
//         responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
//       });
//   }
//   async getAllDevice(_, res) {
//     await devicetypeService
//       .queryAllDeviceType()
//       .then((device) => {
//         responeInstance.success200(
//           res,
//           jsonInstance.toJsonWithData(`SUCCESS`, device)
//         );
//       })
//       .catch((err) => {
//         responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
//       });
//   }
//   //POST
//   async queryWithId(req, res) {
//     let id = req.params.id;
//     if (id != null) {
//       await devicetypeService
//         .queryWithId(id)
//         .then((device) => {
//           responeInstance.success200(
//             res,
//             jsonInstance.toJsonWithData("SUCCESS", device)
//           );
//         })
//         .catch((err) => {
//           responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
//         });
//     } else {
//       responeInstance.error400(res, jsonInstance.jsonNoData(`URL ERROR`));
//     }
//   }
//nameDevice, idDeviceType, idGroups, currentVersion ,description, ipAddress
  async addDevice(req, res) {
    var response = {
      nameDevice: req.body.nameDevice,
      idDeviceType: req.body.idDeviceType,
      idGroups: req.body.idGroups,
      currentVersion: req.body.currentVersion,
      description: req.body.description,
      ipAddress: req.body.ipAddress,
      pathUpdate: req.body.pathUpdate
    };

    if (response.nameDevice && response.ipAddress) {
      console.log(`Name Device ${response.nameDevice}`);
      await deviceService
        .createDevice(
          response.nameDevice,
          response.idDeviceType,
          response.idGroups,
          response.currentVersion,
          response.description,
          response.ipAddress,
          response.pathUpdate,
        )
        .then(async (device) => {
            responeInstance.success200(res,
                jsonInstance.toJsonWithData(`create device successfully`, device)
              );
        })
        .catch((err) => {
          responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
        });
    } else {
      responeInstance.error400(res, jsonInstance.jsonNoData(`url error`));
    }
  }
}

module.exports = new DeviceController();
