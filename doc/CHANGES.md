# Change History

## Known Bugs
* There is still some functionality missing, specifically the results of dynamic queries probably need a 'destroy' method, otherwise their registered listeners will keep them from being garbage collected.

## 0.4.2 - Starting to Optimize
* Starting to perform query optimization

## 0.4.1 - Bug-Fix Release
* Calling $objeq(array, string) was failing to process arguments correctly

## 0.4.0 - Grammar Freeze
* The objeq grammar is now officially frozen for the eventual 1.0 release

* The optional 'WHEN' keyword is now known as 'WHERE'

* Added a set of tests to make sure dynamic queries update properly

## 0.3.3 - Bug-Fix Release
* A bad refactoring broke dynamic query decoration.  That has been corrected in this release

## 0.3.2 - Aggregation Chaining
* Aggregation can now be chained by defining the Aggregation Extensions as a comma-separated list. (see doc/Reference.md)

* The REDUCE keyword has been renamed to CONTRACT to avoid confusion with what people have come to understand as a Reduce step.

* A completely optional 'WHEN' keyword has been added to the beginning of Predicates.

## 0.3.1 - Introducing Aggregation
* Renamed the EACH and FIRST Selectors.  They are now called EXPAND and REDUCE respectively.  Their behavior also slightly differs.  If the target property is not an Array and is not null, it will be copied to the Result Set as-is.

* Added an Aggregation Step to the Query Steps.  It can be used to take the Working Set and pass it to an Extension function, where the result of that function will be used as the Result Set content. (see doc/Reference.md)

* Added a 'this' keyword to local paths.  Normally the currently processed Item is implicit, but if you're in a Query Step that has already been reduced to non-Objects, then the 'this' keyword is useful for returning the currently processed Item.  For example:

    gender == 'male' -> age | this == 40 -> this - 3

## 0.3.0 - Eliminating Brute Force
* First attempt at eliminating the brute force array scanning approach of the past versions.  Still much work to be done.

* New Operators Added (see doc/Reference.md)

  * THEN (or '|') used to pipeline Query Steps
  * EACH (or '<:') used to emit individual Array elements
  * FIRST (or ':>') used to emit the first element of an Array

## 0.2.0 - First Stable Release
* The library is stable enough now for a general release.

* There is a new build system that attempts to keep the Jison-generated parser from polluting the global namespace.

* Some basic Nodeunit tests have been added.  These will evolve.

## 0.1.0 - Initial Release (Unstable)
* The query language syntax shouldn't change very much between now and 1.0, and the hope is that any future changes will be additive and backward compatible.

* This release does absolutely no optimization, either in query analysis or in the execution of dynamic queries.  These will come in unstable future releases.

* There is currently no test suite.  This will change.
