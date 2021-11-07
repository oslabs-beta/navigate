
const parser = require("./parser");
const parseSchedulerInformation = require("./logAggregator");
const parseDeploymentInformation = require("./parseDeployment");
const parsePodInformation = require("./parsePods")
const {aggregateLogs, YAMLData} = require('./GetLiveData/getKubernetesData');


const databaseController = {};

databaseController.getLiveData = (req, res, next) => {
  try {
    if(res.locals.live){
      const data = parser.getJSONFiles();
      const parsedData = parseSchedulerInformation(data);
      res.locals.pollingData = parsedData;
      return next();
    }
    else return next();
  } catch (error) {
    console.log('Error inside databaseController.getLiveData: ', error);
    return next();
  }
}

databaseController.getLiveDeploymentData = (req, res, next) => {
  try {
    if(res.locals.live){
      const data = parser.getJSONFiles();
      const parsedData = parseDeploymentInformation(data);
      res.locals.podDeployData = parsedData;
      return next();
    }
    else return next();
  } catch (error) {
    console.log('Error inside databaseController.getLiveDeploymentData: ', error);
    return next();
  }
}

databaseController.getLivePodData = (req, res, next) => {
  try {
    if(res.locals.live){
      const data = parser.getJSONFiles();
      const parsedData = parsePodInformation(data);
      res.locals.podDeployData = parsedData;
      return next();
    }
    else return next();
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
    if(res.locals.live){
      await aggregateLogs();
      return next();
    }
    else
    {
      return next();
    }
  } catch (error) {
    console.log('Error in databaseController.uploadFiles: ',  error)
    return next();
  }
}

databaseController.updateFiles = (req, res, next) => {
  try {
    if(res.locals.live)
    {
      aggregateLogs();
    }
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

<<<<<<< HEAD:server/databaseController.ts
databaseController.checkLive = async function(req: Request, res: Response, next: NextFunction) {
  //checkLive() is 'kubectl' so this will only throw an error if kubernetes is not running. 
  //If this is the case, don't try to get live logs
  await checkClusterLive((err: Error, result: any) => {
    res.locals.live = !err;
    next();
  });
}

export default databaseController;
=======
module.exports = databaseController;
>>>>>>> 3ccc3cb750ecb7045e1342e11497cc827726a7a0:server/databaseController.js
