// The goal here is to create a Jison Parser that doesn't
// pollute the global namespace. It should be capable of
// being used both from the browser and from node.js

var fs = require("fs")
  , jison = require("jison")
  , IO = require("jison/lib/jison/util/io")
  , bnf = require("jison/lib/jison/bnf")
  , uglify = require("uglify-js");

var TermCodes = {
  "error_prefix": "\u001B[31m",
  "error_suffix": "\u001B[39m",
  "ok_prefix": "\u001B[32m",
  "ok_suffix": "\u001B[39m",
  "bold_prefix": "\u001B[1m",
  "bold_suffix": "\u001B[22m"
};

var grammarFilename = "./objeq/objeq-parser.y"
  , parserFilename = "./objeq/objeq-parser.js"
  , objeqFilename = "./objeq/objeq.js"
  , minifiedFilename = "./objeq.min.js";

function fmt(type, value) {
  if ( !process.stdout.isTTY ) return value;
  return TermCodes[type+"_prefix"] + value + TermCodes[type+"_suffix"];
}

console.log(fmt("bold", "Starting objeq Build"));

try {
  var raw = IO.read(IO.join(IO.cwd(), grammarFilename));
  var grammar = bnf.parse(raw);
}
catch ( err ) {
  console.log(fmt("error", 'Oops! Error reading Grammer'));
  console.log('Reason: '+err);
  console.log();
  process.exit(1);
}
console.log("✔ Parsed objeq Grammar");

try {
  var options = {
    moduleType: 'js'
  };
  var parser = new jison.Parser(grammar, options);
  var parserCode = parser.generate(options);
}
catch ( err ) {
  console.log(fmt("error", 'Oops! Error generating Parser'));
  console.log('Reason: '+err);
  console.log();
  process.exit(2);
}
console.log("✔ Generated objeq Parser");

var replaceString = "var parser = (function(){";
if ( parserCode.indexOf(replaceString) === -1 ) {
  console.log(fmt("error", 'Oops! Assignment not found in Parser!'));
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

try {
  fs.writeFileSync(parserFilename, out + endCode);
}
catch ( err ) {
  console.log(fmt("error", 'Oops! Error writing Parser'));
  console.log('Reason: '+err);
  console.log();
  process.exit(4);
}
console.log("✔ Wrote " + parserFilename);

// Now use Uglify to compress the JavaScript
try {
  var objeqCode = fs.readFileSync(objeqFilename);
}
catch ( err ) {
  console.log(fmt("error", 'Oops! Error reading objeq Processor Code'));
  console.log('Reason: '+err);
  console.log();
  process.exit(5);
}

var origCode = objeqCode + "\n" + parserCode.replace(replaceString, minCode)
  , result = uglify.minify(origCode, { fromString: true })
  , finalCode = result.code;
console.log("✔ Minified Parser and Processor");

try {
  fs.writeFileSync(minifiedFilename, finalCode);
}
catch ( err ) {
  console.log(fmt("error", 'Oops! Error writing Minified Code'));
  console.log('Reason: '+err);
  console.log();
  process.exit(6);
}
console.log("✔ Wrote " + minifiedFilename);

console.log(fmt("ok", "Finished!"));
