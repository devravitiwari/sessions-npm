var express = require('express');
var app = express();

var server = app.listen(0, "localhost", function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Listening at http://%s:%s", host, port);
});

app.get('/', function (req, res) {
  res.send('Welcome to TO The New');
});
