var path = require('path');
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/index.html'));
});

app.get('/express', function(req, res) {
  res.send("You just used the express package for creating a web server! Happy learning");
  var expressDemo = require('./01_express_demo');
  expressDemo.run();
});

app.get('/lodash', function(req, res) {
  res.send("Head to the Node console to see the demo");
  var lodashDemo = require('./02_lodash_demo');
  lodashDemo.run();
});

app.get('/async', function(req, res) {
  res.send("Head to the Node console to see the demo");
  var asyncDemo = require('./03_async_demo');
  asyncDemo.run();
});

app.get('/q', function(req, res) {
  res.send("Head to the Node console to see the demo");
  var qDemo = require('./04_q_demo');
  qDemo.run();
});

var server = app.listen(54321, "localhost", function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("App listening on http://%s:%s", host, port);
  console.log("Press Ctrl + C to stop");
});

console.log("Introduction to npm");
console.log("===================");


