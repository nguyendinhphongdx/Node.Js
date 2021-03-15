const groupModel = require("../models/GroupDevice");
const device  = require("../models/Device");
class DeviceService {
  //GET
//   async queryAllGroup() {
//     return await groupModel
//       .find({})
//       .exec()
//       .then((devicetype) => {
//         if (devicetype == null) {
//           throw new Error("query device Type error");
//         }
//         return devicetype;
//       })
//       .catch((err) => {
//         throw new Error(err.message);
//       });
//   }
//   //GET
//   async queryWithId(id) {
//     return await groupModel
//       .findById(id)
//       .exec()
//       .then((device) => {
//         if (device == null) {
//           throw new Error("invalid deviceType");
//         }
//         return device;
//       })
//       .catch((err) => {
//         throw new Error(err.message);
//       });
//   }

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
async createVersion(host,description,fieldname) {
  var newDevice = new device();
  newDevice.devic
  VEW.versionName = versionName
  newVersion.description = description
  newVersion.fieldname  = fieldname
  return await versionModel.findOne({ versionName: versionName })
    .exec()
    .then(async (version) => {
      if (version != null) {
        throw new Error(`version is exists`)
      }
      try {
        let result = await newVersion.save();
        console.log(`create version =${result}`)
        return result
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
