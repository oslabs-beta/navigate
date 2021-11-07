const parser = require('./parser');
const exportObj = require('../runCommand');
const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, `../../navigate_logs/`);

const YAMLData = {data: []};

//object of the default namespaces that come with every k8s cluster; we want to ignore these
const listOfDefaultNamespaces = {
  "kube-node-lease": '',
  "kube-public": '',
  "kube-system": ''
}

function getElementsOfKind(kind, writeToDisk = false) {
  try
  {
    const data = YAMLData.data;
    const output = [];
    data.forEach(k8sObject => {
      if(k8sObject[0].kind === kind){ 
        output.push(k8sObject);}
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

//get non-default namespaces from YAML files by pushing their metadata.namespace values into an array and returning it
function getNamespacesFromYAML(array){
  const output = {};
  array.forEach(k8sObject => {
    if(k8sObject[0].metadata !== undefined && k8sObject[0].metadata.namespace !== undefined)
    if(!output[k8sObject[0].metadata.namespace]){
      output[k8sObject[0].metadata.namespace] = '';
    }
  });
  return Object.keys(output);
}

function getNamespaceElementPairs(kind){
  const output = {};
  let elements = getElementsOfKind(kind);
  elements.forEach(element => {
    if(!element[0].metadata.namespace){
      if(!output["default"]) output["default"] = [element[0].metadata.name];
      else output["default"].push(element[0].metadata.name);
    }
    //if it is a default namespace, skip it
    else if(!Object.keys(listOfDefaultNamespaces).includes(element[0].metadata.namespace)){
      if(output[element[0].metadata.namespace]) output[element[0].metadata.namespace].push(element[0].metadata.name);
      else output[element[0].metadata.namespace] = [element[0].metadata.name];
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

/*
    1. Get namespaces via "kubectl get namespaces" command 
        a. Store namespaces into an array
            [can also get namespaces from yaml files]
    2. Get deployment names via "kubectl get deployments --namespace=<namespace>"  command
        a. Iterate through all namespaces array running above command.
        b. Store list of deployment names as an array, inside an object, where key is <namespace>
            [can also get deployment names from yaml files]

    3. Get pod names via "kubectl get pods --namespace=<namespace>" command
        a. Iterate through all namespaces array running above command.
        b. Store list of pod names as an array, inside an object, where key is <namespace>
    4. Get deployment logs via  "kubectl get deployment <deploymentname> -o json >> deployment[i].json"
    5. Get pod logs via "kubectl get pod <podName> -o json >> pod[i].json"
  */
async function aggregateLogs()
{
  //first delete any logs from past sessions if necessary
  deleteFiles('../../navigate_logs');
  //get namespace: [pods] key value pairs
  const namespaces = getNamespacesFromYAML(YAMLData.data);
  const namespacePodKVP = {};
  //overwrite existing podNames txt if it exists already for first namespace, which is always "default"
  let rawNames;
  exportObj.runAndSave(`kubectl get pods -o=jsonpath=\'{.items[*].metadata.name}\' -n "default"`,
  (err, data) => {
    if(err)
    {
      console.log("failed to get pod information: ")
      console.log(err);
    }
    rawNames = Buffer.from(data).toString('utf8');
  }).on('close', () => {
    const podArray = rawNames.split(' ');
    namespacePodKVP["default"] = podArray;
    console.log('all namespace names: ', namespaces);
    //sometimes all the pods are just in the "default" namespace, in which case this array will be empty
    if(namespaces[0])
      for(let i = 0; i < namespaces.length; i++){
        exportObj.runAndSave(`kubectl get pods -o=jsonpath=\'{.items[*].metadata.name}\' -n ${namespaces[i]}`,
          async (err, data) => {
            if(err) console.log(err);
            namespacePodKVP[namespaces[i]] = await Buffer.from(data).toString('utf8').split(' ');
            if(i === namespaces.length-1){
              console.log('namespaces and pods:', namespacePodKVP);
              getDeployments();
              getPodInfo(namespacePodKVP);
            }
        });
      }
  });
}

async function getDeployments(){
  const deploymentKVP = getNamespaceElementPairs("Deployment");
  const keys = Object.keys(deploymentKVP);
  let index = 1;
  // get deployment logs, saving them to disk using filePath + index
  for(let i = 0; i < keys.length; i++){
    for(let j = 0; j < deploymentKVP[keys[i]].length; j++){
      let filePath = path.join(__dirname, `../../navigate_logs/deployment${index}.json`);
      try
      {
        await exportObj.runCommand(`kubectl get deployment ${deploymentKVP[keys[i]][j]} --namespace=${keys[i]} -o json &> ${filePath}`);
      }
      catch(error){
        console.log(error);
      }
      index++;
    }
  }
}

// gets updated pods object (with status from kubernetes)
async function getPodInfo(namespacePodKVP){
  let filePath;
  let index = 1;
  let currentKey;
  //loop through each key (kubernetes namespace) and each value (kubernetes pods attached to namespace)
  //get log data from each pod and save to disk, overwriting if previous already exist
  for(let i = 0; i < Object.keys(namespacePodKVP).length; i++){
    currentKey = Object.keys(namespacePodKVP)[i];
    for(let j = 0; j < namespacePodKVP[currentKey].length; j++)
    {
      filePath = path.join(__dirname, `../../navigate_logs/pod${index}.json`);
      try{
        await exportObj.runCommand(`kubectl get pod ${namespacePodKVP[currentKey][j]} --namespace=${currentKey} -o json &> ${filePath}`);
      }
      catch(error){
        console.log(error);
      }
      index++;
    }
  }
}

function deleteFiles(directory){
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
    let file;
    for (let i = 0; i < files.length; i++) {
      file = files[i];
      //hardcode ignore readme
      if(file.includes('readme')) continue;
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  });
}

function checkClusterLive(callback){
  exportObj.runAndSave('kubectl', callback);
}

module.exports = {
  parsePodNames,
  getElementsOfKind,
  getNamespaceDeploymentPairs: getNamespaceElementPairs,
  aggregateLogs,
  checkClusterLive,
  deleteFiles,
  YAMLData
}