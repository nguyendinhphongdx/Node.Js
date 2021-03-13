const mongosee = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongosee.Schema;

const User = mongosee.Schema({
  username: { type: String, maxLength: 100 },
  password: { type: String, minLength: 6, maxLength: 1000 },
  token: { type: String },
  refreshToken: { type: String },
  start: { type: String },
  expire: { type: String },
  numberphone: { type: String },
  permission: {
    type: String,
    enum: ["user", "admin"],
    default: "admin",
  },
  createAt: { type: Number, default: Date.now().valueOf() },
  updateAt: { type: Number, default: Date.now().valueOf() },
});

User.pre('save', function(next){
  this.password = bcrypt.hashSync(this.password, 10);
  next();
  });
User.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

module.exports = mongosee.model("users", User);
