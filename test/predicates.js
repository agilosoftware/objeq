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

    this.resultCountOk = function(test, query, count) {
      test.equal(this.data.query(query).length, count, query);
    };

    callback();
  },

  "Normal Comparisons Work": function (test) {
    this.resultCountOk(test, "age >= 45", 8);
    this.resultCountOk(test, "age > 45", 6);
    this.resultCountOk(test, "age < 45", 6);
    this.resultCountOk(test, "age <= 45", 8);
    this.resultCountOk(test, "age == 45", 2);
    this.resultCountOk(test, "age != 45", 12);
    this.resultCountOk(test, "'^T' =~ firstName", 4);

    test.done();
  },

  "Boolean Comparisons Work": function (test) {
    this.resultCountOk(test, "age >= 45 and lastName == 'Williams'", 1);
    this.resultCountOk(test, "age > 70 or lastName == 'Williams'", 3);
    this.resultCountOk(test, "not (age > 70 or lastName == 'Williams')", 11);
    this.resultCountOk(test, "firstName in ['Bill', 'Ted']", 4);

    test.done();
  },

  "Simple Maths Work": function (test) {
    this.resultCountOk(test, "age + 100 >= 145", 8);
    this.resultCountOk(test, "age - 45 > 0", 6);
    this.resultCountOk(test, "age * 2 >= 90", 8);
    this.resultCountOk(test, "age / 2 > 25", 5);
    this.resultCountOk(test, "age % 5 != 0", 3);

    test.done();
  }
});
