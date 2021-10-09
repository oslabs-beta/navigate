import express from 'express';
import databaseController from './databaseController';
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/api/getData', databaseController.getData, (req: any, res: any) => {
    console.log('hi from bk?');
    return res.status(200).json(res.locals.data);
});

///////////

app.use('*', (req: any, res: any)=>{
    return res.status(404).send('Error, path not found');
  });
  
  app.use((err: any, req: any, res: any, next: any)=>{
    const errorObj = {
      log: 'global error handler in express server',
      message: {err: 'global error handler in express server'}
    };
    const errorObject = Object.assign({},errorObj,err);
    console.log(errorObject);
    return res.status(500).json(errorObject);
  });
  
//////////  

app.listen(PORT, () => {
    console.log(`listeneninginign on port: ${PORT}`)
});

module.exports = app;