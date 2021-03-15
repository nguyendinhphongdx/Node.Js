const mongosee = require("mongoose");
const Schema = mongosee.Schema;
const Version = require('./Version');
const Device = require('./Device');
const GroupDevice = require('./GroupDevice');
const DeviceType = new Schema({
  idUser:{type: String},
  name: { type: String },
  description:{type: String},
  versions:{type:[Version.schema],default:[]},
  devices:{type:[Device.schema],default:[]},
  groups:{type:[GroupDevice.schema],default:[]},
  createAt: { type: Number, default: Date.now().valueOf() },
  updateAt: { type: Number, default: Date.now().valueOf() },
});
module.exports = mongosee.model("DeviceType", DeviceType);
