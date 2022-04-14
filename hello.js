const express = require("express");
const { spawn } = require("child_process");
const app = express();
const port = 3000;


app.get("/", (req, res) => {
  var dataToSend;

  // spawn new child process to call the python script
  const python = spawn("python", ["sha256.py","sagar pachare"]);


  // get output from python script....
  python.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
    dataToSend = data.toString();
  });


  // in close event we are sure that stream from child process is closed
  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    res.send(dataToSend);
  });


});





app.listen(port, () =>
  console.log(`Example app listening on port 
${port}!`)
);





// from video 1..
//const childPython = spawn('python',['sample.py'])

//passing params to py file
// const childPython = spawn('python',['sample.py','sagar pachare'])

// childPython.stdout.on('data',(data)=>{
//     console.log("stdout: "+data)
// })

// // to print any error

// childPython.stderr.on('data',(data)=>{
//     console.log("some error: "+data)
// })

// //on closing 

// childPython.on('close',(code)=>{
//     console.log("exited with code "+code);
// })