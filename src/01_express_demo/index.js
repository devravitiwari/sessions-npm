var path = require('path');
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../index.html'));
});

app.get('/express', function(req, res) {
  res.send("You just used the express package for creating a web server! Happy learning");
  run();
});


function run() {
  console.log("\nHandsOn 01: Express");
  logDemoOverview();
}

function logDemoOverview() {
  console.log("\n-------------------\n");
  console.log("Express is a very popular web server for Node.");
  console.log("\n-------------------\n");
} 

module.exports = app;
