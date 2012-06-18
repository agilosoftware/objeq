var nodeunit = require('nodeunit');
var objeq = require('..');

exports.predicates = nodeunit.testCase({
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

    this.resultCountOk = function (test, count, query) {
      test.equal(this.data.query(query).length, count, query);
    };

    callback();
  },

  "Normal Comparisons Work": function (test) {
    this.resultCountOk(test, 8, "age >= 45");
    this.resultCountOk(test, 6, "age > 45");
    this.resultCountOk(test, 6, "age < 45");
    this.resultCountOk(test, 8, "age <= 45");
    this.resultCountOk(test, 2, "age == 45");
    this.resultCountOk(test, 12, "age != 45");

    test.done();
  },

  "Boolean Comparisons Work": function (test) {
    this.resultCountOk(test, 1, "age >= 45 and lastName == 'Williams'");
    this.resultCountOk(test, 3, "age > 70 or lastName == 'Williams'");

    test.done();
  },

  "Simple Maths Work": function (test) {
    test.done();
  }
});
