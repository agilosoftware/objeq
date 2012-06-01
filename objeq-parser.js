/* Jison generated parser */
var $objeqParser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"program":3,"query":4,"EOF":5,"expr":6,"filter":7,"order_by":8,"select":9,"+":10,"-":11,"*":12,"/":13,"%":14,"AND":15,"OR":16,"EQ":17,"NEQ":18,"GT":19,"GTE":20,"LT":21,"LTE":22,"IN":23,"NOT":24,"(":25,")":26,"array":27,"NUMBER":28,"STRING":29,"TRUE":30,"FALSE":31,"NULL":32,"UNDEFINED":33,"path":34,"[":35,"array_list":36,"]":37,",":38,"SELECT":39,"ORDER_BY":40,"order_list":41,"order_spec":42,"ASC":43,"DESC":44,"ARGREF":45,"IDENT":46,".":47,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",10:"+",11:"-",12:"*",13:"/",14:"%",15:"AND",16:"OR",17:"EQ",18:"NEQ",19:"GT",20:"GTE",21:"LT",22:"LTE",23:"IN",24:"NOT",25:"(",26:")",28:"NUMBER",29:"STRING",30:"TRUE",31:"FALSE",32:"NULL",33:"UNDEFINED",35:"[",37:"]",38:",",39:"SELECT",40:"ORDER_BY",43:"ASC",44:"DESC",45:"ARGREF",46:"IDENT",47:"."},
productions_: [0,[3,2],[4,1],[4,1],[4,2],[7,1],[7,2],[7,1],[7,2],[6,3],[6,3],[6,3],[6,3],[6,3],[6,3],[6,3],[6,3],[6,3],[6,3],[6,3],[6,3],[6,3],[6,3],[6,2],[6,2],[6,3],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[27,3],[27,2],[36,1],[36,3],[9,2],[8,2],[41,1],[41,3],[42,1],[42,2],[42,2],[34,1],[34,1],[34,3]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: return $$[$0-1]; 
break;
case 2: this.$ = { expr: $$[$0] }; 
break;
case 3: this.$ = $$[$0]; $$[$0].expr = true; 
break;
case 4: this.$ = $$[$0]; $$[$0].expr = $$[$0-1]; 
break;
case 5: this.$ = { order: $$[$0], sortFirst: true }; 
break;
case 6: this.$ = { order: $$[$0-1], select: $$[$0], sortFirst: true }; 
break;
case 7: this.$ = { select: $$[$0] }; 
break;
case 8: this.$ = { select: $$[$0-1], order: $$[$0] }; 
break;
case 9: this.$ = ['add', $$[$0-2], $$[$0]]; 
break;
case 10: this.$ = ['sub', $$[$0-2], $$[$0]]; 
break;
case 11: this.$ = ['mul', $$[$0-2], $$[$0]]; 
break;
case 12: this.$ = ['div', $$[$0-2], $$[$0]]; 
break;
case 13: this.$ = ['mod', $$[$0-2], $$[$0]]; 
break;
case 14: this.$ = ['and', $$[$0-2], $$[$0]]; 
break;
case 15: this.$ = ['or', $$[$0-2], $$[$0]]; 
break;
case 16: this.$ = ['eq', $$[$0-2], $$[$0]]; 
break;
case 17: this.$ = ['neq', $$[$0-2], $$[$0]]; 
break;
case 18: this.$ = ['gt', $$[$0-2], $$[$0]]; 
break;
case 19: this.$ = ['gte', $$[$0-2], $$[$0]]; 
break;
case 20: this.$ = ['lt', $$[$0-2], $$[$0]]; 
break;
case 21: this.$ = ['lte', $$[$0-2], $$[$0]]; 
break;
case 22: this.$ = ['in', $$[$0-2], $$[$0]]; 
break;
case 23: this.$ = ['not', $$[$0]]; 
break;
case 24: this.$ = ['neg', $$[$0]]; 
break;
case 25: this.$ = $$[$0-1]; 
break;
case 26: this.$ = $$[$0]; 
break;
case 27: this.$ = Number(yytext); 
break;
case 28: this.$ = yytext; 
break;
case 29: this.$ = true; 
break;
case 30: this.$ = false; 
break;
case 31: this.$ = null; 
break;
case 32: this.$ = undefined; 
break;
case 33: this.$ = $$[$0]; 
break;
case 34: this.$ = ['arr', $$[$0-1]]; 
break;
case 35: this.$ = ['arr', []]; 
break;
case 36: this.$ = [$$[$0]]; 
break;
case 37: this.$ = $$[$0-2]; $$[$0-2].push($$[$0]); 
break;
case 38: this.$ = $$[$0]; 
break;
case 39: this.$ = $$[$0]; 
break;
case 40: this.$ = [$$[$0]]; 
break;
case 41: this.$ = $$[$0-2]; $$[$0-2].push($$[$0]); 
break;
case 42: this.$ = { path: $$[$0], ascending: true }; 
break;
case 43: this.$ = { path: $$[$0-1], ascending: true }; 
break;
case 44: this.$ = { path: $$[$0-1] }; 
break;
case 45: this.$ = ['path', Number($$[$0])-1]; 
break;
case 46: this.$ = ['path', $$[$0]]; 
break;
case 47: this.$ = $$[$0-2]; $$[$0-2].push($$[$0]); 
break;
}
},
table: [{3:1,4:2,6:3,7:4,8:16,9:17,11:[1,6],24:[1,5],25:[1,7],27:8,28:[1,9],29:[1,10],30:[1,11],31:[1,12],32:[1,13],33:[1,14],34:15,35:[1,18],39:[1,22],40:[1,21],45:[1,19],46:[1,20]},{1:[3]},{5:[1,23]},{5:[2,2],7:24,8:16,9:17,10:[1,25],11:[1,26],12:[1,27],13:[1,28],14:[1,29],15:[1,30],16:[1,31],17:[1,32],18:[1,33],19:[1,34],20:[1,35],21:[1,36],22:[1,37],23:[1,38],39:[1,22],40:[1,21]},{5:[2,3]},{6:39,11:[1,6],24:[1,5],25:[1,7],27:8,28:[1,9],29:[1,10],30:[1,11],31:[1,12],32:[1,13],33:[1,14],34:15,35:[1,18],45:[1,19],46:[1,20]},{6:40,11:[1,6],24:[1,5],25:[1,7],27:8,28:[1,9],29:[1,10],30:[1,11],31:[1,12],32:[1,13],33:[1,14],34:15,35:[1,18],45:[1,19],46:[1,20]},{6:41,11:[1,6],24:[1,5],25:[1,7],27:8,28:[1,9],29:[1,10],30:[1,11],31:[1,12],32:[1,13],33:[1,14],34:15,35:[1,18],45:[1,19],46:[1,20]},{5:[2,26],10:[2,26],11:[2,26],12:[2,26],13:[2,26],14:[2,26],15:[2,26],16:[2,26],17:[2,26],18:[2,26],19:[2,26],20:[2,26],21:[2,26],22:[2,26],23:[2,26],26:[2,26],37:[2,26],38:[2,26],39:[2,26],40:[2,26]},{5:[2,27],10:[2,27],11:[2,27],12:[2,27],13:[2,27],14:[2,27],15:[2,27],16:[2,27],17:[2,27],18:[2,27],19:[2,27],20:[2,27],21:[2,27],22:[2,27],23:[2,27],26:[2,27],37:[2,27],38:[2,27],39:[2,27],40:[2,27]},{5:[2,28],10:[2,28],11:[2,28],12:[2,28],13:[2,28],14:[2,28],15:[2,28],16:[2,28],17:[2,28],18:[2,28],19:[2,28],20:[2,28],21:[2,28],22:[2,28],23:[2,28],26:[2,28],37:[2,28],38:[2,28],39:[2,28],40:[2,28]},{5:[2,29],10:[2,29],11:[2,29],12:[2,29],13:[2,29],14:[2,29],15:[2,29],16:[2,29],17:[2,29],18:[2,29],19:[2,29],20:[2,29],21:[2,29],22:[2,29],23:[2,29],26:[2,29],37:[2,29],38:[2,29],39:[2,29],40:[2,29]},{5:[2,30],10:[2,30],11:[2,30],12:[2,30],13:[2,30],14:[2,30],15:[2,30],16:[2,30],17:[2,30],18:[2,30],19:[2,30],20:[2,30],21:[2,30],22:[2,30],23:[2,30],26:[2,30],37:[2,30],38:[2,30],39:[2,30],40:[2,30]},{5:[2,31],10:[2,31],11:[2,31],12:[2,31],13:[2,31],14:[2,31],15:[2,31],16:[2,31],17:[2,31],18:[2,31],19:[2,31],20:[2,31],21:[2,31],22:[2,31],23:[2,31],26:[2,31],37:[2,31],38:[2,31],39:[2,31],40:[2,31]},{5:[2,32],10:[2,32],11:[2,32],12:[2,32],13:[2,32],14:[2,32],15:[2,32],16:[2,32],17:[2,32],18:[2,32],19:[2,32],20:[2,32],21:[2,32],22:[2,32],23:[2,32],26:[2,32],37:[2,32],38:[2,32],39:[2,32],40:[2,32]},{5:[2,33],10:[2,33],11:[2,33],12:[2,33],13:[2,33],14:[2,33],15:[2,33],16:[2,33],17:[2,33],18:[2,33],19:[2,33],20:[2,33],21:[2,33],22:[2,33],23:[2,33],26:[2,33],37:[2,33],38:[2,33],39:[2,33],40:[2,33],47:[1,42]},{5:[2,5],9:43,39:[1,22]},{5:[2,7],8:44,40:[1,21]},{6:47,11:[1,6],24:[1,5],25:[1,7],27:8,28:[1,9],29:[1,10],30:[1,11],31:[1,12],32:[1,13],33:[1,14],34:15,35:[1,18],36:45,37:[1,46],45:[1,19],46:[1,20]},{5:[2,45],10:[2,45],11:[2,45],12:[2,45],13:[2,45],14:[2,45],15:[2,45],16:[2,45],17:[2,45],18:[2,45],19:[2,45],20:[2,45],21:[2,45],22:[2,45],23:[2,45],26:[2,45],37:[2,45],38:[2,45],39:[2,45],40:[2,45],43:[2,45],44:[2,45],47:[2,45]},{5:[2,46],10:[2,46],11:[2,46],12:[2,46],13:[2,46],14:[2,46],15:[2,46],16:[2,46],17:[2,46],18:[2,46],19:[2,46],20:[2,46],21:[2,46],22:[2,46],23:[2,46],26:[2,46],37:[2,46],38:[2,46],39:[2,46],40:[2,46],43:[2,46],44:[2,46],47:[2,46]},{34:50,41:48,42:49,45:[1,19],46:[1,20]},{34:51,45:[1,19],46:[1,20]},{1:[2,1]},{5:[2,4]},{6:52,11:[1,6],24:[1,5],25:[1,7],27:8,28:[1,9],29:[1,10],30:[1,11],31:[1,12],32:[1,13],33:[1,14],34:15,35:[1,18],45:[1,19],46:[1,20]},{6:53,11:[1,6],24:[1,5],25:[1,7],27:8,28:[1,9],29:[1,10],30:[1,11],31:[1,12],32:[1,13],33:[1,14],34:15,35:[1,18],45:[1,19],46:[1,20]},{6:54,11:[1,6],24:[1,5],25:[1,7],27:8,28:[1,9],29:[1,10],30:[1,11],31:[1,12],32:[1,13],33:[1,14],34:15,35:[1,18],45:[1,19],46:[1,20]},{6:55,11:[1,6],24:[1,5],25:[1,7],27:8,28:[1,9],29:[1,10],30:[1,11],31:[1,12],32:[1,13],33:[1,14],34:15,35:[1,18],45:[1,19],46:[1,20]},{6:56,11:[1,6],24:[1,5],25:[1,7],27:8,28:[1,9],29:[1,10],30:[1,11],31:[1,12],32:[1,13],33:[1,14],34:15,35:[1,18],45:[1,19],46:[1,20]},{6:57,11:[1,6],24:[1,5],25:[1,7],27:8,28:[1,9],29:[1,10],30:[1,11],31:[1,12],32:[1,13],33:[1,14],34:15,35:[1,18],45:[1,19],46:[1,20]},{6:58,11:[1,6],24:[1,5],25:[1,7],27:8,28:[1,9],29:[1,10],30:[1,11],31:[1,12],32:[1,13],33:[1,14],34:15,35:[1,18],45:[1,19],46:[1,20]},{6:59,11:[1,6],24:[1,5],25:[1,7],27:8,28:[1,9],29:[1,10],30:[1,11],31:[1,12],32:[1,13],33:[1,14],34:15,35:[1,18],45:[1,19],46:[1,20]},{6:60,11:[1,6],24:[1,5],25:[1,7],27:8,28:[1,9],29:[1,10],30:[1,11],31:[1,12],32:[1,13],33:[1,14],34:15,35:[1,18],45:[1,19],46:[1,20]},{6:61,11:[1,6],24:[1,5],25:[1,7],27:8,28:[1,9],29:[1,10],30:[1,11],31:[1,12],32:[1,13],33:[1,14],34:15,35:[1,18],45:[1,19],46:[1,20]},{6:62,11:[1,6],24:[1,5],25:[1,7],27:8,28:[1,9],29:[1,10],30:[1,11],31:[1,12],32:[1,13],33:[1,14],34:15,35:[1,18],45:[1,19],46:[1,20]},{6:63,11:[1,6],24:[1,5],25:[1,7],27:8,28:[1,9],29:[1,10],30:[1,11],31:[1,12],32:[1,13],33:[1,14],34:15,35:[1,18],45:[1,19],46:[1,20]},{6:64,11:[1,6],24:[1,5],25:[1,7],27:8,28:[1,9],29:[1,10],30:[1,11],31:[1,12],32:[1,13],33:[1,14],34:15,35:[1,18],45:[1,19],46:[1,20]},{6:65,11:[1,6],24:[1,5],25:[1,7],27:8,28:[1,9],29:[1,10],30:[1,11],31:[1,12],32:[1,13],33:[1,14],34:15,35:[1,18],45:[1,19],46:[1,20]},{5:[2,23],10:[2,23],11:[2,23],12:[2,23],13:[2,23],14:[2,23],15:[2,23],16:[2,23],17:[2,23],18:[2,23],19:[2,23],20:[2,23],21:[2,23],22:[2,23],23:[2,23],26:[2,23],37:[2,23],38:[2,23],39:[2,23],40:[2,23]},{5:[2,24],10:[2,24],11:[2,24],12:[2,24],13:[2,24],14:[2,24],15:[2,24],16:[2,24],17:[2,24],18:[2,24],19:[2,24],20:[2,24],21:[2,24],22:[2,24],23:[2,24],26:[2,24],37:[2,24],38:[2,24],39:[2,24],40:[2,24]},{10:[1,25],11:[1,26],12:[1,27],13:[1,28],14:[1,29],15:[1,30],16:[1,31],17:[1,32],18:[1,33],19:[1,34],20:[1,35],21:[1,36],22:[1,37],23:[1,38],26:[1,66]},{46:[1,67]},{5:[2,6]},{5:[2,8]},{37:[1,68],38:[1,69]},{5:[2,35],10:[2,35],11:[2,35],12:[2,35],13:[2,35],14:[2,35],15:[2,35],16:[2,35],17:[2,35],18:[2,35],19:[2,35],20:[2,35],21:[2,35],22:[2,35],23:[2,35],26:[2,35],37:[2,35],38:[2,35],39:[2,35],40:[2,35]},{10:[1,25],11:[1,26],12:[1,27],13:[1,28],14:[1,29],15:[1,30],16:[1,31],17:[1,32],18:[1,33],19:[1,34],20:[1,35],21:[1,36],22:[1,37],23:[1,38],37:[2,36],38:[2,36]},{5:[2,39],38:[1,70],39:[2,39]},{5:[2,40],38:[2,40],39:[2,40]},{5:[2,42],38:[2,42],39:[2,42],43:[1,71],44:[1,72],47:[1,42]},{5:[2,38],40:[2,38],47:[1,42]},{5:[2,9],10:[2,9],11:[2,9],12:[1,27],13:[1,28],14:[1,29],15:[1,30],16:[1,31],17:[1,32],18:[1,33],19:[1,34],20:[1,35],21:[1,36],22:[1,37],23:[1,38],26:[2,9],37:[2,9],38:[2,9],39:[2,9],40:[2,9]},{5:[2,10],10:[2,10],11:[2,10],12:[1,27],13:[1,28],14:[1,29],15:[1,30],16:[1,31],17:[1,32],18:[1,33],19:[1,34],20:[1,35],21:[1,36],22:[1,37],23:[1,38],26:[2,10],37:[2,10],38:[2,10],39:[2,10],40:[2,10]},{5:[2,11],10:[2,11],11:[2,11],12:[2,11],13:[2,11],14:[1,29],15:[1,30],16:[1,31],17:[1,32],18:[1,33],19:[1,34],20:[1,35],21:[1,36],22:[1,37],23:[1,38],26:[2,11],37:[2,11],38:[2,11],39:[2,11],40:[2,11]},{5:[2,12],10:[2,12],11:[2,12],12:[2,12],13:[2,12],14:[1,29],15:[1,30],16:[1,31],17:[1,32],18:[1,33],19:[1,34],20:[1,35],21:[1,36],22:[1,37],23:[1,38],26:[2,12],37:[2,12],38:[2,12],39:[2,12],40:[2,12]},{5:[2,13],10:[2,13],11:[2,13],12:[2,13],13:[2,13],14:[2,13],15:[1,30],16:[1,31],17:[1,32],18:[1,33],19:[1,34],20:[1,35],21:[1,36],22:[1,37],23:[1,38],26:[2,13],37:[2,13],38:[2,13],39:[2,13],40:[2,13]},{5:[2,14],10:[2,14],11:[2,14],12:[2,14],13:[2,14],14:[2,14],15:[2,14],16:[2,14],17:[1,32],18:[1,33],19:[1,34],20:[1,35],21:[1,36],22:[1,37],23:[1,38],26:[2,14],37:[2,14],38:[2,14],39:[2,14],40:[2,14]},{5:[2,15],10:[2,15],11:[2,15],12:[2,15],13:[2,15],14:[2,15],15:[2,15],16:[2,15],17:[1,32],18:[1,33],19:[1,34],20:[1,35],21:[1,36],22:[1,37],23:[1,38],26:[2,15],37:[2,15],38:[2,15],39:[2,15],40:[2,15]},{5:[2,16],10:[2,16],11:[2,16],12:[2,16],13:[2,16],14:[2,16],15:[2,16],16:[2,16],17:[2,16],18:[2,16],19:[1,34],20:[1,35],21:[1,36],22:[1,37],23:[2,16],26:[2,16],37:[2,16],38:[2,16],39:[2,16],40:[2,16]},{5:[2,17],10:[2,17],11:[2,17],12:[2,17],13:[2,17],14:[2,17],15:[2,17],16:[2,17],17:[2,17],18:[2,17],19:[1,34],20:[1,35],21:[1,36],22:[1,37],23:[2,17],26:[2,17],37:[2,17],38:[2,17],39:[2,17],40:[2,17]},{5:[2,18],10:[2,18],11:[2,18],12:[2,18],13:[2,18],14:[2,18],15:[2,18],16:[2,18],17:[2,18],18:[2,18],19:[2,18],20:[2,18],21:[2,18],22:[2,18],23:[2,18],26:[2,18],37:[2,18],38:[2,18],39:[2,18],40:[2,18]},{5:[2,19],10:[2,19],11:[2,19],12:[2,19],13:[2,19],14:[2,19],15:[2,19],16:[2,19],17:[2,19],18:[2,19],19:[2,19],20:[2,19],21:[2,19],22:[2,19],23:[2,19],26:[2,19],37:[2,19],38:[2,19],39:[2,19],40:[2,19]},{5:[2,20],10:[2,20],11:[2,20],12:[2,20],13:[2,20],14:[2,20],15:[2,20],16:[2,20],17:[2,20],18:[2,20],19:[2,20],20:[2,20],21:[2,20],22:[2,20],23:[2,20],26:[2,20],37:[2,20],38:[2,20],39:[2,20],40:[2,20]},{5:[2,21],10:[2,21],11:[2,21],12:[2,21],13:[2,21],14:[2,21],15:[2,21],16:[2,21],17:[2,21],18:[2,21],19:[2,21],20:[2,21],21:[2,21],22:[2,21],23:[2,21],26:[2,21],37:[2,21],38:[2,21],39:[2,21],40:[2,21]},{5:[2,22],10:[2,22],11:[2,22],12:[2,22],13:[2,22],14:[2,22],15:[2,22],16:[2,22],17:[2,22],18:[2,22],19:[1,34],20:[1,35],21:[1,36],22:[1,37],23:[2,22],26:[2,22],37:[2,22],38:[2,22],39:[2,22],40:[2,22]},{5:[2,25],10:[2,25],11:[2,25],12:[2,25],13:[2,25],14:[2,25],15:[2,25],16:[2,25],17:[2,25],18:[2,25],19:[2,25],20:[2,25],21:[2,25],22:[2,25],23:[2,25],26:[2,25],37:[2,25],38:[2,25],39:[2,25],40:[2,25]},{5:[2,47],10:[2,47],11:[2,47],12:[2,47],13:[2,47],14:[2,47],15:[2,47],16:[2,47],17:[2,47],18:[2,47],19:[2,47],20:[2,47],21:[2,47],22:[2,47],23:[2,47],26:[2,47],37:[2,47],38:[2,47],39:[2,47],40:[2,47],43:[2,47],44:[2,47],47:[2,47]},{5:[2,34],10:[2,34],11:[2,34],12:[2,34],13:[2,34],14:[2,34],15:[2,34],16:[2,34],17:[2,34],18:[2,34],19:[2,34],20:[2,34],21:[2,34],22:[2,34],23:[2,34],26:[2,34],37:[2,34],38:[2,34],39:[2,34],40:[2,34]},{6:73,11:[1,6],24:[1,5],25:[1,7],27:8,28:[1,9],29:[1,10],30:[1,11],31:[1,12],32:[1,13],33:[1,14],34:15,35:[1,18],45:[1,19],46:[1,20]},{34:50,42:74,45:[1,19],46:[1,20]},{5:[2,43],38:[2,43],39:[2,43]},{5:[2,44],38:[2,44],39:[2,44]},{10:[1,25],11:[1,26],12:[1,27],13:[1,28],14:[1,29],15:[1,30],16:[1,31],17:[1,32],18:[1,33],19:[1,34],20:[1,35],21:[1,36],22:[1,37],23:[1,38],37:[2,37],38:[2,37]},{5:[2,41],38:[2,41],39:[2,41]}],
defaultActions: {4:[2,3],23:[2,1],24:[2,4],43:[2,6],44:[2,8]},
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
lexer.options = {"case-insensitive":true};
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:return 28;
break;
case 1:
  yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 29;

break;
case 2:
  yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 29;

break;
case 3:
  yy_.yytext = yy_.yytext.substr(1); return 45;

break;
case 4:/* skip whitespace */
break;
case 5:return 33;
break;
case 6:return 32;
break;
case 7:return 30;
break;
case 8:return 31;
break;
case 9:return 39;
break;
case 10:return 40;
break;
case 11:return 43;
break;
case 12:return 44;
break;
case 13:return 15;
break;
case 14:return 16;
break;
case 15:return 24;
break;
case 16:return "IN";
break;
case 17:return 17;
break;
case 18:return 18;
break;
case 19:return 22;
break;
case 20:return 20;
break;
case 21:return 21;
break;
case 22:return 19;
break;
case 23:return 25;
break;
case 24:return 26;
break;
case 25:return 35;
break;
case 26:return 37;
break;
case 27:return 47;
break;
case 28:return 38;
break;
case 29:return 10;
break;
case 30:return 11;
break;
case 31:return 12;
break;
case 32:return 13;
break;
case 33:return 14;
break;
case 34:return 46;
break;
case 35:return 5;
break;
case 36:return 'INVALID';
break;
}
};
lexer.rules = [/^(?:(-?(?:[0-9]|[1-9][0-9]+))((?:\.[0-9]+))?((?:[eE][-+]?[0-9]+))?\b)/i,/^(?:"(\\x[a-fA-F0-9]{2}|\\u[a-fA-F0-9]{4}|\\[^xu]|[^"(\\)\n])*")/i,/^(?:'(\\['bfvnrt/(\\)]|\\u[a-fA-F0-9]{4}|[^'(\\)])*')/i,/^(?:%[1-9][0-9]*)/i,/^(?:([\s])+)/i,/^(?:undefined\b)/i,/^(?:null\b)/i,/^(?:true\b)/i,/^(?:false\b)/i,/^(?:select|->)/i,/^(?:(order([\s])+)?by\b)/i,/^(?:asc\b)/i,/^(?:desc\b)/i,/^(?:and|&&)/i,/^(?:or|\|\|)/i,/^(?:not|!)/i,/^(?:in\b)/i,/^(?:==)/i,/^(?:!=)/i,/^(?:<=)/i,/^(?:>=)/i,/^(?:<)/i,/^(?:>)/i,/^(?:\()/i,/^(?:\))/i,/^(?:\[)/i,/^(?:\])/i,/^(?:\.)/i,/^(?:,)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:%)/i,/^(?:[A-Za-z_$][A-Za-z_$0-9-]*)/i,/^(?:$)/i,/^(?:.)/i];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36],"inclusive":true}};
return lexer;})()
parser.lexer = lexer;function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();