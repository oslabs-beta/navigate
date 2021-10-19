const parser = require('./parser');
const exportObj = require('../runCommand');
const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, `../../navigate_logs/`);

//object of the default namespaces that come with every k8s cluster; we want to ignore these
const listOfDefaultNamespaces = {
  "default" : '',
  "kube-node-lease": '',
  "kube-public": '',
  "kube-system": ''
}

function getElementsOfKind(kind, writeToDisk = true) {
  try
  {
    const data = parser.getYAMLFiles();
    const output = [];
    data.forEach(k8sObject => {        
      if(k8sObject[0].kind === kind) output.push(k8sObject);
    });
    if(writeToDisk)
      fs.writeFile(path.join(logPath, `/${kind}.json`), JSON.stringify(output, null, 2), { flag: 'w' }, function(err) {
        if (err) 
          return console.error(err); 
  });
    return output;
  }
  catch(error) {
    return error;
  }
}

function getNamespaceDeploymentPairs(){
  const output = {};
  let deployments = getElementsOfKind("Deployment");
  deployments.forEach(ele => {
    if(!Object.keys(listOfDefaultNamespaces).includes(ele[0].metadata.namespace)){
      if(output[ele[0].metadata.namespace]) output[ele[0].metadata.namespace].push(ele[0].metadata.name);
      else output[ele[0].metadata.namespace] = [ele[0].metadata.name];
    }
  })
  return output;
}

// kubectl get pods -o=jsonpath='{.items[*].metadata.name}
async function parsePodNames (filePath = path.join(__dirname, `../../navigate_logs/${exportObj.fileName}`)) {
  const result = await fs.promises.readFile(filePath, 'utf-8', (error, result) => {
    if(error){
      console.log(error);
    }
  })
  return result;
}

async function getPodDetails()
{
  const pods = await parsePodNames();
  const namespaceMap = getNamespaceDeploymentPairs();
}

// kubectl get pods mafia-backend-6d5d7c9b8f-crfmr --namespace=mafia -o json
// gets updated pods object (with  status  from kubernetes) updated  yaml file config with  live kubernetes data

// kubectl describe pods mafia-backend-6d5d7c9b8f-crfmr --namespace=mafia
// has events, config map name, volumes, conditions, environment, container, start time, Ports, state, restart count, IP  addresses

function getAllPods(cmd, namespace) {
  exportObj.runCommand(`${cmd} -n ${namespace} &> ../navigate_logs/${exportObj.fileName}`);
}

module.exports = {
  getAllPods,
  parsePodNames,
  getElementsOfKind,
  getNamespaceDeploymentPairs
}