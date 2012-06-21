# objeq (JavaScript Object Querying)

objeq (Object Querying) - is a **simple** library that allows POJSO's (Plain-Old JavaScript Objects) to be queried in real-time.  As it relies on property setters, it will only work in more recent browsers and JavaScript environments.

## Current Status

Still under active development and still quite a bit to do. Unless you *really* know what you're doing, you probably shouldn't even try to use this library.  If you *do* use it, know that things *will* considerably change in future versions.

## Installation

This module defines both a Lexer and Grammar that use the Jison Parser Generator (http://zaach.github.com/jison/)

A pre-built version of the Parser is already included, but if you'd like to build it yourself, and you have node.js, then you can install Jison and UglifyJS using npm by issuing the following command:

    > npm -g install jison uglify-js

You can then build the Parser and Minified Code by typing:

    > npm run-script build

## Usage

There are really only three steps in using the objeq Query Language, and the third is optional.  First, you need to Decorate your data by passing it to the `$objeq()` function:

    var data = $objeq({name:'Ronald'}, {name:'Robert'}, {name:'Thomas'});

Next, you query it.  You can do this in one of two ways, both involve calling a method of the Decorated Array that `$objeq()` returns.  The first method is called `query()` and creates an immediate (or snapshot) Result Set.  The second method is called `dynamic()` and produces a Result Set whose contents are *live* in that the Array will constantly reflect Items that match the original Query criteria.

    // The Result Set membership will not change as its Items are modified
    var result = data.query("'^Ro' =~ name");
    
Or
    
    // The Result Set membership will update as soon as its Items are modified
    var result = data.dynamic("'^Ro' =~ name");
    
And finally, if you want to monitor changes to your results as they happen, you can register an Observer on the Result Set.  Note that this really is only useful for the results of a Dynamic Query.

    result.on('change', function(target) {
      alert('My Data Changed!');
    });
    
## Things Worth Mentioning

Objects and Arrays need to be 'Decorated' in order to be queryable.  The result of such decoration is always an Array of Items, even if only a single Object was decorated, so you have to be careful to retrieve the first Item in the Result Set if you want to modify it:

    var items = $objeq({name:'William'}); // -> [{name:'William'}]
    var will = items[0];

    // is the same as the following
    var will = $objeq([{name:'William'})[0];

These are chainable, so you can also do:

    var items = $objeq({name:'William'}, {name:'Stephen'});
    var will = items.query("name == 'William'")[0];

Queries can also be Parameterized where any Objects passed in are also Decorated and treated as *live* Parameters.  This means that the Result Set will be updated every time the Parameter's Properties change:

    var items = $objeq({name:'William'}, {name:'Stephen'});
    var param = { name: 'William' };
    var result = items.dynamic("name == %1.name", param); // 0 -> William
    param.name = 'Stephen';                               // 0 -> Stephen

## Observables

Presently, you can create Observers on Result Sets in the following ways.

### Membership Changes
Monitoring the Result Set for membership changes.  Notice that the first parameter to the `on()` method is '.content'.  All Observable keys that start with a '.' are considered to be special properties of the Result Set itself.

    // query all items that start with the letter 't'
    var items = $objeq([{name:'William'}, {name:'Stephen'});
    var query = items.dynamic("'^W' =~ name");
    query.on('.content', function(target) {
        // target is the array itself
        console.log("The Query Results have changed!");
    });
    items[1].name = 'William';

### Property Changes
Monitoring the Result Set for Property changes.  Here we just specify the property name as is (or names, separated by spaces).

    query.on('name', function(target, key, newValue, oldValue) {
        // target is the object that changed
        console.log("The Query Results have changed!");
    });
    items[1].name = 'William'; // -> There are 2 results

## More Information

See doc/Reference.md for more information on the objeq Query Language.

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
