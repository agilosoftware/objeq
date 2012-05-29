/* Jison generated parser */
var $objeqParser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"query":3,"expr":4,"EOF":5,"+":6,"-":7,"*":8,"/":9,"%":10,"AND":11,"OR":12,"EQ":13,"NEQ":14,"GT":15,"GTE":16,"LT":17,"LTE":18,"NOT":19,"(":20,")":21,"NUMBER":22,"STRING":23,"TRUE":24,"FALSE":25,"NULL":26,"UNDEFINED":27,"path":28,"ARGREF":29,"IDENT":30,".":31,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"+",7:"-",8:"*",9:"/",10:"%",11:"AND",12:"OR",13:"EQ",14:"NEQ",15:"GT",16:"GTE",17:"LT",18:"LTE",19:"NOT",20:"(",21:")",22:"NUMBER",23:"STRING",24:"TRUE",25:"FALSE",26:"NULL",27:"UNDEFINED",29:"ARGREF",30:"IDENT",31:"."},
productions_: [0,[3,2],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,2],[4,2],[4,3],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[28,1],[28,1],[28,3]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: return $$[$0-1]; 
break;
case 2: this.$ = ['add', $$[$0-2], $$[$0]]; 
break;
case 3: this.$ = ['sub', $$[$0-2], $$[$0]]; 
break;
case 4: this.$ = ['mul', $$[$0-2], $$[$0]]; 
break;
case 5: this.$ = ['div', $$[$0-2], $$[$0]]; 
break;
case 6: this.$ = ['mod', $$[$0-2], $$[$0]]; 
break;
case 7: this.$ = ['and', $$[$0-2], $$[$0]]; 
break;
case 8: this.$ = ['or', $$[$0-2], $$[$0]]; 
break;
case 9: this.$ = ['eq', $$[$0-2], $$[$0]]; 
break;
case 10: this.$ = ['neq', $$[$0-2], $$[$0]]; 
break;
case 11: this.$ = ['gt', $$[$0-2], $$[$0]]; 
break;
case 12: this.$ = ['gte', $$[$0-2], $$[$0]]; 
break;
case 13: this.$ = ['lt', $$[$0-2], $$[$0]]; 
break;
case 14: this.$ = ['lte', $$[$0-2], $$[$0]]; 
break;
case 15: this.$ = ['not', $$[$0]]; 
break;
case 16: this.$ = ['neg', $$[$0]]; 
break;
case 17: this.$ = $$[$0-1]; 
break;
case 18: this.$ = Number(yytext); 
break;
case 19: this.$ = yytext; 
break;
case 20: this.$ = true; 
break;
case 21: this.$ = false; 
break;
case 22: this.$ = null; 
break;
case 23: this.$ = undefined; 
break;
case 24: this.$ = $$[$0]; 
break;
case 25: this.$ = ['path', Number($$[$0])-1]; 
break;
case 26: this.$ = ['path', $$[$0]]; 
break;
case 27: this.$ = $$[$0-2]; $$[$0-2].push($$[$0]); 
break;
}
},
table: [{3:1,4:2,7:[1,4],19:[1,3],20:[1,5],22:[1,6],23:[1,7],24:[1,8],25:[1,9],26:[1,10],27:[1,11],28:12,29:[1,13],30:[1,14]},{1:[3]},{5:[1,15],6:[1,16],7:[1,17],8:[1,18],9:[1,19],10:[1,20],11:[1,21],12:[1,22],13:[1,23],14:[1,24],15:[1,25],16:[1,26],17:[1,27],18:[1,28]},{4:29,7:[1,4],19:[1,3],20:[1,5],22:[1,6],23:[1,7],24:[1,8],25:[1,9],26:[1,10],27:[1,11],28:12,29:[1,13],30:[1,14]},{4:30,7:[1,4],19:[1,3],20:[1,5],22:[1,6],23:[1,7],24:[1,8],25:[1,9],26:[1,10],27:[1,11],28:12,29:[1,13],30:[1,14]},{4:31,7:[1,4],19:[1,3],20:[1,5],22:[1,6],23:[1,7],24:[1,8],25:[1,9],26:[1,10],27:[1,11],28:12,29:[1,13],30:[1,14]},{5:[2,18],6:[2,18],7:[2,18],8:[2,18],9:[2,18],10:[2,18],11:[2,18],12:[2,18],13:[2,18],14:[2,18],15:[2,18],16:[2,18],17:[2,18],18:[2,18],21:[2,18]},{5:[2,19],6:[2,19],7:[2,19],8:[2,19],9:[2,19],10:[2,19],11:[2,19],12:[2,19],13:[2,19],14:[2,19],15:[2,19],16:[2,19],17:[2,19],18:[2,19],21:[2,19]},{5:[2,20],6:[2,20],7:[2,20],8:[2,20],9:[2,20],10:[2,20],11:[2,20],12:[2,20],13:[2,20],14:[2,20],15:[2,20],16:[2,20],17:[2,20],18:[2,20],21:[2,20]},{5:[2,21],6:[2,21],7:[2,21],8:[2,21],9:[2,21],10:[2,21],11:[2,21],12:[2,21],13:[2,21],14:[2,21],15:[2,21],16:[2,21],17:[2,21],18:[2,21],21:[2,21]},{5:[2,22],6:[2,22],7:[2,22],8:[2,22],9:[2,22],10:[2,22],11:[2,22],12:[2,22],13:[2,22],14:[2,22],15:[2,22],16:[2,22],17:[2,22],18:[2,22],21:[2,22]},{5:[2,23],6:[2,23],7:[2,23],8:[2,23],9:[2,23],10:[2,23],11:[2,23],12:[2,23],13:[2,23],14:[2,23],15:[2,23],16:[2,23],17:[2,23],18:[2,23],21:[2,23]},{5:[2,24],6:[2,24],7:[2,24],8:[2,24],9:[2,24],10:[2,24],11:[2,24],12:[2,24],13:[2,24],14:[2,24],15:[2,24],16:[2,24],17:[2,24],18:[2,24],21:[2,24],31:[1,32]},{5:[2,25],6:[2,25],7:[2,25],8:[2,25],9:[2,25],10:[2,25],11:[2,25],12:[2,25],13:[2,25],14:[2,25],15:[2,25],16:[2,25],17:[2,25],18:[2,25],21:[2,25],31:[2,25]},{5:[2,26],6:[2,26],7:[2,26],8:[2,26],9:[2,26],10:[2,26],11:[2,26],12:[2,26],13:[2,26],14:[2,26],15:[2,26],16:[2,26],17:[2,26],18:[2,26],21:[2,26],31:[2,26]},{1:[2,1]},{4:33,7:[1,4],19:[1,3],20:[1,5],22:[1,6],23:[1,7],24:[1,8],25:[1,9],26:[1,10],27:[1,11],28:12,29:[1,13],30:[1,14]},{4:34,7:[1,4],19:[1,3],20:[1,5],22:[1,6],23:[1,7],24:[1,8],25:[1,9],26:[1,10],27:[1,11],28:12,29:[1,13],30:[1,14]},{4:35,7:[1,4],19:[1,3],20:[1,5],22:[1,6],23:[1,7],24:[1,8],25:[1,9],26:[1,10],27:[1,11],28:12,29:[1,13],30:[1,14]},{4:36,7:[1,4],19:[1,3],20:[1,5],22:[1,6],23:[1,7],24:[1,8],25:[1,9],26:[1,10],27:[1,11],28:12,29:[1,13],30:[1,14]},{4:37,7:[1,4],19:[1,3],20:[1,5],22:[1,6],23:[1,7],24:[1,8],25:[1,9],26:[1,10],27:[1,11],28:12,29:[1,13],30:[1,14]},{4:38,7:[1,4],19:[1,3],20:[1,5],22:[1,6],23:[1,7],24:[1,8],25:[1,9],26:[1,10],27:[1,11],28:12,29:[1,13],30:[1,14]},{4:39,7:[1,4],19:[1,3],20:[1,5],22:[1,6],23:[1,7],24:[1,8],25:[1,9],26:[1,10],27:[1,11],28:12,29:[1,13],30:[1,14]},{4:40,7:[1,4],19:[1,3],20:[1,5],22:[1,6],23:[1,7],24:[1,8],25:[1,9],26:[1,10],27:[1,11],28:12,29:[1,13],30:[1,14]},{4:41,7:[1,4],19:[1,3],20:[1,5],22:[1,6],23:[1,7],24:[1,8],25:[1,9],26:[1,10],27:[1,11],28:12,29:[1,13],30:[1,14]},{4:42,7:[1,4],19:[1,3],20:[1,5],22:[1,6],23:[1,7],24:[1,8],25:[1,9],26:[1,10],27:[1,11],28:12,29:[1,13],30:[1,14]},{4:43,7:[1,4],19:[1,3],20:[1,5],22:[1,6],23:[1,7],24:[1,8],25:[1,9],26:[1,10],27:[1,11],28:12,29:[1,13],30:[1,14]},{4:44,7:[1,4],19:[1,3],20:[1,5],22:[1,6],23:[1,7],24:[1,8],25:[1,9],26:[1,10],27:[1,11],28:12,29:[1,13],30:[1,14]},{4:45,7:[1,4],19:[1,3],20:[1,5],22:[1,6],23:[1,7],24:[1,8],25:[1,9],26:[1,10],27:[1,11],28:12,29:[1,13],30:[1,14]},{5:[2,15],6:[2,15],7:[2,15],8:[2,15],9:[2,15],10:[2,15],11:[2,15],12:[2,15],13:[2,15],14:[2,15],15:[2,15],16:[2,15],17:[2,15],18:[2,15],21:[2,15]},{5:[2,16],6:[2,16],7:[2,16],8:[2,16],9:[2,16],10:[2,16],11:[2,16],12:[2,16],13:[2,16],14:[2,16],15:[2,16],16:[2,16],17:[2,16],18:[2,16],21:[2,16]},{6:[1,16],7:[1,17],8:[1,18],9:[1,19],10:[1,20],11:[1,21],12:[1,22],13:[1,23],14:[1,24],15:[1,25],16:[1,26],17:[1,27],18:[1,28],21:[1,46]},{30:[1,47]},{5:[2,2],6:[2,2],7:[2,2],8:[1,18],9:[1,19],10:[1,20],11:[1,21],12:[1,22],13:[1,23],14:[1,24],15:[1,25],16:[1,26],17:[1,27],18:[1,28],21:[2,2]},{5:[2,3],6:[2,3],7:[2,3],8:[1,18],9:[1,19],10:[1,20],11:[1,21],12:[1,22],13:[1,23],14:[1,24],15:[1,25],16:[1,26],17:[1,27],18:[1,28],21:[2,3]},{5:[2,4],6:[2,4],7:[2,4],8:[2,4],9:[2,4],10:[1,20],11:[1,21],12:[1,22],13:[1,23],14:[1,24],15:[1,25],16:[1,26],17:[1,27],18:[1,28],21:[2,4]},{5:[2,5],6:[2,5],7:[2,5],8:[2,5],9:[2,5],10:[1,20],11:[1,21],12:[1,22],13:[1,23],14:[1,24],15:[1,25],16:[1,26],17:[1,27],18:[1,28],21:[2,5]},{5:[2,6],6:[2,6],7:[2,6],8:[2,6],9:[2,6],10:[2,6],11:[1,21],12:[1,22],13:[1,23],14:[1,24],15:[1,25],16:[1,26],17:[1,27],18:[1,28],21:[2,6]},{5:[2,7],6:[2,7],7:[2,7],8:[2,7],9:[2,7],10:[2,7],11:[2,7],12:[2,7],13:[1,23],14:[1,24],15:[1,25],16:[1,26],17:[1,27],18:[1,28],21:[2,7]},{5:[2,8],6:[2,8],7:[2,8],8:[2,8],9:[2,8],10:[2,8],11:[2,8],12:[2,8],13:[1,23],14:[1,24],15:[1,25],16:[1,26],17:[1,27],18:[1,28],21:[2,8]},{5:[2,9],6:[2,9],7:[2,9],8:[2,9],9:[2,9],10:[2,9],11:[2,9],12:[2,9],13:[2,9],14:[2,9],15:[2,9],16:[2,9],17:[2,9],18:[2,9],21:[2,9]},{5:[2,10],6:[2,10],7:[2,10],8:[2,10],9:[2,10],10:[2,10],11:[2,10],12:[2,10],13:[2,10],14:[2,10],15:[2,10],16:[2,10],17:[2,10],18:[2,10],21:[2,10]},{5:[2,11],6:[2,11],7:[2,11],8:[2,11],9:[2,11],10:[2,11],11:[2,11],12:[2,11],13:[2,11],14:[2,11],15:[2,11],16:[2,11],17:[2,11],18:[2,11],21:[2,11]},{5:[2,12],6:[2,12],7:[2,12],8:[2,12],9:[2,12],10:[2,12],11:[2,12],12:[2,12],13:[2,12],14:[2,12],15:[2,12],16:[2,12],17:[2,12],18:[2,12],21:[2,12]},{5:[2,13],6:[2,13],7:[2,13],8:[2,13],9:[2,13],10:[2,13],11:[2,13],12:[2,13],13:[2,13],14:[2,13],15:[2,13],16:[2,13],17:[2,13],18:[2,13],21:[2,13]},{5:[2,14],6:[2,14],7:[2,14],8:[2,14],9:[2,14],10:[2,14],11:[2,14],12:[2,14],13:[2,14],14:[2,14],15:[2,14],16:[2,14],17:[2,14],18:[2,14],21:[2,14]},{5:[2,17],6:[2,17],7:[2,17],8:[2,17],9:[2,17],10:[2,17],11:[2,17],12:[2,17],13:[2,17],14:[2,17],15:[2,17],16:[2,17],17:[2,17],18:[2,17],21:[2,17]},{5:[2,27],6:[2,27],7:[2,27],8:[2,27],9:[2,27],10:[2,27],11:[2,27],12:[2,27],13:[2,27],14:[2,27],15:[2,27],16:[2,27],17:[2,27],18:[2,27],21:[2,27],31:[2,27]}],
defaultActions: {15:[2,1]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this,
        stack = [0],
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    //this.reductionCount = this.shiftCount = 0;

    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == 'undefined')
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);

    if (typeof this.yy.parseError === 'function')
        this.parseError = this.yy.parseError;

    function popStack (n) {
        stack.length = stack.length - 2*n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

    function lex() {
        var token;
        token = self.lexer.lex() || 1; // $end = 1
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval={},p,len,newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length-1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

        // handle parse error
        _handle_error:
        if (typeof action === 'undefined' || !action.length || !action[0]) {

            var errStr = '';
            if (!recovering) {
                // Report error
                expected = [];
                for (p in table[state]) if (this.terminals_[p] && p > 2) {
                    expected.push("'"+this.terminals_[p]+"'");
                }
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + (this.terminals_[symbol] || symbol)+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == 1 /*EOF*/ ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr,
                    {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol == EOF) {
                    throw new Error(errStr || 'Parsing halted.');
                }

                // discard current lookahead and grab another
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            while (1) {
                // check for error recovery rule in this state
                if ((TERROR.toString()) in table[state]) {
                    break;
                }
                if (state === 0) {
                    throw new Error(errStr || 'Parsing halted.');
                }
                popStack(1);
                state = stack[stack.length-1];
            }

            preErrorSymbol = symbol == 2 ? null : symbol; // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {

            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = this.lexer.yyleng;
                    yytext = this.lexer.yytext;
                    yylineno = this.lexer.yylineno;
                    yyloc = this.lexer.yylloc;
                    if (recovering > 0)
                        recovering--;
                } else { // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2: // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3: // accept
                return true;
        }

    }

    return true;
}};
/* Jison generated lexer */
var lexer = (function(){
var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext+=ch;
        this.yyleng++;
        this.match+=ch;
        this.matched+=ch;
        var lines = ch.match(/\n/);
        if (lines) this.yylineno++;
        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        this._input = ch + this._input;
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
less:function (n) {
        this._input = this.match.slice(n) + this._input;
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            tempMatch,
            index,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex) break;
            }
        }
        if (match) {
            lines = match[0].match(/\n.*/g);
            if (lines) this.yylineno += lines.length;
            this.yylloc = {first_line: this.yylloc.last_line,
                           last_line: this.yylineno+1,
                           first_column: this.yylloc.last_column,
                           last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match[0].length};
            this.yytext += match[0];
            this.match += match[0];
            this.yyleng = this.yytext.length;
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
            if (this.done && this._input) this.done = false;
            if (token) return token;
            else return;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    }});
lexer.options = {};
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:return 22;
break;
case 1:
  yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 23;

break;
case 2:
  yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 23;

break;
case 3:
  yy_.yytext = yy_.yytext.substr(1); return 29;

break;
case 4:/* skip whitespace */
break;
case 5:return 20;
break;
case 6:return 21;
break;
case 7:return 31;
break;
case 8:return 13;
break;
case 9:return 14;
break;
case 10:return 18;
break;
case 11:return 16;
break;
case 12:return 17;
break;
case 13:return 15;
break;
case 14:return 6;
break;
case 15:return 7;
break;
case 16:return 8;
break;
case 17:return 9;
break;
case 18:return 10;
break;
case 19:return 19;
break;
case 20:return 19;
break;
case 21:return 11;
break;
case 22:return 11;
break;
case 23:return 12;
break;
case 24:return 12;
break;
case 25:return 24;
break;
case 26:return 25;
break;
case 27:return 26;
break;
case 28:return 27;
break;
case 29:return 30;
break;
case 30:return 5;
break;
case 31:return 'INVALID';
break;
}
};
lexer.rules = [/^(?:(-?(?:[0-9]|[1-9][0-9]+))((?:\.[0-9]+))?((?:[eE][-+]?[0-9]+))?\b)/,/^(?:"(\\x[a-fA-F0-9]{2}|\\u[a-fA-F0-9]{4}|\\[^xu]|[^"(\\)\n])*")/,/^(?:'(\\['bfvnrt/(\\)]|\\u[a-fA-F0-9]{4}|[^'(\\)])*')/,/^(?:%[1-9][0-9]*)/,/^(?:\s+)/,/^(?:\()/,/^(?:\))/,/^(?:\.)/,/^(?:==)/,/^(?:!=)/,/^(?:<=)/,/^(?:>=)/,/^(?:<)/,/^(?:>)/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:\/)/,/^(?:%)/,/^(?:not\b)/,/^(?:!)/,/^(?:and\b)/,/^(?:&&)/,/^(?:or\b)/,/^(?:\|\|)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:null\b)/,/^(?:undefined\b)/,/^(?:[A-Za-z_$][A-Za-z_$0-9-]*)/,/^(?:$)/,/^(?:.)/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],"inclusive":true}};
return lexer;})()
parser.lexer = lexer;function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();