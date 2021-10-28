var exec = require('child_process').exec, child;
const fs = require('fs');
const path = require('path');

const exportObj = {};

//default command
exportObj.command = `kubectl get pods -o=jsonpath='{.items[*].metadata.name}'`;
exportObj.fileName = 'podNames.txt'

exportObj.runCommand = (cmd) => {
    exec(cmd, function (error, stdout, stderr) {
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

exportObj.runAndSave = (cmd, callback) => {
    var child_process = exec(cmd, function (err, stdout, stderr) {
      if (err && err.length > 1) {
              console.log("failed to execute");
              callback(error("InternalError", "No input or output devices found", 500));
              return;
          }else{
              if(stdout){
                callback(null,stdout); 
              }
              if(stderr){
                callback(new Error("STDERR"),stderr);
              }
    
      }  
    });
    return child_process;
}

module.exports = exportObj;