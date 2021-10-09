const {spawn} = require('child_process');

//the shell command we want to run
const command = 'kubectl';

const scheduler = spawn(command);

scheduler.stdout.on("data", data => {
  console.log(`stdout: ${data}`);
});

scheduler.stderr.on("data", data => {
  console.log(`stderr: ${data}`);
});

scheduler.on("error", err => {
  console.log(`error: ${err}`);
});

scheduler.on("close", closeCode => {
  console.log(`process exited with code ${closeCode}`);
});