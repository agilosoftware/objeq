# objeq (JavaScript Object Querying)

## Introduction
objeq is a **simple** library that allows POJSO's (Plain-Old JavaScript Objects) to be queried in real-time.

### What Does it Do?
It lets you take a JavaScript Array and query it.  Querying includes one or more steps of filtering, drill-down, synthesis, sorting and/or aggregation.  It also optionally allows you to generate dynamic results, such that if anything in the original Array changes, the query result will immediately reflect those changes.

### What Doesn't it Do?
Everything else.

### Current Status
The grammar is now frozen but the query engine is still under active development  Performance will continue to improve.  *Note* that objeq relies on JavaScript property setters to provide some of its functionality, and so it will only work in more recent browsers and JavaScript environments.

## Getting Started
Getting started is so frickin' easy!

### Installation
A pre-built version of the parser and minified code are already included, but if you'd like to build them yourself and you have node.js, then you can do so by issuing the following command from the package's top-level directory:

    > npm install; npm run-script build

This will also install any development dependencies and run the nodeunit test suite.

### Inclusion in a Web Page
You can include the objeq Library on your web page with the following HTML:

    <script src="objeq.min.js" type="text/javascript"></script>

You can also include the unminified parser and processor with the following:

    <script src="objeq/objeq-parser.js" type="text/javascript"></script>
    <script src="objeq/objeq.js" type="text/javascript"></script>

### Inclusion in Node.js
Assuming you have installed the objeq Library into your project with npm, you can include it in a node.js module with the following:

    var $objeq = require('objeq');

### Performing a First Query
Assuming you have node.js installed, you can fire up the REPL and type the following into the console (minus comments):

    // Import the objeq Library
    var $objeq = require('objeq');

    // Create a data Array to be queried later
    var data = [
      { name: 'Barbara', age: 25, gender: 'female' },
      { name: 'Ronald', age: 62, gender: 'male' },
      { name: 'Robert', age: 54, gender: 'male' },
      { name: 'Jessica', age: 48, gender: 'female' }
    ];

    // This will compile an objeq query that filters only those
    // Objects having a name property starting with 'Ro' and then
    // returns a string that combines name and age properties
    var query = $objeq("'^Ro' =~ name -> name + ' is ' + age + ' years old'");

    // This performs the query against the 'data' Array and
    // returns the result in 'res'
    var res = query(data);

    // --> res now contains:
    //  [ 'Ronald is 62 years old',
    //    'Robert is 54 years old' ]

If you don't have node.js installed, you can instead open the Query Tester in your browser.  It is located in the Examples directory at [examples/index.html][tester]

## More Information
For more information about how to interact with the objeq Library and its single API function, see the API Reference at [doc/API-Reference.md][api]

For more information about the objeq Query Language itself, including its syntax and grammar, see the Language Reference at [doc/Language-Reference.md][language]

## Credits and Acknowledgements
This module defines both a Lexer and Grammar that use the Jison Parser Generator (http://zaach.github.com/jison/)

## License (MIT License)
Copyright (c) 2012 Agilo Software GmbH

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[tester]: http://www.kode4food.it/js/objeq/index.html
[api]: https://github.com/agilosoftware/objeq/wiki/API-Reference
[language]: https://github.com/agilosoftware/objeq/wiki/Language-Reference
