const {spawn} = require('child_process');
var exec = require('child_process').exec, child;
const fs = require('fs');
const path = require('path');

exportObj = {};

//default command
exportObj.command = `kubectl get pods -o=jsonpath='{.items[*].metadata.name}'`;
exportObj.fileName = 'podNames.txt'
exportObj.namespace = 'mafia'

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

exportObj.getAllPods = (cmd, namespace) => {
    exportObj.runCommand(`${cmd} -n ${namespace} &> ../navigate_logs/${exportObj.fileName}`);
}

exportObj.parsePodNames = (filePath = path.join(__dirname, `../navigate_logs/${exportObj.fileName}`)) => {
    try{
        fs.readFile(filePath, 'utf-8', (err, result) => {
            return file.split(' ');
        });
    }
    catch(error) {
        console.log(error);
    }
}
exportObj.getSchedulerEvents = () => {
    
}

// kubectl get pods mafia-backend-6d5d7c9b8f-crfmr --namespace=mafia -o json
// gets updated pods object (with  status  from kubernetes) updated  yaml file config with  live kubernetes data

// kubectl describe pods mafia-backend-6d5d7c9b8f-crfmr --namespace=mafia
// has events, config map name, volumes, conditions, environment, container, start time, Ports, state, restart count, IP  addresses, controlled by

module.exports = exportObj;