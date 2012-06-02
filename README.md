# objeq (Object Querying)

objeq (Object Querying) - is a simple library that allows POJSO's (Plain-Old JavaScript Objects) to be queried in real-time.  As it relies on property setters, it will only work in more recent browsers and JavaScript environments.

## Current Status

Still under active development and still quite a bit to do. Unless you *really* know what you're doing, you probably shouldn't even try to use this library.  If you *do* use it, know that things *will* considerably change in future versions.

## Installation

This module defines both a Lexer and Grammar that use the Jison Parser Generator (http://zaach.github.com/jison/)

If you have node.js, you can install jison using npm by issuing the following command:

    > npm -g install jison

## Examples

Objects and Arrays need to be 'decorated' in order to be queryable.  The result of such decoration is always an array of items, even if only a single object was decorated, so you have to be careful to retrieve the first item in the result if you want to modify it:

    var items = $objeq({name:'thom'}); // -> [{name:'thom'}]
    var thom = items[0];

    // is the same as the following
    var thom = $objeq([{name:'thom'})[0];

These are chainable, so you can also do:

    var items = $objeq({name:'thom'}, {name:'stef'});
    var thom = items.query("name == 'thom'")[0];

Queries can also be parameterized where any Objects passed in are also decorated and treated as 'live' parameters.  This means that the result array will be updated every time the parameter's properties change:

    var items = $objeq({name:'thom'}, {name:'stef'});
    var param = { name: 'thom' };
    var result = items.query("name == %1.name", param); // 0 -> thom
    param.name = 'stef';                                // 0 -> stef

## Observables (Not Yet Implemented)

You can create observers on both Objects and Arrays in the following ways.

    // Fire when the objects 'name' property changes
    $objeq({name:'thom'})
      .on('name', function(target, name, value, prev) {
        // do something
      });

    // This is an Array observable... all objects controlled
    // by the event are observed, but reported on individually
    $objeq({name:'thom'})
      .on('name', function(target, name, value, prev) {
        // do something
      });

    // this is a result observable... same rules as an array
    $objeq({name:'thom'})
      .query("name == 'thom'")
      .on('name', function(target, name, value, prev) {
        // do something
      });

The last example in this set is a tricky one because the second part of the query filters the result such that only objects with a name property of 'thom' appear.  So if the property changes value to something other than 'thom' you will be notified before it is filtered from the array.  You will also be notified if the property value changes back to 'thom', once again including it in the set.

## Query Language

A query consists of three optional parts.  The first is a predicate that is used to filter your source array, the second is a selector for drilling into the filtered results, and the third is a collation for ordering the results.  The basic grammar for a query is as follows:

    query
      : expr 
      | filter
      | expr filter
      ;
      
    filter 
      : order_by
      | order_by select
      | select
      | select order_by
      ;

Predicates are denoted by the 'expr' rule and the combination of selectors and collators is encapsulated by the 'filter' rule.  Essentially the predicate must come first, followed by an optional selector and an optional collator.  The order of the selector and collator is important because it determines whether or not the sorting is executed against the selector results.

For example, the following are *entirely* different queries:

    firstName == 'thom' order by lastName select children
    
    firstName == 'thom' select children order by lastName

The first query selects all objects that have a firstName property equal to 'thom', orders those by the lastName property of the same object, and then returns the children property of that object.

The second query selects all objects that have a firstName property equal to 'thom', returns the children property for each of those objects, sorting them by the child's lastName property.

These two queries would only work if the children each had the same last name as their parent, but we know that in the real world, this isn't the case.

For brevity and to visually isolate the filter conditions, these two queries could have also been written:

    firstName == 'thom' by lastName -> children
    
    firstName == 'thom' -> children by lastName

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
