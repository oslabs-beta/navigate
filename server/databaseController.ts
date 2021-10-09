import * as fs from "fs";
import getYAMLData from "./yamlParser";

interface someObject {
    [key: string]: any
}

const databaseController: someObject = {};

databaseController.getData = (req: any, res: any, next: any) => {
  const data = getYAMLData();
  res.locals.data = data;
  console.log('data[0]', data[0])
  return next();
}

export default databaseController;