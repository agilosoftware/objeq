#!/bin/sh
jison objeq/objeq-parser.y -m commonjs -o "objeq/\$objeqParser.js"
mv "objeq/\$objeqParser.js" objeq/objeq-parser.js

cat objeq/objeq-parser.js objeq/objeq.js > "objeq/\$objeqBuildInput.js"
uglifyjs "objeq/\$objeqBuildInput.js" > objeq.min.js
rm "objeq/\$objeqBuildInput.js"
