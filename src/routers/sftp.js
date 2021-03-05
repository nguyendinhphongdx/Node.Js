const express = require("express");
const router = express.Router();
let Client = require('ssh2-sftp-client');
let sftp = new Client();
var Client2 = require('ssh2').Client;
const fs = require('fs');
const config = {
  host: '10.2.65.38',
  port: 22,
  username: 'minions2',
  password: '123456a@A!@#$'
  }

  
router.get('/connect',function(req, res){
    var conn = new Client2();
    conn.on('ready', function() {
      console.log('Client :: ready');
    
      conn.exec('ls', function(err, stream) {
        if (err) throw err;
        stream.on('uptime', function(code, signal) {
          console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
          conn.end();
        }).on('data', function(data) {
            res.json(data)
          console.log('STDOUT: ' + data);
        }).stderr.on('data', function(data) {
          console.log('STDERR: ' + data);
        });
      });
    }).connect({
        host: '10.2.65.38',
        port: 22,
        username: 'minions2',
        password: '123456a@A!@#$'
      });
    
})
router.get('/list',function(req, res){
sftp.connect(config).then(() => {
  return sftp.list('/home/minions2');
}).then(data => {
  console.log(data, 'the data info');
  res.status(200).json(data);
}).catch(err => {
  console.log(err, 'catch error');
});
})
router.get('/exists',function(req, res){
    sftp.connect(config).then(() => {
      return sftp.exists('/home/minions2');
    }).then(data => {
      console.log(data, 'the data info');
      res.status(200).json(data);
    }).catch(err => {
      console.log(err, 'catch error');
    });
})
router.get('/stat',function(req, res){ 
    sftp.connect(config).then(() => {
      return sftp.stat('/home/minions2');
    }).then(data => {
      console.log(data, 'the data info');
      res.status(200).json(data);
    }).catch(err => {
      console.log(err, 'catch error');
    });
})
// router.get('/')
// {
//     "mode": 16877,
//     "uid": 1000,
//     "gid": 1000,
//     "size": 4096,
//     "accessTime": 1614841637000,
//     "modifyTime": 1614838830000,
//     "isDirectory": true,
//     "isFile": false,
//     "isBlockDevice": false,
//     "isCharacterDevice": false,
//     "isSymbolicLink": false,
//     "isFIFO": false,
//     "isSocket": false
// }
router.get('/get',function(req, res){ 
    const options = {
        flags: 'a',  // w - write and a - append
        encoding: null, // use null for binary files
        mode: 0o666, // mode to use for created file (rwx)
        autoClose: true // automatically close the write stream when finished
      }
    sftp.connect(config).then(() => {
        sftp.chmod('/home', 0o644)
        let remote = '/home/minions2/file.txt';
        sftp.fastGet('public/tessttt.zip',remote)
    }).then((data) => {
      console.log('the data info',data);
      sftp.end();
      res.json(data)
    }).catch(err => {
        console.log('error', err);
      console.log(err, 'catch error');
    })
    .finally(()=>{
        sftp.end();
    })
})
router.get('/append',function(req, res){ 
    const options = {
        flags: 'a',  // w - write and a - append
        encoding: null, // use null for binary files
        mode: 0o666, // mode to use for created file (rwx)
        autoClose: true // automatically close the write stream when finished
      }
    sftp.connect(config).then(() => {
        return sftp.append(Buffer.from('Hello world'), '/home/master/total/testPut1.sls');
    }).then((data) => {
      console.log(data, 'the data info');
      res.json(data)
      sftp.end();
    }).catch(err => {
        console.log('error', err);
      console.log(err, 'catch error');
    });
})
router.get('/upload',function(req, res){ 
    const path = `${process.cwd()}/public/config`;
    console.log(fs.existsSync(path));
    let remotePath = path;
    sftp.connect(config).then(() => {
        return sftp.uploadDir(path,'/home/minions2')
    }).then((data) => {
      console.log(data, 'the data info');
      sftp.end();
      res.json('uploaded')
    }).catch(err => {
        console.log('error', err);
      console.log(err, 'catch error');
    });
})
router.get('/fastput',function(req, res){ 
  const path = `${process.cwd()}/public/testPut.sls`;
  // const exact =`/upload/testPut.txt`
  const exact = `/public/testPut.sls`
  console.log(fs.existsSync(path));
  sftp.connect(config).then(() => {
      return sftp.fastPut(exact,'/home/uploadFromMaster')
  }).then((data) => {
    console.log(data, 'the data info');
    
  }).catch(err => {
    res.json(err.message)
  })
  .finally(()=>{
    res.json('finished')
    sftp.end();
  })
})

router.get('/root',function(req, res){
  var conn = new Client2();
    const encode = 'utf8';
    conn.on('ready', function() {
        // avoid the use of console.log due to it adds a new line at the end of
        // the message
        process.stdout.write('Connection :: ready');
      
        let password = '123456a@A!@#$';
        let command = '';
        let pwSent = false;
        let su = false;
        let commands = [
          `ls`,
          `sudo su`,
          `123456a@A!@#$`,
          // `sh install-minion.sh`,
          // `ifconfig`,
          // `sh setup.sh`  
        ];
      
        conn.shell((err, stream) => {
          if (err) {
            console.log(err);
          }
      
          stream.on('exit', function (code) {
            process.stdout.write('Connection :: exit');
            conn.end();
          });
      
          stream.on('data', function(data) {

            process.stdout.write(data.toString(encode));
      
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
      
          // first command
          command = commands.shift();
          stream.write(command + '\n');
        });
      }).connect({
      host: '10.2.65.38',
      port: 22,
      username: 'minions2',
      password: '123456a@A!@#$'
      
    });
})

module.exports = router;