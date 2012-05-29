#!/bin/sh
jison objeq-parser.y -m js -o "\$objeqParser.js"
mv "\$objeqParser.js" objeq-parser.js
