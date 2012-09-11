var nodeunit = require('nodeunit');
var objeq = require('..');

// Load the Example Extensions
require('../examples/extensions');

exports.dynamic = nodeunit.testCase({
  setUp: function (callback) {
    this.data = objeq([
      { "firstName": "Bill", "lastName": "Bradley", "age": 30 },
      { "firstName": "Thom", "lastName": "Bradford", "age": 40 },
      { "firstName": "Stefano", "lastName": "Rago", "age": 29 },
      { "firstName": "Fred", "lastName": "Wilkinson", "age": 50 },
      { "firstName": "Ted", "lastName": "Williams", "age": 20 },
      { "firstName": "Jed", "lastName": "Clampet", "age": 70 },
      { "firstName": "Will", "lastName": "Robinson", "age": 45 },
      { "firstName": "John", "lastName": "Jacob", "age": 54 },
      { "firstName": "Thom", "lastName": "Smith", "age": 15 },
      { "firstName": "Bill", "lastName": "Blake", "age": 90 },
      { "firstName": "Hank", "lastName": "Williams", "age": 70 },
      { "firstName": "John", "lastName": "Cash", "age": 45 },
      { "firstName": "Joe", "lastName": "Strummer", "age": 54 },
      { "firstName": "Ted", "lastName": "Turner", "age": 15 }
    ]);

    callback();
  },

  "Dynamic Queries Update Properly": function (test) {
    var billCount = this.data.dynamic("firstName == 'Bill' := count");

    test.equal(billCount[0], 2, "Initial count is correct");

    this.data[6].firstName = 'Bill';
    test.equal(billCount[0], 3, "Updated count is correct");

    test.done();
  }
});
