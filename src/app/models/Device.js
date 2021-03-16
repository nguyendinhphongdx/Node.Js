const mongoose = require("mongoose");
const FileType = require("./FileType");
const Device = new mongoose.Schema({
  nameDevice:{type:String},
  idDeviceType: { type:String},
  idGroups: { type:String  },
  currentVersion: { type: String },
  description: { type: String },
  ipAddress: { type: String},
  pathUpdate: { type: String },
  createAt: { type: Number, default: Date.now().valueOf() },
  updateAt: { type: Number, default: Date.now().valueOf() },
});

module.exports = mongoose.model("Device", Device);
