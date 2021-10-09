import getYAMLData from './yamlParser';

interface someObject {
  [key: string]: any
}

const databaseController: someObject = {};

databaseController.getData = (req: any, res: any, next: any) => {
  const data = getYAMLData();
  res.locals.data = data;
  return next();
}

export default databaseController;