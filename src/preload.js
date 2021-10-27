const {spawn} = require('child_process');
// var {execFile} = require('child_process').exec, child;
const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {

    runCommand = async (cmd) => {
      // if (process.env.NODE_ENV === 'production') {
      //   const fixPath = require('fix-path');
      
      //   fixPath();
      // import {shellPath} from 'shell-path';
      console.log(process.env.SHELL);
      console.log(process.env.PATH);
      //=> '/usr/bin'
      // console.log(await shellPath());
      //=> '/usr/local/bin:/usr/bin:...'
      execFile(cmd, function (error, stdout, stderr) {
          if(process.env.NODE_ENV !== 'test')
          {
              console.log(stdout);
              if(stderr)
              console.log('stderr: ' + stderr);
              if (error !== null) {
                   console.log('exec error: ' + error);
              }
          }
      });
  }
  const serverFile = path.join(__dirname, '../server/server.ts')
  // const serverFile = `${process.env.PWD}/server/server.ts`
  console.log(__dirname)
  runCommand(`npx ts-node ${serverFile}`)
  
  })
