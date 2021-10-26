import * as fs from "fs";
import {Request, Response, NextFunction} from 'express';
import parser from "./parser";
import parseSchedulerInformation from "./logAggregator";
import parseDeploymentInformation from "./parseDeployment";
import parsePodInformation from "./parsePods"
import  {aggregateLogs} from './GetLiveData/getKubernetesData'

interface someObject {
    [key: string]: any
}

const databaseController: someObject = {};

databaseController.getData = (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = parser.getYAMLFiles();
    res.locals.data = data;
  return next();
  } catch (error) {
    console.log('Error in databaseController.getData: ', error)
  }
}

databaseController.getLiveData = (req: Request, res: Response, next: NextFunction) => {
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

databaseController.getLiveDeploymentData = (req: Request, res: Response, next: NextFunction) => {
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

databaseController.getLivePodData = (req: Request, res: Response, next: NextFunction) => {
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

databaseController.updateFiles = (req: Request, res: Response, next: NextFunction) => {
  try {
    aggregateLogs();
    return next();
  } catch (error) {
    console.log('Error in databaseController.updateFiles: ',  error)
  }
}


databaseController.parsePOST = (req: Request, res: Response, next: NextFunction) => {
  try {
    const output: object[] = [];
    req.body.forEach((ele: string) => {
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