var nodeunit = require('nodeunit');
var objeq = require('..');

// Load the Example Extensions
require('../examples/extensions');

exports.aggregates = nodeunit.testCase({
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

  "Single Aggregations Work": function (test) {
    test.equal(this.data.query("-> age := avg")[0], 44.785714285714285,
      "Average Age is correct");

    test.equal(this.data.query("-> age := sum")[0], 627,
      "Sum of Ages is correct");

    test.done();
  },

  "Chained Aggregations Work": function (test) {
    test.equal(this.data.query("-> age := avg, round")[0], 45,
      "Rounded Average Age is correct");

    test.done();
  }
});
