const mongosee = require("mongoose");
const Schema = mongosee.Schema;
const Gateway = require("./SmsGateway");
const Alert  = require("./Alert");
const User = require("./User");
const Version = require("./Version");
const Device = require("./Device");


const GroupDevice = new Schema({
  name:{type: String},
  updateType: {
    type: String,
    enum: ["auto", "manual"],
    default: "manual",
  },
  currentVersion:{type:[Version.schema],default:[]},
  smsGateway:{type:[Gateway.schema],default:[]},
  user: {type:[User.schema],default:[]},
  alert:{type: [Alert.schema],default:[]},
  path:{type: String },
  devices:{type: [Device.schema],default:[]},
  idDeviceType:{type: String},
  createAt: { type: Number, default: Date.now().valueOf() },
  updateAt: { type: Number, default: Date.now().valueOf() },
});
module.exports = mongosee.model("GroupDevice", GroupDevice);
