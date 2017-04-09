var _ = require("lodash");

function run() {
  console.log("\nHandsOn 02: Lodash");
  console.log("%s", _.repeat('-', 50));
  startDemo();
  console.log("\n%s\n", _.repeat('-', 50));
}

function startDemo() {
  demo1();
  demo2();
  demo3();
  demo4();
};


function demo1() {
    //_.isArray...........
    var obj = {a: 1, b: 2, c: 3};
    console.log("_.isArray !! ", obj, _.isArray(obj));

    //_.times...........
    _.times(2, function () {
        console.log("_.times !! Run  2 times")
    });

    //_.cloneDeep...............
    var objA = {
        "name": "colin",
        "address" : {
          "street": "ford avenue",
          "city": "NY"
        }
    };
    var objB = _.cloneDeep(objA);
    console.log("_.cloneDeep !! objB === objA ", objB === objA );

    //_.assign...........
    var arr1 = {a: "a property"};
    var arr2 = {b: 4, c: "an other property"};
    var result = _.assign({a: "an old property"}, arr1, arr2);
    console.log("_.assign !! ", result);
}


function demo2() {
      //_.map...........
    var myObject = {
        "NewEngland": "12",
        "GreenBay": "12",
        "NewYork": "10",
        "Seattle": "3"
    };

    //convert myObject to convertObj
    var convertObj = [{
        name: 'New England', value: 12
    }, {
        name: 'Green Bay', value: 12
    }, {
        name: 'New York', value: 10
    }, {
        name: 'Seattle', value: 3
    }];

    var mapList = _.map(myObject, function (key, val) {
        return {name: val, value: key}
    });

    console.log("_.map !! ", mapList);
    
}

function demo3() {
    var items = [
      {  
        getName: function () {
          return 'foo';
        }
      }, 
      {
        getName: function () {
          return ['bar', 'foo', 'hii'];
        }
      }, 
      {
        getName: function () {
          return 'foo';
        }
      }];

    //_.unjq................
    var list = _.uniq(_.flatten(_.map(items, function (v) {
        return v.getName();
    })));

    console.log("_.uniq !! ", list);
}

function demo4() {

    //_.keys.......................
    var data = [
        {
            "ID": 12345,
            "SID": 1111,
            "DataPoint1": [
                {
                    "Name": "SD",
                    "Activity": "KT",
                    "Group": "Test"
                }
            ]
        }
    ];// get the property names into another array.

    console.log("get the property names into another array", _.keys(data[0].DataPoint1[0]));

    //_.get,_.set.................
    var bar = {foo: {key: "foo"}};
    console.log("bar ", bar);
    _.set(bar, "foo.items[0]", "An item");
    // bar => { foo: { key: "foo", items: ["An item"] } }
    console.log(">>> _.set !!", bar);

    var foo = _.get(bar, "foo.key");
    console.log(">>> _.get !!", foo);


    // _.keyBy Get the data with specific key value in array of objet
    var posts = [
        {id: "1abc", title: "First blog post", content: "..."},
        {id: "c", title: "Second blog post", content: "..."},
        {id: "34abc", title: "The blog post we want", content: "..."}
    ];
    posts = _.keyBy(posts, "id");
    console.log(posts['34abc']);
}

module.exports.run = run;
