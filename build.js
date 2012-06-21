// The goal here is to create a Jison Parser that doesn't
// pollute the global namespace. It should be capable of
// being used both from the browser and from node.js

console.log("Starting objeq Build:");

var fs = require("fs");
var jison = require("jison/");
var IO = require("jison/lib/jison/util/io");
var bnf = require("jison/lib/jison/bnf");
var jsp = require("uglify-js").parser;
var pro = require("uglify-js").uglify;

console.log("* Parsing objeq Grammar"); // ************************************
try {
  var raw = IO.read(IO.join(IO.cwd(), "objeq/objeq-parser.y"));
  var grammar = bnf.parse(raw);
}
catch ( err ) {
  console.log('Oops! Error reading Grammer');
  console.log('Reason: '+err);
  console.log();
  process.exit(1);
}

console.log("* Generating objeq Parser"); // **********************************
try {
  var options = {
    moduleType: 'js'
  };
  var parser = new jison.Parser(grammar, options);
  var parserCode = parser.generate(options);
}
catch ( err ) {
  console.log('Oops! Error generating Parser');
  console.log('Reason: '+err);
  console.log();
  process.exit(2);
}

var replaceString = "var parser = (function(){";
if ( parserCode.indexOf(replaceString) === -1 ) {
  console.log('Oops! Assignment string not found in generated Parser!');
  console.log();
  process.exit(3);
}

var minCode = "\n" +
  "this.$objeq.parser = (function () {";

var startCode = "\n" +
  "if ( !this.$objeq ) this.$objeq = {};\n" +
  "this.$objeq.parser = (function () {";

var endCode = "\n" +
  "if ( typeof exports !== 'undefined' ) {\n" +
  "  if ( typeof module !== 'undefined' && module.exports ) {\n" +
  "    exports = module.exports = this.$objeq.parser.Parser;\n" +
  "  }\n" +
  "  exports.Parser = this.$objeq.parser.Parser;\n" +
  "}\n";

var out = parserCode.replace(replaceString, startCode);

console.log("* Writing ./objeq/objeq-parser.js"); // **************************
fs.writeFile("./objeq/objeq-parser.js", out + endCode, function(err) {
  if ( !err ) return;
  console.log('Oops! Error writing Parser');
  console.log('Reason: '+err);
  console.log();
  process.exit(4);
});

// Now use Uglify to compress the JavaScript
console.log("* Minifying Parser and Processor"); // ***************************
try {
  var objeqCode = fs.readFileSync("./objeq/objeq.js");
}
catch ( err ) {
  console.log('Oops! Error reading objeq Processor Code');
  console.log('Reason: '+err);
  console.log();
  process.exit(5);
}

var origCode = objeqCode + "\n" + parserCode.replace(replaceString, minCode);
var ast = jsp.parse(origCode);
ast = pro.ast_mangle(ast);
ast = pro.ast_squeeze(ast);
var finalCode = pro.gen_code(ast);

console.log("* Writing ./objeq.min.js"); // ***********************************
fs.writeFile("./objeq.min.js", finalCode, function(err) {
  if ( !err ) return;
  console.log('Oops! Error writing Minified Code');
  console.log('Reason: '+err);
  console.log();
  process.exit(6);
});

console.log("Finished!");
