// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const {spawn} = require('child_process');
// var waitOn = require('wait-on');
const { runCommand } = require('../server/runCommand');
var exec = require('child_process').exec, child;
// const server = require('/Users/hemwatie/OSP/navigate/server/server.ts')
// const server = require("../server/server.ts");

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    },  
  })

  mainWindow.webContents.setDevToolsWebContents(devtools.webContents);
  mainWindow.webContents.openDevTools();
  // and load the index.html of the app.
  mainWindow.loadFile('build/index.html');
  // runCommand = (cmd) => {
  //   exec(cmd, function (error, stdout, stderr) {
  //       if(procsess.env.NODE_ENV !== 'test')
  //       {
  //           console.log(stdout);
  //           if(stderr)
  //           console.log('stderr: ' + stderr);
  //           if (error !== null) {
  //                console.log('exec error: ' + error);
  //           }
  //       }
  //   })
  // };


  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // runCommand(`ts-node ./server/server.ts`)
  // await exec(`ts-node ./server/server.ts`, function (err, stdout, stderr) {
  //   if (err && err.length > 1) {
  //           console.log("yuuuuuupp  failed to execute");
  //           callback(error("idkkkkkkkkkkk", "No input or output devices found", 500));
  //           return;
  //       }else{
  //           if(stdout){
  //             callback(null,stdout); 
  //           }
  //           if(stderr){
  //             callback(new Error("STDERR"),stderr);
  //           }
  
  //   }  
  // });

  // const opts = {
  //   resources: [
  //     'http://localhost:3000',
  //   ],
  // }

  // waitOn(opts, function(err){
  //   if(err) {
  //     return console.log('error inside waiton is: ', err)
  //   }
  // })

  // await child_process();

  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.