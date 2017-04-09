var request = require('request');
var repeat = require('lodash/repeat');

function run() {
  console.log("\nHandsOn 06: Request");
  console.log("%s", repeat('-', 50));
  startDemo.apply(this, arguments);
  console.log("\n%s\n", repeat('-', 50));
}

function startDemo(req, res) {
  var options = {
    url: 'https://www.reddit.com/r/funny.json',
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Accept-Charset': 'utf-8',
      'User-Agent': 'my-reddit-client'
    }
  };
  console.log("Making request to "+ options.url);
  request(options, function (e, r, body) {
    var json = JSON.parse(body);
    console.log("Response received for request "+ options.url);
    res.send(json);
  });

  options = {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NjM4N2FkZTFhMjU4ZjAzMDBjMzA3NGUiLCJpYXQiOjE0OTE1NjA3OTEwNjIsImV4cCI6MTQ5NDE1Mjc5MTA2Mn0.RUdEoiHFo3lemBleaqLM7ZwF4AFRHsz70sjMGFvmT2U"
    },
    url: 'http://localhost:9000/v1/api/likes',
    body: JSON.stringify({id: "58c113a82b2b33881ff0ed94", type: "RECIPE_LIKE"})
  };
  console.log("Making request to "+ options.url);
  request.post(options, function (e, r, body) {
    console.log(e, r, body);
  });
};

module.exports.run = run; 
