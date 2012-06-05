#!/bin/sh
jison objeq-parser.y -m commonjs -o "\$objeqParser.js"
mv "\$objeqParser.js" objeq-parser.js
