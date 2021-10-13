const getYAMLData = require('../yamlParser');
const exportObj = require('../runCommand');
const fs = require('fs');
const path = require('path');

const deployments = getElements('Deployment');
const namespaces = getElements('Namespace');

function getElements(kind) {
  try
  {
    const data = getYAMLData();
    const output = [];
    data.forEach(k8sObject => {        
      if(k8sObject[0].kind === kind) output.push(k8sObject);
    });
    fs.writeFile(path.join(__dirname, `../../navigate_logs/${kind}.json`), JSON.stringify(output, null, 2), { flag: 'w' }, function(err) {
      if (err) 
        return console.error(err); 
  });
    return output;
  }
  catch(error) {
    return error;
  }
}

function parsePodNames (filePath = path.join(__dirname, `../navigate_logs/${exportObj.fileName}`)) {
  try{
      fs.readFile(filePath, 'utf-8', (err, result) => {
          return result.split(' ');
      });
  }
  catch(error) {
      console.log(error);
      return error;
  }
}

function getAllPods(cmd, namespace) {
  exportObj.runCommand(`${cmd} -n ${namespace} &> ../navigate_logs/${exportObj.fileName}`);
}

module.exports = {
  getAllPods,
  parsePodNames,
  getElements
}