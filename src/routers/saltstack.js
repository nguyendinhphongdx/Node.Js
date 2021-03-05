const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require("multer");
const saltrouter = require('../app/controllers/SaltStackController');
const verifyToken = require("../app/helpers/tokenCheker");
// const { exec } = require('child_process');
let Client = require('ssh2-sftp-client');
let execFile = require('child_process').execFile
var client = require('scp2')
var fs = require("fs");
var exec = require('child_process').exec;
var conn = new Client();
router.post('/netapi',verifyToken,saltrouter.func);
router.post('/netapi/kwarg',saltrouter.fullargs);
router.get('/keys/:device',saltrouter.getKeyNameDevice);
router.get('/minions',saltrouter.getMinions);
router.post('/keys/all',saltrouter.funcKeys)

// router.get('/ssh',function(req, res){
//     var conn = new Client();
//     conn.on('ready', function() {
//       console.log('Client :: ready');
      

//       conn.exec('setup.sh', function(err, stream) {
//         if (err) throw err;
//         stream.on('uptime', function(code, signal) {
//           console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
//           conn.end();
//         }).on('data', function(data) {
//             stream.write('ls -a\n');
//             stream.write('uptime\n');
//             stream.write('su\n'); // here nothing seems to happen
//             stream.write('123456a@A!@#$\n'); // here also
//             stream.write('cd /tmp && ls\n');
//           console.log('STDOUT: ' + data);
//         }).stderr.on('data', function(data) {
//           console.log('STDERR: ' + data);
//         });
//       });
//     }).connect({
//         host: '10.2.65.38',
//         port: 22,
//         username: 'minions2',
//         password: '123456a@A!@#$'
//       });
    
// })
// function runCommands(array, callback) {
//     var index = 0;
//     var results = [];

//     function next() {
//        if (index < array.length) {
//            exec(array[index++], function(err, stdout) {
//                if (err) return callback(err);
//                // do the next iteration
//                results.push(stdout);
//                next();
//            });
//        } else {
//            // all done here
//            callback(null, results);
//        }
//     }
//     // start the first iteration
//     next();
//     console.log(next());
// }

// router.get('/sftp',function(req, res){
//     let sftp = new Client;

//     const fileName = req.body.file_name;

//     const remotePath = '/home/minions2' + fileName;

//     const localePath = path.join(process.env.HOME || process.env.USERPROFILE, 'Downloads/' + fileName);
//     const config = {
//         host: '10.2.65.34',
//         port: 22,
//         username: 'master',
//         password: '123456a@A!@#$'
//       };
//       sftp.connect(config)
//       .then(() => {
//         return sftp.exists('/');
//       })
//       .then(data => {
//         console.log("data " + data);          // will be false or d, -, l (dir, file or link)
//       })
//       .then(() => {
//         sftp.end();
//       })
//       .catch(err => {
//         console.error(err.message);
//       });
//     })

router.get('/copy',function(req, res) {
  // let sftp = new Client();
  let client = new Client();
  const config = {
    host: '10.2.65.38',
    port: 22,
    username: 'minions2',
    password: '123456a@A!@#$'
  };
  
  // let data = fs.createReadStream('F:/file.txt.txt');
  let remotePath = '/home/minions2/minion';

  // console.log(data);
  let remote = '/home/';
  client.connect(config)
  .then(() => {
    // return client.append(Buffer.from('Hello world'), remotePath);
    fs.open('/test', 'w+', function(err, data) {
      if (err) {
          console.log("ERROR !! " + err);
      } else {
          fs.write(data, 'content', 0, 'content length', null, function(err) {
              if (err)
                  console.log("ERROR !! " + err);
              fs.close(data, function() {
                  console.log('written success');
              })
          });
      }
  });
  //   fs.writeFile("/home/minions2/file.txt",'w+', function(err) {
  //     if(err) {
  //         return console.log(err);
  //     }
  //     console.log("The file was saved!");
  //     // return res.json(res)
  // });
  })
  .then(() => {
    return client.end();
  })
  .catch(err => {
    console.error(err.message);
  });
})
router.get('/getFile',function(req, res){
  let remoteDir = '/home/minions2/test.txt';
  const config = {
    host: '10.2.65.38',
    port: 22,
    username: 'minions2',
    password: '123456a@A!@#$'
  };
  
  let sftp = new Client;
  
  let client = new Client();

  client.connect(config)
    .then(() => {
      return client.mkdir(remoteDir, true);
    })
    .then(() => {
      return client.end();
    })
    .catch(err => {
      console.error(err.message);
    });
})
function statPath(path) {
  try {
    return fs.statSync(path);
  } catch (ex) {}
  return false;
}

module.exports = router;