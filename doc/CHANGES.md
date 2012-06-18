# Change History

## 0.1.0 - Initial Release (Unstable)

### Notes
* The query language syntax shouldn't change very much between now and 1.0, and the hope is that any future changes will be additive and backward compatible.

* This release does absolutely no optimization, either in query analysis or in the execution of dynamic queries.  These will come in unstable future releases.

* There is currently no test suite.  This will change.

### Known Bugs
* There is still some functionality missing, specifically the results of dynamic queries probably need a 'destroy' method, otherwise their registered listeners will keep them from being garbage collected.

* Synthesized results (those using the array and object literal syntax) are presently not consistent between refreshes of a dynamic query and will become stale or orphaned if the source data is modified.  This will be addressed when optimizations for dynamic queries are introduced.
