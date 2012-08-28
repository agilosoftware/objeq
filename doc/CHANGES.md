# Change History

## Known Bugs
* There is still some functionality missing, specifically the results of dynamic queries probably need a 'destroy' method, otherwise their registered listeners will keep them from being garbage collected.

* Synthesized results (those using the array and object literal syntax) are presently not consistent between refreshes of a dynamic query and will become stale or orphaned if the source data is modified.  This will be addressed when optimizations for dynamic queries are introduced.

* Even though it's only necessary for the results of dynamic queries, everything is decorated right now.

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
