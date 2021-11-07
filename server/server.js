// import express, {Request, Response, NextFunction} from 'express';
// import databaseController from './databaseController';
// import path from 'path';

const express = require('express');
const databaseController = require ('./databaseController');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, './'))); 

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", 'http://localhost:8080'); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.status(200);
  next();
});


app.use("/build", express.static(path.join(__dirname, "../build")));

app.get("/", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../src/index.html"));
});


app.options("/upload", (req, res) => {
  return res.status(200).send('ok');
});

app.post("/upload", databaseController.parsePOST, databaseController.uploadFiles,(req, res) => {
  return res.status(200).send(res.locals.uploadedData);
});

app.get("/update", databaseController.updateFiles, (req, res) => {
  return res.status(200).send('ok');
});

app.get("/statusConditions", databaseController.getLiveData, (req, res) => {
  return res.status(200).send(res.locals.pollingData);
});

app.get("/getLiveDeploymentData", databaseController.getLiveDeploymentData, (req, res) => {
  return res.status(200).send(res.locals.podDeployData);
});

app.get("/getLivePodData", databaseController.getLivePodData, (req, res) => {
  return res.status(200).send(res.locals.podDeployData);
});

///////////

app.use("*", (req, res) => {
  return res.status(404).send("Error, path not found");
});

app.use((err, req, res, next) => {
  const errorObj = {
    log: "global error handler in express app",
    message: { err: "global error handler in express app" },
  };
  const errorObject = Object.assign({}, errorObj, err);
  console.log(errorObject);
  return res.status(500).json(errorObject);
});

//////////

  app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
  });
