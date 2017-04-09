console.log("\n");
console.log("Introduction to npm");
console.log("===================");


var app = require('./01_express_demo');

var server = app.listen(54321, "localhost", function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("App listening on http://%s:%s", host, port);
  console.log("Press Ctrl + C to stop");
});

