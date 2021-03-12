const userModel = require("../models/User");
const axios = require("axios");
const { header } = require("express-validator");
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { authuShema } = require("../validate/authenSchema");
const { signAccessToken } = require("../helpers/jwt_helper");
class AuthenService {
  //POST
  async loginWithSalt(result) {
    return await userModel
      .findOne({ username: result.username})
      .exec()
      .then(async (user) => {
        if (user == null) {
          throw createError.NotFound("User not registered");
        }
        else{
          if(bcrypt.compareSync(result.password,user.password)){
            try {
              let token = jwt.sign({ _id: user._id }, "secret", {
                noTimestamp: true,
                expiresIn: "1h",
              });
              // const token = await signAccessToken(user._id)
              // console.log("token " + token);
              let refreshToken = jwt.sign({_id:user._id}, "secret", {
                noTimestamp:true,
                expiresIn:"1h",
              });
              user.token = token;
              user.refreshToken = refreshToken;
              let res = await user;
              return res;
            } catch (error) {
              throw new Error("error.message " + error.message);
            }
          }
          else {
            throw new Error("Ivalid password")
          }
        }
      
      });
  }
  async logoutWithId(idUser) {
    return await userModel
      .findByIdAndUpdate(idUser, { status: false }, { new: true })
      .exec()
      .then((user) => {
        if (user == null) {
          throw new Error(`wrong mail or password`);
        }
        return user;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
}

module.exports = new AuthenService();
