const parser = require('./parser');
const exportObj = require('../runCommand');
const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, `../../navigate_logs/`);

//object of the default namespaces that come with every k8s cluster; we want to ignore these
const listOfDefaultNamespaces = {
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
    //if it is not a default namespace, skip it
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

async function aggregateLogs()
{
  const pods = await parsePodNames();
  const podArray = pods.split(' ');
  const namespaceMap = getNamespaceDeploymentPairs();
  const keys = Object.keys(namespaceMap);
  let index = 1;
  // get deployment logs
  for(let i = 0; i < keys.length; i++){
    for(let j = 0; j < namespaceMap[keys[i]].length; j++){
      let filePath = path.join(__dirname, `../../navigate_logs/deployment${index}.json`);
      try
      {
        await exportObj.runCommand(`kubectl get deployment ${namespaceMap[keys[i]][j]} --namespace=${keys[i]} -o json &> ${filePath}`);
      }
      catch(error){
        console.log(error);
      }
      index++;
    }
  }
  index = 1;
  // gets updated pods object (with  status  from kubernetes) updated  yaml file config with live kubernetes data
  //TODO: map pod to namespace, do for every pod in every namespace
  let filePath;
  for(let i = 0; i < podArray.length; i++){
    filePath = path.join(__dirname, `../../navigate_logs/pod${index}.json`);
    try{
      await exportObj.runCommand(`kubectl get pod ${podArray[i]} --namespace=default -o json &> ${filePath}`);
    }
    catch(error){
      console.log(error);
    }
    index++;
  }
} 

//"default" is hardcoded for the google k8s demo, change later to dynamically call for each namespace using getElementsOfKind("Namespace")
// getAllPods('kubectl get pods -o=jsonpath=\'{.items[*].metadata.name}\'');
aggregateLogs();

function getAllPods(cmd, namespace = "default") {
  exportObj.runCommand(`${cmd} -n ${namespace} &> ${path.join(__dirname, `../../navigate_logs/${exportObj.fileName}`)}`);
}

module.exports = {
  getAllPods,
  parsePodNames,
  getElementsOfKind,
  getNamespaceDeploymentPairs
}