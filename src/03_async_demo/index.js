var async = require("async");
var repeat = require('lodash/repeat');

function run() {
  console.log("\nHandsOn 03: Async");
  console.log("%s", repeat('-', 50));
  startDemo();
  console.log("\n%s\n", repeat('-', 50));
}


function startDemo() {

    slowFunction(function (err, res) {
       if (err) {
           console.log("Error something wrong")
       }
       fastFunction(function (err,res) {
           console.log(">>>>>>>>>>>done After slow and fast function")
       })
    });
    
    var tasks = [slowFunction, fastFunction];
    
    // async.series take a set of tasks to perform as argument.
    async.series(tasks, function (err, result) {
       console.log(err, result, "After final call of async.series")
    });
    // async.parallel take a set of tasks to perform as argument.
    async.parallel(tasks, function (err, result) {
       console.log(err, result, "After final call of async.parallel")
    });


    // async.whilst runs each function in series. Before each run it will do the "test" function to make sure it should run again.
    var count = 0;
    async.whilst(
       function () {
           return count < 5;
       },
       function (callback) {
           count++;
           setTimeout(function () {
               console.log("|||Async.whilst|||",count);
               callback(null, count);
           }, 1000);
       },
       function (err, n) {
           console.log(">>.Finished!!");
           // 5 seconds have passed, n = 5
       }
    );

    // Square each number in the array [1, 2, 3, 4] and done some work after that
    var items = [1, 2, 3, 4];
    items.forEach(function (item,cb) {
       // Call asynchronous function, often a save() to DB
       square(item, function (err) {
       });
    });
    
    async.each(items, square, function (err) {
       // Square has been called on each of the numbers
       console.log("Finished!");
    });
};


// Usage with callbacks
function fastFunction(done) {
    setTimeout(function () {
        console.log("Entered in fast function.... !!!!");
        done(null, {status: "Fast"})
    }, 100)
}

function slowFunction(done) {
    setTimeout(function () {
        console.log("Entered in slow function.... !!!!");
        done(null, {status: "slow"})
    }, 300)
}

var square = function (num, doneCallback) {
    console.log(num * num);
    setTimeout(function () {
        return doneCallback(null);
    }, 300)
};

module.exports.run = run; 
