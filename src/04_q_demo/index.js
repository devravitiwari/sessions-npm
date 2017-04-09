var Q = require("q");
var repeat = require('lodash/repeat');
var count = 0;

function run() {
  console.log("\nHandsOn 03: Async");
  console.log("%s", repeat('-', 50));
  startDemo();
  console.log("\n%s\n", repeat('-', 50));
}

function startDemo(req, res) {
  
  // Basic Q functionality
    Q.all([1, 2, 3].map(eventually))
        .done(function (result) {
            console.log(result);
        });

    Q.all([
        eventually(10),
        eventually(20)
    ]).spread(function (x, y) {
        console.log(x, y);
    }).done(function () {
        console.log("Finished!!")
    });

// A basic function with reject and reslove
    function forever(fn) {
        console.log(">>calling forever ");
        return fn().then(function () {
            console.log(">>resolve promise");
            return forever(fn); // re-execute if successful
        })
    }

    forever(doThis).then(function (result) {
        console.log("Finished Resolve Promise !!", result)
    }, function (err) {
        console.log("Finished Reject Promise !!", err)
    });


// Run like waterfall with q
    var promises = [];
    var series1 = Q().then(first);
    promises.push(series1);
    var series2 = series1.then(second);
    promises.push(series2);
    var series3 = series2.then(third);
    promises.push(series3);

    Q.all(promises).done(function (result) {
        console.log("Finished!!", result)
    });
};

function eventually(value) {
    return Q.delay(value * value, 1000);
}

function doThis() {
    var deferred = Q.defer();
    setTimeout(function () {
        if (count) {
            deferred.reject("Something wrong");
        } else {
            count++;
            deferred.resolve("done Every thing is fine");
        }
    }, 1000);

    return deferred.promise
}

function first() {
    var deferred = Q.defer();
    setTimeout(function () {
        deferred.resolve("first done");
    }, 100);
    return deferred.promise
}
function second(data) {
    var deferred = Q.defer();
    setTimeout(function () {
        console.log(data, "From first>>>>>>>>>>>>>>>>> ");
        deferred.resolve("second done");
    }, 100);
    return deferred.promise
}
function third(data) {
    var deferred = Q.defer();
    setTimeout(function () {
        console.log(data, "From Second>>>>>>>>>>>>>>>>> ");

        deferred.resolve("third done");
    }, 100);
    return deferred.promise
}

module.exports.run = run;

