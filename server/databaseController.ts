import * as fs from "fs";
import {Request, Response, NextFunction} from 'express';
import getYAMLData from "./yamlParser";

interface someObject {
    [key: string]: any
}

const databaseController: someObject = {};

databaseController.getData = (req: Request, res: Response, next: NextFunction) => {
  const data = getYAMLData();
  console.log(data);
  res.locals.data = data;
  return next();
}

databaseController.getLiveData = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.locals.pollingData = {};
    return next();
  } catch (error) {
    console.log('Error inside databaseController.getLiveData: ', error);
    return next();
  }
}

export default databaseController;