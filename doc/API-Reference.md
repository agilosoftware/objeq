# objeq API Reference Manual
The objeq Library is flexible in how you interact with it.  It exposes only a single function that can behave in multiple ways depending on the arguments that are provide to it.

## The Example Data
For all of these examples, let's assume that we're working with this Array of JavaScript Objects:

    var data = [
      { name: 'Barbara', age: 25, gender: 'female' },
      { name: 'Ronald', age: 62, gender: 'male' },
      { name: 'Robert', age: 54, gender: 'male' },
      { name: 'Jessica', age: 48, gender: 'female' }
    ];

## Querying Data
The primary function of the objeq Library, as you might have guessed, is the ability to query data.  This is done by providing an Array or Object as the first argument to the `$objeq()` function, followed by a Query String and a set of optional Parameters:

    var res = $objeq(data, "age > 40 && gender == 'female' -> name");
    // --> Returns ['Jessica']

This could have also been parameterized and written as:

    var res = $objeq(data, "age > %1 && gender == %2", 40, 'female');
    // --> res now contains ['Jessica']

A simpler query might only process a single Object:

    var res = $objeq({ name: 'Ronald', age: 62 }, "-> age * 2");
    // --> res now contains [124]

## Compiling Queries
If the first argument to the `$objeq()` function is a Query String rather than an Array or Object to be queried, then the library will assume you are trying to compile a Query.  The rules are essentially the same except that a JavaScript closure is returned that can then be used to process data repeatedly:

    var ageAndGender = $objeq("age > %1 && gender == %2", 40, 'female');

    var res = ageAndGender(data);
    // --> res now contains ['Jessica']

In this way, the parameters that are encountered by the `$objeq()` function are treated as defaults for the compiled query, but can be overridden when calling the closure:

    var res = ageAndGender(data, 20);
    // --> res now contains ['Barbara', 'Jessica']

    var res = ageAndGender(data, 60, 'male');
    // --> res now contains ['Ronald']

## Dynamic Queries
So far, you've seen Snapshot Queries that evaluate the data only once, returning a static result.  You can also create a Dynamic result set by calling the `dynamic()` function that is nested under the compiled closure:

    var res = ageAndGender.dynamic(data, 60, 'male');
    // --> res now contains ['Ronald']

    data.push({ name: 'Thomas', age: 88, gender: 'male' });
    // --> res now contains ['Ronald', 'Thomas']

The results of a Dynamic Query will constantly reflect the state of the evaluated data.  This is a very powerful feature, but comes with a cost.  The cost is that Arrays and Objects will be decorated, resulting in slightly reduced performance when accessing those Arrays and Objects.

### Dynamic Parameters
A Query can be Parameterized such that any Objects passed into it are also decorated and treated as 'live' parameters.  This means that the results will be updated every time any of the Parameter's referenced Properties change.  Parameters are referred to by number, so to drill into the first passed Parameter, you would prefix a path with %1, and so on:

    var query = $objeq("name == %1.name")
      , param = { name: 'Ronald' };
    var res = query.dynamic(data, param); // res[0] = Ronald
    param.name = 'Jessica';               // res[0] = Jessica

# Decorating Arrays and Objects
Arrays and Objects will be decorated automatically by the objeq Query Language whenever it sees that they are participating in a Dynamic Query, but they can also be decorated explicitly by passing them to the `$objeq()` function without an associated query.  This is particularly useful for Arrays.

## Array Decoration
This will decorate the `data` Array.  *Note* that for Arrays, the decoration happens in-place and so the function will return the same Array that was passed to it.

    $objeq(data); // --> result is data

The decoration of an Array results in several changes to the Array instance.  Specifically, many of the Array accessor methods (slice, splice, push, etc) are wrapped so that the objeq Library can perform event notification when a change occurs to the Array's content.

Beyond the standard method wrapping.  The objeq Library also adds several convenience methods to the Array instance.

### Querying
> `query(query, [params])`
> Performs a Snapshot Query against the Array

> `dynamic(query, [params])`
> Performs a Dynamic Query against the Array

### Notifications
> `on(properties, callback)`
> Registers a Change Notification Callback

> `off(properties, callback)`
> Deregisters a Change Notification Callback

You can monitor Arrays for Property changes.  Here we just specify the property name as-is (or property names, separated by spaces).

    data.on('name', function (target, key, newValue, oldValue) {
        // target is the Object that changed
        console.log("The Query Results have changed!");
    });
    items[1].name = 'William';

You can also monitor Arrays for membership changes.  Notice that the first parameter to the `on()` method is now '.content'.  All property keys that start with a '.' are considered to be special properties of the Array itself.  Objeq presently only supports the '.content' and '.length' special properties.

    data.on('.content', function (target) {
        // target is the Array itself
        console.log("The Query Results have changed!");
    });
    data.push({ name: 'Thomas', age: 88, gender: 'male' });

### Convenience
> `contains(item)`
> Returns `true` if the Array contains the item

> `attr(name, [value])`
> Sets and returns attributes from the Array items

Because the objeq Library will track Array membership in order to more optimally refresh results, the `contains()` may be faster than using the standard Array method `indexOf(item) !== -1` in most cases.  The only difference is that it returns a Boolean result rather than an Array index.

`attr()` is a convenince method for getting or mass-setting properties of the Objects in an Array.

    // Find the first Object in data with the named attribute
    // 'age' and return the attribute's value
    var age = data.attr('age'); // --> age now contains 25

    // Sets the 'age' attribute of every Object in the Array
    data.attr('age', 25); // everyone is now 25 years old

### Kludgery
> `item(index, [value])`
> Sets and returns items from the Array

Arrays in JavaScript can't be subclassed properly, particularly problematic is that indexed get and sets `myArray[0] = 'blah'` can't be intercepted.  So although all of an Array's standard methods can be wrapped, there is no way to wrap indexed gets and sets, which means that Items set in this way won't generate an observable change for Dynamic Queries.

To work around this problem, objeq has to introduce a method to each Array that it decorates.  This is the `item()` method, and can be utilized as follows:

    // Set a Value
    myArray.item(0, 'blah');     // myArray[0] = 'blah';

    // Get a Value
    var blah = myArray.item(0);  // var blah = myArray[0];

## Object Decoration
The objeq Library will decorate Objects only when it is necessary to do so because Object decoration is expensive and generally only useful in the context of Dynamic Queries.  As such, you should never need to decorate an Object explicitly, but it's useful to know what happens to an Object when it is decorated.

JavaScript is limited in what it allows you to do with its metaprogramming facilities (if you can even call them that), so something of a brute force approach has to be taken.  In order to avoid excessive analysis, decoration is only performed once per Object or Array and only when the library deems necessary, such as in the case of Dynamic Queries.

What this means for Objects is that the first time objeq encounters an Object, it replaces its properties with JavaScript Setters and Getters that generate notifications.  Thereafter, any newly introduced Properties will *not* be decorated and therefore will not trigger notifications for dynamic updates.  *Because of this, it is recommended that all Properties be defined (even with a null value) before being decorated.*

*Note* that if you decorate an Object explicitly with the `$objeq()` function, the result will be a single-element decorated Array:

    var myObject = { name: 'Ronald', age: 62 };
    $objeq(myObject); // --> result is [myObject]

# Extensions
Defining Extension Functions for objeq is a relatively painless process.  Simply register the function with the `registerExtension()` method that is exposed by the `$objeq()` function instance:

    $objeq.registerExtension('hello', function (ctx, firstName) {
        return "Hello " + firstName;
    });

And then call the function from within your Query:

    var res = $objeq(data, "-> hello(firstName)");

## Five Simple Rules for Extension Writers
1. Your Extensions should be side-effect free and deterministic.  This is **very** important!
2. The first argument passed to an Extension will always be the current Query Context followed by arguments passed as part of the Query itself
3. Extensions can be called from the Predicate, Selector and Aggregator, but not from the Collator
4. Inside of your Extension, the `this` variable will differ depending on context:
  * If used in the Predicate or Selector, it will refer to the current Item being processed
  * If used as an Aggregator, it will refer to the Intermediate Result (an Array) that was passed into the Aggregator chain
5. The first Extension in an Aggregator chain is passed a reference to the current query's Intermediate Results, its result is passed to the next Extension, and so on
