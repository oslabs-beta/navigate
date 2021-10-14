const getYAMLData = require('./yamlParser');
const exportObj = require('../runCommand');
const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, `../../navigate_logs/`);

//object of the default namespaces that come with every k8s cluster; we want to ignore these
const defaultNamespaceMap = {
  "default" : '',
  "kube-node-lease": '',
  "kube-public": '',
  "kube-system": ''
}

function getElementsOfKind(kind) {
  try
  {
    const data = getYAMLData();
    const output = [];
    data.forEach(k8sObject => {        
      if(k8sObject[0].kind === kind) output.push(k8sObject);
    });
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

function parseNamespaces() {
  const namespaces = [];
  let deployments = getElementsOfKind("Deployment");
  deployments.forEach(ele => {
    if(!Object.keys(defaultNamespaceMap).includes(ele[0].namespace))
    {
      namespaces.push(ele[0]);
    }
  });
  return namespaces;
}

async function parsePodNames (filePath = path.join(__dirname, `../../navigate_logs/${exportObj.fileName}`)) {
  const result = await fs.promises.readFile(filePath, 'utf-8', (error, result) => {
    if(error){
      console.log(error);
    }
  })
  return result;
}


// pod name, deployment object connected to pod, namespace of pod
/*
specs-> containers->:
dnsPolicy
nodeName
restartPolicy
schedulerName
volume.name
status.conditions
status.containerStatuses

Node
Start time
Labels
Status
IP
Controlled  By
Containers
Conditions
Volumes
Events
metadata.labels.name
*/
async function getPodDetails(){
  const pods = await parsePodNames();
  const namespaces = parseNamespaces();
  console.log(pods);
  console.log(namespaces);
}

// getPodDetails();

// kubectl get pods mafia-backend-6d5d7c9b8f-crfmr --namespace=mafia -o json
// gets updated pods object (with  status  from kubernetes) updated  yaml file config with  live kubernetes data

// kubectl describe pods mafia-backend-6d5d7c9b8f-crfmr --namespace=mafia
// has events, config map name, volumes, conditions, environment, container, start time, Ports, state, restart count, IP  addresses

// kubectl get pods -o=jsonpath='{.items[*].metadata.name}

function getAllPods(cmd, namespace) {
  exportObj.runCommand(`${cmd} -n ${namespace} &> ../navigate_logs/${exportObj.fileName}`);
}

module.exports = {
  getAllPods,
  parsePodNames,
  getElementsOfKind,
  parseNamespaces
}