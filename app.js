var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Welcome to TO The New');
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Listening at http://%s:%s", host, port)
});

// This responds a POST request for the homepage
app.post('/', function (req, res) {
  console.log("Got a POST request");
  res.send('You all are entered in To The New');
});

// This responds a DELETE request for the /del_user page.
app.delete('/del', function (req, res) {
  console.log("Got a DELETE request ");
  res.send('Something happens.... DELETED ');
});

