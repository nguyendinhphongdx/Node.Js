const { db } = require("../models/User");
const saltService = require("../service/SaltStackService");
const jsonInstance = require("../utils/JsonUtils");
const responeInstance = require("../utils/ResponeUtils");
const { validationResult } = require("express-validator");
class SaltStackController {
  async func(req, res) {
    var respone = {
      fun: req.body.fun,
      tgt: req.body.tgt,
    };
    await saltService
      .func(respone.fun, respone.tgt)
      .then((ping) => {
        responeInstance.success200(
          res,
          jsonInstance.toJsonWithData(`SUCCESS`, ping)
        );
      })
      .catch((err) => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
      });
  }
  async fullargs(req, res) {
    var respone = {
      fun: req.body.fun,
      tgt: req.body.tgt,
      kwarg: req.body.kwarg,
    };
    await saltService
      .fullargs(respone.fun, respone.tgt, respone.kwarg)
      .then((data) => {
        responeInstance.success200(
          res,
          jsonInstance.toJsonWithData(`SUCCESS`, data)
        );
      })
      .catch((err) => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
      });
  }
  async getKeyNameDevice(req, res) {
    let device = req.params.device;
    await saltService
      .getKeyNameDevice(device)
      .then((data) => {
        responeInstance.success200(
          res,
          jsonInstance.toJsonWithData(`SUCCESS`, data)
        );
      })
      .catch((err) => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
      });
  }
  async getMinions(req, res) {
    await saltService
      .getMinionns()
      .then(async (data) => {
        console.log("DATA" + data[0]);
      
      const filter = data.forEach(key => {
          console.log("Key "+ key);
      })
        responeInstance.success200(
          res,
          jsonInstance.toJsonWithData(`SUCCESS`, data[0])
        );
        // for (let i = 0; i < data.length; i++)
        //   {
        //       const element = data[0][i];
        //       console.log("element " + data[0][i].dns);

        //   }
      })
      .catch((err) => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
      });
  }
  async funcKeys(req, res) {
    var respone = {
      fun: req.body.fun,
      client: req.body.client,
      match: req.body.match,
    };
    if (respone.client && respone.match && respone.fun) {
      await saltService
        .funcKeys(respone.fun, respone.client, respone.match)
        .then((data) => {
          responeInstance.success200(
            res,
            jsonInstance.toJsonWithData(`KEYS SUCCESS`, data)
          );
        })
        .catch((err) => {
          responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
        });
    }
  }
  //GET
  async history(req, res) {
    await saltService
      .getHistory()
      .then((data) => {
        responeInstance.success200(
          res,
          jsonInstance.toJsonWithData(`HISTORY SUCCESS`, data)
        );
      })
      .catch((err) => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
      });
  }
  //GET
  async detailHistory(req, res) {
    let jid = req.params.jid;
    console.log("jid " + jid);
    const result = await saltService.getDetailHistory(jid);
    if (result == null) {
      responeInstance.error400(res, jsonInstance.jsonNoData(`get error`));
    } else {
      responeInstance.success200(
        res,
        jsonInstance.toJsonWithData(`Get Detail History Successfully`, result)
      );
    }
  }
  //POST
  async sendFile(req, res) {
    var respone = {
      host: req.body.host,
      username: req.body.username,
      password: req.body.password,
      destination: req.body.destination
    };
       const errors = validationResult(req);
    if (!errors.isEmpty()) {
      responeInstance.error422(
        res,
        jsonInstance.jsonNoData({ errors: errors.array() })
      );
      return;
    }
    await saltService
      .sendFile(respone.host, respone.username,respone.password,respone.destination)
      .then((file) => {
        console.log(file);
        responeInstance.success200(
          res,
          jsonInstance.toJsonWithData(`ADD SUCCCESS!`, file)
        );
      })
      .catch((err) => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
      });
  }
  async execute(req, res){
    var respone = {
      host: req.body.host,
      username: req.body.username,
      password: req.body.password
    };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      responeInstance.error422(
        res,
        jsonInstance.jsonNoData({ errors: errors.array() })
      );
      return;
    }
    await saltService.sendFile()
  }
}
// await saltService.sendFile(response.host, response.username, response.password)
//   .then((file) => {
//       if (file != null){
        
//       }
//   })
    
// .executeFile(respone.host, respone.username,respone.password)
// .then((file) => {
//   console.log(file);
//   responeInstance.success200(
//     res,
//     jsonInstance.toJsonWithData(`ADD SUCCCESS!`, file)
//   );
// })
// .catch((err) => {
//   responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
// });

module.exports = new SaltStackController();
