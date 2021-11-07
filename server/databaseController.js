
const parser = require("./parser");
const parseSchedulerInformation = require("./logAggregator");
const parseDeploymentInformation = require("./parseDeployment");
const parsePodInformation = require("./parsePods")
const {aggregateLogs, YAMLData} = require('./GetLiveData/getKubernetesData');


const databaseController = {};

databaseController.getLiveData = (req, res, next) => {
  try {
    const data = parser.getJSONFiles();
    const parsedData = parseSchedulerInformation(data);
    res.locals.pollingData = parsedData;
    return next();
  } catch (error) {
    console.log('Error inside databaseController.getLiveData: ', error);
    return next();
  }
}

databaseController.getLiveDeploymentData = (req, res, next) => {
  try {
    const data = parser.getJSONFiles();
    const parsedData = parseDeploymentInformation(data);
    res.locals.podDeployData = parsedData;
    return next();
  } catch (error) {
    console.log('Error inside databaseController.getLiveDeploymentData: ', error);
    return next();
  }
}

databaseController.getLivePodData = (req, res, next) => {
  try {
    const data = parser.getJSONFiles();
    const parsedData = parsePodInformation(data);
    res.locals.podDeployData = parsedData;
    return next();
  } catch (error) {
    console.log('Error inside databaseController.getLivePodData: ', error);
    return next();
  }
}

databaseController.uploadFiles = async (req, res, next) => {
  try {
    const output= [];
    req.body.forEach((ele) => {
      output.push(parser.readFile(ele));
    });
    res.locals.uploadedData = JSON.stringify(output);  
    YAMLData.data = output;
    await aggregateLogs();
    return next();
  } catch (error) {
    console.log('Error in databaseController.uploadFiles: ',  error)
    return next();
  }
}

databaseController.updateFiles = (req, res, next) => {
  try {
    aggregateLogs();
    return next();
  } catch (error) {
    console.log('Error in databaseController.updateFiles: ',  error)
  }
}

databaseController.parsePOST = (req, res, next) => {
  try {
    const output = [];
    req.body.forEach((ele) => {
      output.push(parser.readFile(ele));
    })
    res.locals.output = output
    return next();
  }catch(error){
      console.log('Error in databaseController.parsePOST: ', error)
      return next();
    }
}


export default databaseController;