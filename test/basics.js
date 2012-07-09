var nodeunit = require('nodeunit');
var objeq = require('..');

exports.basics = nodeunit.testCase({
  setUp: function (callback) {
    this.data = [
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
    ];

    callback();
  },

  "Wrap a Single Object": function (test) {
    var item = this.data[0];
    var result = objeq(item);

    test.ok(result[0] === item, "Item wrapped is correct");
    test.equal(result.length, 1, "Only one result returned");

    test.done();
  },

  "Wrap an Array Instance": function (test) {
    var data = this.data;
    var result = objeq(data);

    test.ok(result.__objeq_id__, "Array has been decorated");

    test.equal(result[0], data[0],
      "First wrapped item is correct");

    test.equal(result[result.length-1], data[data.length-1],
      "Last wrapped item is correct");

    test.equal(data.length, result.length,
      "Original data length and Result are equal");

    test.done();
  },

  "Modify an Array Instance": function (test) {
    var data = this.data;
    var result = objeq(data);
    var oldLength = data.length;

    var newItem = { "firstName": "Bill", "lastName": "Bradley", "age": 30 };
    data.push(newItem);

    test.equal(oldLength+1, data.length, "Result is one item longer");
    test.equal(result[result.length-1], newItem, "New item is in Result");

    test.done();
  }
});
