#!/bin/sh
jison src/objeq-parser.y -m commonjs -o "src/\$objeqParser.js"
mv "src/\$objeqParser.js" src/objeq-parser.js

cat src/objeq-parser.js src/objeq.js > "src/\$objeqBuildInput.js"
uglifyjs "src/\$objeqBuildInput.js" > objeq.min.js
rm "src/\$objeqBuildInput.js"
