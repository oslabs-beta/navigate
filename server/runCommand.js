const {spawn} = require('child_process');
var exec = require('child_process').exec, child;
const fs = require('fs');
const path = require('path');

exportObj = {};

//default command
exportObj.command = `kubectl get pods -o=jsonpath='{.items[*].metadata.name}'`;
exportObj.fileName = 'podNames.txt'

exportObj.runCommand = (cmd) => {
    exec(cmd, function (error, stdout, stderr) {
        if(process.env.NODE_ENV !== 'test')
        {
            console.log(stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                 console.log('exec error: ' + error);
            }
        }
    });
}

module.exports = exportObj;