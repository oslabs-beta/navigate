// preload.js
// const child_process = require('child_process');
const { Children } = require('react');
const { isRegExp } = require('util/types');

const {spawn} = require('child_process');
const { runCommand } = require('../server/runCommand');
var exec = require('child_process').exec, child;
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }

  //   function runScript(scriptPath, callback) {

  //     // keep track of whether callback has been invoked to prevent multiple invocations
  //     var invoked = false;
  
  //     var process = childProcess.fork(scriptPath);
  
  //     // listen for errors as they may prevent the exit event from firing
  //     process.on('error', function (err) {
  //         if (invoked) return;
  //         invoked = true;
  //         callback(err);
  //     });
  
  //     // execute the callback once the process has finished running
  //     process.on('exit', function (code) {
  //         if (invoked) return;
  //         invoked = true;
  //         var err = code === 0 ? null : new Error('exit code ' + code);
  //         callback(err);
  //     });
  
  // }
  
  // // Now we can run a script and invoke a callback when complete, e.g.
  // // runScript("ts-node ./server/server.ts", function (err) {
  // //     if (err) throw err;
  // //     console.log('finished running server.ts');
  // // });

  // child_process.spawn('ts-node ./server/server.ts', (error, stdout, stderr) => {
  //   if (error) {
  //     throw error;
  //   }
  //   console.log(stdout);
  // });

  // child();
  // childProcess.exec("ts-node ./server/server.ts", (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`exec error: ${error}`);
  //     return;
  //   }
  //   console.log(`stdout: ${stdout}`);
  //   console.error(`stderr: ${stderr}`);
  // })

  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  })