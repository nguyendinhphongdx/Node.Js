const deviceTypeModel = require("../models/DeviceType");
const saltApi = require("../helpers/saltApi");
const axios = require("axios");
const Constants = require("../config/Constants");
let Client = require("ssh2-sftp-client");
let sftp = new Client();
var Client2 = require("ssh2").Client;
class SaltStackService {
  //POST
  async func(fun, tgt) {
    let arg = false;
    let kwarg = false;
    let client = "local";
    let pillar = false;
    let timeout = false;
    const token = await saltApi.initToken();
    let form = { tgt, fun, client };
    if (arg) form.arg = arg;
    if (kwarg) form.kwarg = kwarg;
    if (pillar) form.pillar = pillar;
    if (timeout) form.timeout = timeout;
    console.log("Form" + JSON.stringify(form));
    try {
      const res = await axios.post(Constants.BASE_URL, form, {
        headers: { "X-Auth-Token": token },
        contentType: "application/json",
      });
      return res.data.return[0];
    } catch (error) {
      console.log("error Service" + error.message);
    }
  }
  //POST
  async fullargs(fun, tgt, kwarg) {
    let arg = false;
    let client = "local";
    let pillar = false;
    let timeout = false;
    const token = await saltApi.initToken();
    let form = { tgt, fun, client, kwarg };
    if (arg) form.arg = arg;
    if (kwarg) form.kwarg = kwarg;
    if (pillar) form.pillar = pillar;
    if (timeout) form.timeout = timeout;
    console.log("Form" + JSON.stringify(form));
    try {
      const res = await axios.post(URL, form, {
        headers: { "X-Auth-Token": token },
        contentType: "application/json",
      });
      return res.data.return[0];
    } catch (error) {
      console.log("error Service" + error.message);
    }
  }
  async getKeyNameDevice(deviceName) {
    const token = await saltApi.initToken();
    try {
      const res = await axios.get(`${Constants.BASE_URL}/keys/${deviceName}`, {
        headers: { "X-Auth-Token": token },
        contentType: "application/json",
      });
      console.log(res.data.return.minions.name);
      return res.data.return.minions;
    } catch (error) {
      console.log("error Service" + error.message);
    }
  }
  //POST
  async getMinionns() {
    const token = await saltApi.initToken();
    let data = [];
    try {
      const res = await axios.get(`${Constants.BASE_URL}/minions`, {
        headers: { "X-Auth-Token": token },
        contentType: "application/json",
      });
      return Object.entries(res.data.return[0]);
    } catch (error) {
      console.log("error Service" + error.message);
    }
  }
  //POST
  async funcKeys(fun, client, match) {
    const token = await saltApi.initToken();
    let form = { fun, client, match };
    if (fun) form.fun = fun;
    if (client) form.client = client;
    if (match) form.match = match;
    console.log("Form" + JSON.stringify(form));
    try {
      const res = await axios.post(`${Constants.BASE_URL}`, form, {
        headers: { "X-Auth-Token": token },
        contentType: "application/json",
      });
      return res.data.return[0];
    } catch (error) {
      console.log("error Service" + error.message);
    }
  }
  //GET
  async getHistory() {
    const token = await saltApi.initToken();
    try {
      const res = await axios.get(`${Constants.BASE_URL}/jobs`, {
        headers: { "X-Auth-Token": token },
        contentType: "application/json",
      });
      return res.data.return[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getDetailHistory(jid) {
    const token = await saltApi.initToken();
    if (token == null) {
      throw new Error("Invalid Token");
    }
    try {
      const res = await axios.get(`${Constants.BASE_URL}/jobs/${jid}`, {
        headers: { "X-Auth-Token": token },
        contentType: "application/json",
      });
      return res.data.info[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async sendFile(host, username, password, destination) {
    const config = {
      host: host,
      port: 22,
      username: username,
      password: password,
    };
    const path = `${process.cwd()}/public/config`;
    try {
      await sftp.connect(config);
      sftp.on("upload", (info) => {
        console.log(`Listener: Uploaded ${info.source}`);
      });
      let rslt = await sftp.uploadDir(path, destination);
      return rslt;
    } finally {
      sftp.end();
    }
  }

  async executeFile(host, username, password) {
    const config = {
      host: host,
      port: 22,
      username: username,
      password: password
    };
<<<<<<< HEAD
  console.log(config);
  var conn = new Client2();
  const encode = 'utf8';
  return new Promise((resolve, reject) => {
    conn.on('error', function (err) {
      console.log('hello error',err)
      reject(err);
    });
    conn.on('ready',function(){
      let password = config.password;
=======
    var conn = new Client2();
  const encode = 'utf8';
  conn.on('ready', function(){

      let password = password;
>>>>>>> c04c7d3ea1a5c797aafb46682c4a10becf01ed55
      let command = '';
      let pwSent = false;
      let su = false;
      let commands = [
        `sudo su`,
<<<<<<< HEAD
        password,
        `sh exec.sh`, 
      ];
      conn.shell((err, stream) => {
        console.log('in shelling ....');
=======
        `123456a@A!@#$`,
        `sh test.sh`
      ];

      conn.shell((err, stream) => {
>>>>>>> c04c7d3ea1a5c797aafb46682c4a10becf01ed55
          if (err) {
            console.log('error in ready',err.message);
            conn.end();
            reject('failed');
          }
          stream.on('exit', function (code) {
            process.stdout.write('Connection :: exit');
            console.log(code);
            resolve('success');
            conn.end();
            stream.end()
          });
          stream.on('data', function(data) {
            process.stdout.write(data.toString(encode));
<<<<<<< HEAD
            if(data.toString(encode)==200){
              console.log('Execute success');
            }else if(data.toString(encode)==400){
              console.log('Execute failed');
            }
=======
           
>>>>>>> c04c7d3ea1a5c797aafb46682c4a10becf01ed55
            // handle su password prompt
            if (command.indexOf('su') !== -1 && !pwSent) {
               /*
               * if su has been sent a data event is triggered but the
               * first event is not the password prompt, this will ignore the
               * first event and only respond when the prompt is asking
               * for the password
               */
               if (command.indexOf('su') > -1) {
                  su = true;
               }
               if (data.indexOf(':') >= data.length - 2) {
                  pwSent = true;
                  stream.write(password + '\n');
               }
            } else {
              // detect the right condition to send the next command
              let dataLength = data.length > 2;
              let commonCommand = data.indexOf('$') >= data.length - 2;
              let suCommand = data.indexOf('#') >= data.length - 2;
      
              if (dataLength && (commonCommand || suCommand )) {
      
                if (commands.length > 0) {
                  command = commands.shift();
                   stream.write(command + '\n');
                   
                } else {
                  // su requires two exit commands to close the session
                  if (su) {
                     su = false;
                     stream.write('exit\n');
                  } else {
                     stream.end('exit\n');
                  }
                }
              }
            }
          });

      
      command = commands.shift();
      stream.write(command + '\n');
      });        
<<<<<<< HEAD
=======
  }).connect(config)
>>>>>>> c04c7d3ea1a5c797aafb46682c4a10becf01ed55
  }
  )
  .connect(config)
  })
}
}
module.exports = new SaltStackService();
