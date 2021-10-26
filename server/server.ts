import express, {Request, Response, NextFunction} from 'express';
import databaseController from './databaseController';
import path from 'path';

const app = express();
export const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, './'))); 

app.use(function (req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", 'http://localhost:8080'); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.status(200);
  next();
});

app.get("/getData", databaseController.getData, (req: Request, res: Response) => {
  return res.status(200).send(res.locals.data);
});

app.options("/upload", (req: Request, res: Response) => {
  res.status(200).send('ok')
});

app.post("/upload", databaseController.uploadFiles, (req: Request, res: Response) => {
  return res.status(200).send(res.locals.uploadedData);
});

app.get("/statusConditions", databaseController.getLiveData, (req: Request, res: Response) => {
  return res.status(200).send(res.locals.pollingData);
});

app.get("/getLiveDeploymentData", databaseController.getLiveDeploymentData, (req: Request, res: Response) => {
  return res.status(200).send(res.locals.podDeployData);
});

app.get("/getLivePodData", databaseController.getLivePodData, (req: Request, res: Response) => {
  return res.status(200).send(res.locals.podDeployData);
});

///////////

app.use("*", (req: Request, res: Response) => {
  return res.status(404).send("Error, path not found");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const errorObj = {
    log: "global error handler in express server",
    message: { err: "global error handler in express server" },
  };
  const errorObject = Object.assign({}, errorObj, err);
  console.log(errorObject);
  return res.status(500).json(errorObject);
});

//////////

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
  });
}

export default app;