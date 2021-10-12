const {spawn} = require('child_process');
var exec = require('child_process').exec, child;

exportObj = {};
// kubectl get pods -o=jsonpath='{.items[*].metadata.name}' --namespace=mafia
//default command
exportObj.command = `kubectl get pods -o=jsonpath='{.items[*].metadata.name}'`;
exportObj.fileName = 'podNames.txt'

//for testing purposes
exportObj.fullcommand = `${exportObj.command} -n mafia &> ${exportObj.fileName}`;

exportObj.runCommand = (cmd, namespace) => {
    exec(`${cmd} -n ${namespace} &> ${exportObj.fileName}`,
        function (error, stdout, stderr) {
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

exportObj.runCommand(exportObj.command, `mafia`);

module.exports = exportObj;