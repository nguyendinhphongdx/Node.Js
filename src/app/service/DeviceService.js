const groupModel = require("../models/GroupDevice");
const device  = require("../models/Device");
class DeviceService {
  GET
  async queryAllDevice() {
    return await groupModel
      .find({})
      .exec()
      .then((devicetype) => {
        if (devicetype == null) {
          throw new Error("query device Type error");
        }
        return devicetype;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
  //GET
  async queryWithId(id) {
    return await groupModel
      .findById(id)
      .exec()
      .then((device) => {
        if (device == null) {
          throw new Error("invalid Device");
        }
        return device;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }


//   POST
//   async createGroup(name, path,typeUpdate) {
//     var newGroup = new groupModel();
//     newGroup.name = name;
//     newGroup.path = path;
//     // newGroup.updateType = typeUpdate;
    
//     return await deviceTypeModel
//       .findOne({ name: name })
//       .exec()
//       .then(async (user) => {
//         if (user != null) {
//           throw new Error(`Group is exists`);
//         }
//         try {
//           let result = await newGroup.save();
//           console.log(`create Group =${result}`);
//           return result;
//         } catch (err) {
//           throw new Error(err.message);
//         }
//       })
//       .catch((err) => {
//         throw new Error(err.message);
//       });
//   }

async createDevice(nameDevice, idDeviceType, idGroups, currentVersion ,description, ipAddress,pathUpdate) {
  var newDevice = new device();
  newDevice.nameDevice = nameDevice
  newDevice.idDeviceType = idDeviceType
  newDevice.idGroups = idGroups
  newDevice.currentVersion = currentVersion
  newDevice.description = description
  newDevice.ipAddress = ipAddress
  newDevice.pathUpdate = pathUpdate
  return await device.findOne({ ipAddress: ipAddress })
    .exec()
    .then(async (deivce) => {
      if (deivce != null) {
        throw new Error(`Device is exists`)
      }
      try {
        return await newDevice.save();
      } catch (err) {
        throw new Error(err.message)
      }
    })
    .catch((err) => {
      throw new Error(err.message)
    })
  }
}

module.exports = new DeviceService();
