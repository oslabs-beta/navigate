import * as fs from "fs";
import {Request, Response, NextFunction} from 'express';
import getYAMLData from "./yamlParser";

interface someObject {
    [key: string]: any
}

const databaseController: someObject = {};

databaseController.getData = (req: Request, res: Response, next: NextFunction) => {
  const data = getYAMLData();
  res.locals.data = data;
  return next();
}

databaseController.getLiveData = (req: Request, res: Response, next: NextFunction) => {
  console.log('live dataaa');
  try {
    res.locals.pollingData = [
        {
            "CAMIS": "41721164",
            "DBA": "SOFIA'S PIZZA",
            "BORO": "Queens",
            "STREET": "LINDEN BOULEVARD",
            "ZIPCODE": "11420",
            "PHONE": "7188456250",
            "CUISINE": "Pizza",
            "Latitude": "40.67722064",
            "Longitude": "-73.82559725",
            "NTA": "QN55",
            "Open": "-6.319601417",
            "Close": "12",
            "LatDiff": "0.00168734",
            "LongDiff": "0.00063185",
            "Current Long": "-73.8249654",
            "Current Lat": "40.6755333",
            "distanceBetweenInMiles": 0.12122013267848987,
            "displayThisTime": "8:30 PM"
        },
        {
            "CAMIS": "41696474",
            "DBA": "KAT'S ISLAND CUISINE",
            "BORO": "Queens",
            "STREET": "LINDEN BOULEVARD",
            "ZIPCODE": "11420",
            "PHONE": "7188484209",
            "CUISINE": "Caribbean",
            "Latitude": "40.67722338",
            "Longitude": "-73.82559364",
            "NTA": "QN55",
            "Open": "-7.340346747",
            "Close": "9",
            "LatDiff": "0.00169008",
            "LongDiff": "0.00062824",
            "Current Long": "-73.8249654",
            "Current Lat": "40.6755333",
            "distanceBetweenInMiles": 0.12135082081614067,
            "displayThisTime": "9:00 PM"
        },
  ];
    return next();

  } catch (error) {
    console.log('Error inside databaseController.getLiveData: ', error);
    return next();
  }
}

export default databaseController;