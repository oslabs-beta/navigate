var exec = require('child_process').exec, child;
const fs = require('fs');
const path = require('path');

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    const serverFile = path.join(__dirname, '../server/server.ts')

    runCommand = async (cmd) => {
      console.log(process.env.SHELL);
      await exec(cmd, function (error, stdout, stderr) {
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

  runCommand(`npx ts-node ${serverFile}`)
  
  })
