#!/bin/sh
jison objeq-parser.y -m commonjs -o "\$objeqParser.js"
mv "\$objeqParser.js" objeq-parser.js

cat objeq-parser.js objeq.js > "\$objeqBuildInput.js"
uglifyjs "\$objeqBuildInput.js" > objeq.min.js
rm "\$objeqBuildInput.js"
