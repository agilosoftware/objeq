# objeq (JavaScript Object Querying)

## Change History

### 0.1.0 - Initial Release

* The query language syntax shouldn't change very much between now and 1.0, and the hope is that any future changes will be additive and backward compatible.

* There is still some functionality missing, specifically the results of dynamic queries probably need a 'destroy' method, otherwise their registered listeners will keep them from being garbage collected.

* This release does absolutely no optimization, either in query analysis or in the execution of dynamic queries.  These will come in unstable future releases.

* There is currently no test suite.  This will change.
