# objeq Reference Manual

This document serves as a quick introduction to the objeq Query Language.

## Glossary

Before diving in deep, we should define some of the terms that will be used throughout this section:

### Source Set
An array used as the source of queried data.  As Queries may be chained, a [Result Set] may also serve as a Source Set.  The Items of a Source Set will be [Decorated] by objeq in order to allow live querying of modified data.

### Decorated
Any Arrays or Objects that objeq encounters while processing live [Queries] will be Decorated.  What this means is that the library will replace certain Properties and methods with wrapper functions such that changes can be observed. (see [Decoration Notes])

### Working Set
The Working Set is a set of Items based on the original [Source Set].  It is a temporary container, and at any point in time may be in various states of sorting or refinement.

### Result Set
An array that is the result of queried data.  While not strictly *read-only*, a Result Set that is produced by live [Queries] will be overwritten if any of the Query's [Source Set] data or [Parameters] change.

## Query

A Query consists of three optional parts.  The first is a [Predicate] that is used to filter your Source Set, the second is a [Collator] for ordering the results, and the third is a [Selector] for drilling into the filtered results.  The basic grammar for a Query is as follows:

    Predicate? ( Collator? Selector? | Selector? Collator? )

Essentially the [Predicate] must come first, followed by an optional [Collator] and an optional [Selector].  The order of the [Collator] and [Selector] is important because it determines whether or not the sorting is executed against the [Selector] results.

For example, the following are *entirely* different Queries:

    firstName == 'William' order by lastName select spouse
    
    firstName == 'William' select spouse order by lastName

For brevity and to visually isolate the filter conditions, these two Queries could have also been written:

    firstName == 'William' by lastName -> spouse
    
    firstName == 'William' -> spouse by lastName
    
The first Query selects all Objects that have a firstName Property equal to 'William', orders those by the lastName Property of the same Object, and then returns the spouse Property of that Object.

The second Query selects all Objects that have a firstName Property equal to 'William', returns the spouse Property for each of those Objects, sorting them by the spouse's lastName Property.

These two Queries would only work if spouses always have the same last name, but we know that in the real world, this isn't the case.

### Predicate
The Predicate is a set of richly expressed conditions used to determine which Items from the [Source Set] will be returned as part of the [Result Set].  For the most part, the syntax is the same as JavaScript's, but with some differences.

#### Keywords
The keywords 'and', 'or' and 'not' may be used instead of '&&', '||' and '!' respectively, so the following Queries are equivalent.

    firstName == 'William' and lastName == 'Beck'
    firstName == 'William' && lastName == 'Beck'

As are these:

    firstName == 'William' and not happy
    firstName == 'William' && !happy

#### The IN Operator
objeq supports an operator called 'IN' which will return true if the left operand exists as an element of the right operand.  Presently only the searching of Arrays is supported.  The following predicate returns all Objects with a pet Property belonging to the specified set of animals.

    pet in ['dog', 'cat', 'pig', 'goat', 'donkey']

#### Regular Expressions
objeq supports Regular Expression matching using the Ruby '=~' operator, where the left operand is a regular expression and the right operand is a string to be matched.  Unlike the Ruby operator, objeq's Regular Expression matching only returns a true or false result.  The following predicate returns all unhappy Objects that have a firstName Property beginning with the letter 'W'.

    "^W" =~ firstName && !happy
    
### Selector
After a [Predicate] is processed, the [Working Set] will consist of a subset of the original [Source Set].  The Selector is used to evaluate these Items and return derived content as the [Result Set].  Selectors most often will be used to return Child Properties, but can also be used to generate new Objects and Arrays.  

The following [Query] finds all Objects with a lastName Property of 'Beck' and returns only the firstName Properties from those Objects.

    lastName == 'Beck' select firstName
    
This [Query] is similar, but generates new Objects as its [Result Set]:

    lastName == 'Beck' select { fullName: firstName + ' ' + lastName }
    
### Collator
A Collator is used to sort the [Working Set] based on a list of provided sort criteria.  A Collator must be placed after a [Predicate] and can appear before or after a [Selector].  The order of the [Collator] and [Selector] is important because it determines whether or not the sorting is executed against the [Selector] results.
   
This [Query] sorts the results by the lastName Property in Ascending Order followed by the firstName property in Descending Order, returning a generated set of Arrays as the [Result Set].

    order by lastName, firstName desc -> [ lastName + ', ' + firstName ]
    
### Parameters
A [Query] can be Parameterized such that any Objects passed into it are also [Decorated] and treated as 'live' parameters.  This means that the [Result Set] will be updated every time any of the Parameter's referenced Properties change.  Parameters are referred to by number, so to drill into the first passed Parameter, you would prefix a path with %1, and so on:

    var items = $objeq({name:'William'}, {name:'Stephen'});
    var param = { name: 'William' };
    var result = items.query("name == %1.name", param); // 0 -> William
    param.name = 'Stephen';                             // 0 -> Stephen
    
## Decoration Notes
JavaScript is limited in what it allows you to do with its metaprogramming facilities (if you can even call them that), so something of a brute force approach has to be taken.  In order to avoid excessive analysis, decoration is only performed once per Object or Array.  

### Objects
What this means for Objects is that the first time objeq encounters an Object, it decorates its Properties, but thereafter, any newly introduced Properties will *not* be [Decorated] and therefore will not trigger observers for live [Query] updates.  Because of this, it is recommended that all Properties be defined (even with a null value) before being [Decorated].

### Arrays
Arrays in JavaScript can't be subclassed properly, particularly problematic is that indexed get and sets (myArray[0] = 'blah') can't be intercepted.  So although all of an Array's mutator methods can be wrapped, there is no way to wrap indexed gets and sets, which means that items set in this way won't generate an observable change for live queries.

To work around this problem, objeq has to introduce a method to each Array that it decorates.  This is the 'item' method, and can be utilized as follows:

    // To set a value
    myArray.item(0, 'blah');
    
    // To get a value
    var blah = myArray.item(0);
