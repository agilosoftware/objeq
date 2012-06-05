/* Jison generated parser */
var $objeqParser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"program":3,"query":4,"EOF":5,"expr":6,"filter":7,"order_by":8,"select":9,"+":10,"-":11,"*":12,"/":13,"%":14,"AND":15,"OR":16,"EQ":17,"NEQ":18,"REGEX":19,"GT":20,"GTE":21,"LT":22,"LTE":23,"IN":24,"NOT":25,"(":26,")":27,"array":28,"obj":29,"NUMBER":30,"STRING":31,"TRUE":32,"FALSE":33,"NULL":34,"UNDEFINED":35,"path":36,"[":37,"array_list":38,"]":39,",":40,"{":41,"obj_items":42,"}":43,"obj_item":44,"obj_key":45,"IDENT":46,":":47,"SELECT":48,"ORDER_BY":49,"order_list":50,"order_spec":51,"local_path":52,"ASC":53,"DESC":54,"arg_path":55,"ARGREF":56,".":57,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",10:"+",11:"-",12:"*",13:"/",14:"%",15:"AND",16:"OR",17:"EQ",18:"NEQ",19:"REGEX",20:"GT",21:"GTE",22:"LT",23:"LTE",24:"IN",25:"NOT",26:"(",27:")",30:"NUMBER",31:"STRING",32:"TRUE",33:"FALSE",34:"NULL",35:"UNDEFINED",37:"[",39:"]",40:",",41:"{",43:"}",46:"IDENT",47:":",48:"SELECT",49:"ORDER_BY",53:"ASC",54:"DESC",56:"ARGREF",57:"."},
productions_: [0,[3,2],[4,1],[4,1],[4,2],[7,1],[7,2],[7,1],[7,2],[6,3],[6,3],[6,3],[6,3],[6,3],[6,3],[6,3],[6,3],[6,3],[6,3],[6,3],[6,3],[6,3],[6,3],[6,3],[6,2],[6,2],[6,3],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[28,3],[28,2],[38,1],[38,3],[29,3],[29,2],[42,1],[42,3],[45,1],[45,1],[45,1],[45,1],[45,1],[45,1],[45,1],[44,3],[9,2],[8,2],[50,1],[50,3],[51,1],[51,2],[51,2],[36,1],[36,1],[55,1],[55,3],[52,1],[52,3]],
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
case 9: this.$ = yy.node('add', $$[$0-2], $$[$0]); 
break;
case 10: this.$ = yy.node('sub', $$[$0-2], $$[$0]); 
break;
case 11: this.$ = yy.node('mul', $$[$0-2], $$[$0]); 
break;
case 12: this.$ = yy.node('div', $$[$0-2], $$[$0]); 
break;
case 13: this.$ = yy.node('mod', $$[$0-2], $$[$0]); 
break;
case 14: this.$ = yy.node('and', $$[$0-2], $$[$0]); 
break;
case 15: this.$ = yy.node('or', $$[$0-2], $$[$0]); 
break;
case 16: this.$ = yy.node('eq', $$[$0-2], $$[$0]); 
break;
case 17: this.$ = yy.node('neq', $$[$0-2], $$[$0]); 
break;
case 18: this.$ = yy.node('regex', $$[$0-2], $$[$0]); 
break;
case 19: this.$ = yy.node('gt', $$[$0-2], $$[$0]); 
break;
case 20: this.$ = yy.node('gte', $$[$0-2], $$[$0]); 
break;
case 21: this.$ = yy.node('lt', $$[$0-2], $$[$0]); 
break;
case 22: this.$ = yy.node('lte', $$[$0-2], $$[$0]); 
break;
case 23: this.$ = yy.node('in', $$[$0-2], $$[$0]); 
break;
case 24: this.$ = yy.node('not', $$[$0]); 
break;
case 25: this.$ = yy.node('neg', $$[$0]); 
break;
case 26: this.$ = $$[$0-1]; 
break;
case 27: this.$ = $$[$0]; 
break;
case 28: this.$ = $$[$0]; 
break;
case 29: this.$ = Number(yytext); 
break;
case 30: this.$ = yytext; 
break;
case 31: this.$ = true; 
break;
case 32: this.$ = false; 
break;
case 33: this.$ = null; 
break;
case 34: this.$ = undefined; 
break;
case 35: this.$ = $$[$0]; 
break;
case 36: this.$ = yy.node('arr', $$[$0-1]); 
break;
case 37: this.$ = yy.node('arr', []); 
break;
case 38: this.$ = [$$[$0]]; 
break;
case 39: this.$ = $$[$0-2]; $$[$0-2].push($$[$0]); 
break;
case 40: this.$ = yy.node('obj', $$[$0-1]); 
break;
case 41: this.$ = yy.node('obj', {}); 
break;
case 42: this.$ = {}; this.$[$$[$0][0]] = $$[$0][1]; 
break;
case 43: this.$ = $$[$0-2]; this.$[$$[$0][0]] = $$[$0][1]; 
break;
case 51: this.$ = [$$[$0-2], $$[$0]]; 
break;
case 52: this.$ = $$[$0]; 
break;
case 53: this.$ = $$[$0]; 
break;
case 54: this.$ = [$$[$0]]; 
break;
case 55: this.$ = $$[$0-2]; $$[$0-2].push($$[$0]); 
break;
case 56: this.$ = { path: $$[$0], ascending: true }; 
break;
case 57: this.$ = { path: $$[$0-1], ascending: true }; 
break;
case 58: this.$ = { path: $$[$0-1] }; 
break;
case 59: this.$ = $$[$0]; 
break;
case 60: this.$ = $$[$0]; 
break;
case 61: this.$ = yy.path(Number($$[$0])-1); 
break;
case 62: this.$ = $$[$0-2]; $$[$0-2].push($$[$0]); 
break;
case 63: this.$ = yy.path($$[$0]); 
break;
case 64: this.$ = $$[$0-2]; $$[$0-2].push($$[$0]); 
break;
}
},
table: [{3:1,4:2,6:3,7:4,8:17,9:18,11:[1,6],25:[1,5],26:[1,7],28:8,29:9,30:[1,10],31:[1,11],32:[1,12],33:[1,13],34:[1,14],35:[1,15],36:16,37:[1,19],41:[1,20],46:[1,26],48:[1,24],49:[1,23],52:22,55:21,56:[1,25]},{1:[3]},{5:[1,27]},{5:[2,2],7:28,8:17,9:18,10:[1,29],11:[1,30],12:[1,31],13:[1,32],14:[1,33],15:[1,34],16:[1,35],17:[1,36],18:[1,37],19:[1,38],20:[1,39],21:[1,40],22:[1,41],23:[1,42],24:[1,43],48:[1,24],49:[1,23]},{5:[2,3]},{6:44,11:[1,6],25:[1,5],26:[1,7],28:8,29:9,30:[1,10],31:[1,11],32:[1,12],33:[1,13],34:[1,14],35:[1,15],36:16,37:[1,19],41:[1,20],46:[1,26],52:22,55:21,56:[1,25]},{6:45,11:[1,6],25:[1,5],26:[1,7],28:8,29:9,30:[1,10],31:[1,11],32:[1,12],33:[1,13],34:[1,14],35:[1,15],36:16,37:[1,19],41:[1,20],46:[1,26],52:22,55:21,56:[1,25]},{6:46,11:[1,6],25:[1,5],26:[1,7],28:8,29:9,30:[1,10],31:[1,11],32:[1,12],33:[1,13],34:[1,14],35:[1,15],36:16,37:[1,19],41:[1,20],46:[1,26],52:22,55:21,56:[1,25]},{5:[2,27],10:[2,27],11:[2,27],12:[2,27],13:[2,27],14:[2,27],15:[2,27],16:[2,27],17:[2,27],18:[2,27],19:[2,27],20:[2,27],21:[2,27],22:[2,27],23:[2,27],24:[2,27],27:[2,27],39:[2,27],40:[2,27],43:[2,27],48:[2,27],49:[2,27]},{5:[2,28],10:[2,28],11:[2,28],12:[2,28],13:[2,28],14:[2,28],15:[2,28],16:[2,28],17:[2,28],18:[2,28],19:[2,28],20:[2,28],21:[2,28],22:[2,28],23:[2,28],24:[2,28],27:[2,28],39:[2,28],40:[2,28],43:[2,28],48:[2,28],49:[2,28]},{5:[2,29],10:[2,29],11:[2,29],12:[2,29],13:[2,29],14:[2,29],15:[2,29],16:[2,29],17:[2,29],18:[2,29],19:[2,29],20:[2,29],21:[2,29],22:[2,29],23:[2,29],24:[2,29],27:[2,29],39:[2,29],40:[2,29],43:[2,29],48:[2,29],49:[2,29]},{5:[2,30],10:[2,30],11:[2,30],12:[2,30],13:[2,30],14:[2,30],15:[2,30],16:[2,30],17:[2,30],18:[2,30],19:[2,30],20:[2,30],21:[2,30],22:[2,30],23:[2,30],24:[2,30],27:[2,30],39:[2,30],40:[2,30],43:[2,30],48:[2,30],49:[2,30]},{5:[2,31],10:[2,31],11:[2,31],12:[2,31],13:[2,31],14:[2,31],15:[2,31],16:[2,31],17:[2,31],18:[2,31],19:[2,31],20:[2,31],21:[2,31],22:[2,31],23:[2,31],24:[2,31],27:[2,31],39:[2,31],40:[2,31],43:[2,31],48:[2,31],49:[2,31]},{5:[2,32],10:[2,32],11:[2,32],12:[2,32],13:[2,32],14:[2,32],15:[2,32],16:[2,32],17:[2,32],18:[2,32],19:[2,32],20:[2,32],21:[2,32],22:[2,32],23:[2,32],24:[2,32],27:[2,32],39:[2,32],40:[2,32],43:[2,32],48:[2,32],49:[2,32]},{5:[2,33],10:[2,33],11:[2,33],12:[2,33],13:[2,33],14:[2,33],15:[2,33],16:[2,33],17:[2,33],18:[2,33],19:[2,33],20:[2,33],21:[2,33],22:[2,33],23:[2,33],24:[2,33],27:[2,33],39:[2,33],40:[2,33],43:[2,33],48:[2,33],49:[2,33]},{5:[2,34],10:[2,34],11:[2,34],12:[2,34],13:[2,34],14:[2,34],15:[2,34],16:[2,34],17:[2,34],18:[2,34],19:[2,34],20:[2,34],21:[2,34],22:[2,34],23:[2,34],24:[2,34],27:[2,34],39:[2,34],40:[2,34],43:[2,34],48:[2,34],49:[2,34]},{5:[2,35],10:[2,35],11:[2,35],12:[2,35],13:[2,35],14:[2,35],15:[2,35],16:[2,35],17:[2,35],18:[2,35],19:[2,35],20:[2,35],21:[2,35],22:[2,35],23:[2,35],24:[2,35],27:[2,35],39:[2,35],40:[2,35],43:[2,35],48:[2,35],49:[2,35]},{5:[2,5],9:47,48:[1,24]},{5:[2,7],8:48,49:[1,23]},{6:51,11:[1,6],25:[1,5],26:[1,7],28:8,29:9,30:[1,10],31:[1,11],32:[1,12],33:[1,13],34:[1,14],35:[1,15],36:16,37:[1,19],38:49,39:[1,50],41:[1,20],46:[1,26],52:22,55:21,56:[1,25]},{30:[1,56],31:[1,57],32:[1,58],33:[1,59],34:[1,60],35:[1,61],42:52,43:[1,53],44:54,45:55,46:[1,62]},{5:[2,59],10:[2,59],11:[2,59],12:[2,59],13:[2,59],14:[2,59],15:[2,59],16:[2,59],17:[2,59],18:[2,59],19:[2,59],20:[2,59],21:[2,59],22:[2,59],23:[2,59],24:[2,59],27:[2,59],39:[2,59],40:[2,59],43:[2,59],48:[2,59],49:[2,59],57:[1,63]},{5:[2,60],10:[2,60],11:[2,60],12:[2,60],13:[2,60],14:[2,60],15:[2,60],16:[2,60],17:[2,60],18:[2,60],19:[2,60],20:[2,60],21:[2,60],22:[2,60],23:[2,60],24:[2,60],27:[2,60],39:[2,60],40:[2,60],43:[2,60],48:[2,60],49:[2,60],57:[1,64]},{46:[1,26],50:65,51:66,52:67},{6:68,11:[1,6],25:[1,5],26:[1,7],28:8,29:9,30:[1,10],31:[1,11],32:[1,12],33:[1,13],34:[1,14],35:[1,15],36:16,37:[1,19],41:[1,20],46:[1,26],52:22,55:21,56:[1,25]},{5:[2,61],10:[2,61],11:[2,61],12:[2,61],13:[2,61],14:[2,61],15:[2,61],16:[2,61],17:[2,61],18:[2,61],19:[2,61],20:[2,61],21:[2,61],22:[2,61],23:[2,61],24:[2,61],27:[2,61],39:[2,61],40:[2,61],43:[2,61],48:[2,61],49:[2,61],57:[2,61]},{5:[2,63],10:[2,63],11:[2,63],12:[2,63],13:[2,63],14:[2,63],15:[2,63],16:[2,63],17:[2,63],18:[2,63],19:[2,63],20:[2,63],21:[2,63],22:[2,63],23:[2,63],24:[2,63],27:[2,63],39:[2,63],40:[2,63],43:[2,63],48:[2,63],49:[2,63],53:[2,63],54:[2,63],57:[2,63]},{1:[2,1]},{5:[2,4]},{6:69,11:[1,6],25:[1,5],26:[1,7],28:8,29:9,30:[1,10],31:[1,11],32:[1,12],33:[1,13],34:[1,14],35:[1,15],36:16,37:[1,19],41:[1,20],46:[1,26],52:22,55:21,56:[1,25]},{6:70,11:[1,6],25:[1,5],26:[1,7],28:8,29:9,30:[1,10],31:[1,11],32:[1,12],33:[1,13],34:[1,14],35:[1,15],36:16,37:[1,19],41:[1,20],46:[1,26],52:22,55:21,56:[1,25]},{6:71,11:[1,6],25:[1,5],26:[1,7],28:8,29:9,30:[1,10],31:[1,11],32:[1,12],33:[1,13],34:[1,14],35:[1,15],36:16,37:[1,19],41:[1,20],46:[1,26],52:22,55:21,56:[1,25]},{6:72,11:[1,6],25:[1,5],26:[1,7],28:8,29:9,30:[1,10],31:[1,11],32:[1,12],33:[1,13],34:[1,14],35:[1,15],36:16,37:[1,19],41:[1,20],46:[1,26],52:22,55:21,56:[1,25]},{6:73,11:[1,6],25:[1,5],26:[1,7],28:8,29:9,30:[1,10],31:[1,11],32:[1,12],33:[1,13],34:[1,14],35:[1,15],36:16,37:[1,19],41:[1,20],46:[1,26],52:22,55:21,56:[1,25]},{6:74,11:[1,6],25:[1,5],26:[1,7],28:8,29:9,30:[1,10],31:[1,11],32:[1,12],33:[1,13],34:[1,14],35:[1,15],36:16,37:[1,19],41:[1,20],46:[1,26],52:22,55:21,56:[1,25]},{6:75,11:[1,6],25:[1,5],26:[1,7],28:8,29:9,30:[1,10],31:[1,11],32:[1,12],33:[1,13],34:[1,14],35:[1,15],36:16,37:[1,19],41:[1,20],46:[1,26],52:22,55:21,56:[1,25]},{6:76,11:[1,6],25:[1,5],26:[1,7],28:8,29:9,30:[1,10],31:[1,11],32:[1,12],33:[1,13],34:[1,14],35:[1,15],36:16,37:[1,19],41:[1,20],46:[1,26],52:22,55:21,56:[1,25]},{6:77,11:[1,6],25:[1,5],26:[1,7],28:8,29:9,30:[1,10],31:[1,11],32:[1,12],33:[1,13],34:[1,14],35:[1,15],36:16,37:[1,19],41:[1,20],46:[1,26],52:22,55:21,56:[1,25]},{6:78,11:[1,6],25:[1,5],26:[1,7],28:8,29:9,30:[1,10],31:[1,11],32:[1,12],33:[1,13],34:[1,14],35:[1,15],36:16,37:[1,19],41:[1,20],46:[1,26],52:22,55:21,56:[1,25]},{6:79,11:[1,6],25:[1,5],26:[1,7],28:8,29:9,30:[1,10],31:[1,11],32:[1,12],33:[1,13],34:[1,14],35:[1,15],36:16,37:[1,19],41:[1,20],46:[1,26],52:22,55:21,56:[1,25]},{6:80,11:[1,6],25:[1,5],26:[1,7],28:8,29:9,30:[1,10],31:[1,11],32:[1,12],33:[1,13],34:[1,14],35:[1,15],36:16,37:[1,19],41:[1,20],46:[1,26],52:22,55:21,56:[1,25]},{6:81,11:[1,6],25:[1,5],26:[1,7],28:8,29:9,30:[1,10],31:[1,11],32:[1,12],33:[1,13],34:[1,14],35:[1,15],36:16,37:[1,19],41:[1,20],46:[1,26],52:22,55:21,56:[1,25]},{6:82,11:[1,6],25:[1,5],26:[1,7],28:8,29:9,30:[1,10],31:[1,11],32:[1,12],33:[1,13],34:[1,14],35:[1,15],36:16,37:[1,19],41:[1,20],46:[1,26],52:22,55:21,56:[1,25]},{6:83,11:[1,6],25:[1,5],26:[1,7],28:8,29:9,30:[1,10],31:[1,11],32:[1,12],33:[1,13],34:[1,14],35:[1,15],36:16,37:[1,19],41:[1,20],46:[1,26],52:22,55:21,56:[1,25]},{5:[2,24],10:[2,24],11:[2,24],12:[2,24],13:[2,24],14:[2,24],15:[2,24],16:[2,24],17:[2,24],18:[2,24],19:[2,24],20:[2,24],21:[2,24],22:[2,24],23:[2,24],24:[2,24],27:[2,24],39:[2,24],40:[2,24],43:[2,24],48:[2,24],49:[2,24]},{5:[2,25],10:[2,25],11:[2,25],12:[2,25],13:[2,25],14:[2,25],15:[2,25],16:[2,25],17:[2,25],18:[2,25],19:[2,25],20:[2,25],21:[2,25],22:[2,25],23:[2,25],24:[2,25],27:[2,25],39:[2,25],40:[2,25],43:[2,25],48:[2,25],49:[2,25]},{10:[1,29],11:[1,30],12:[1,31],13:[1,32],14:[1,33],15:[1,34],16:[1,35],17:[1,36],18:[1,37],19:[1,38],20:[1,39],21:[1,40],22:[1,41],23:[1,42],24:[1,43],27:[1,84]},{5:[2,6]},{5:[2,8]},{39:[1,85],40:[1,86]},{5:[2,37],10:[2,37],11:[2,37],12:[2,37],13:[2,37],14:[2,37],15:[2,37],16:[2,37],17:[2,37],18:[2,37],19:[2,37],20:[2,37],21:[2,37],22:[2,37],23:[2,37],24:[2,37],27:[2,37],39:[2,37],40:[2,37],43:[2,37],48:[2,37],49:[2,37]},{10:[1,29],11:[1,30],12:[1,31],13:[1,32],14:[1,33],15:[1,34],16:[1,35],17:[1,36],18:[1,37],19:[1,38],20:[1,39],21:[1,40],22:[1,41],23:[1,42],24:[1,43],39:[2,38],40:[2,38]},{40:[1,88],43:[1,87]},{5:[2,41],10:[2,41],11:[2,41],12:[2,41],13:[2,41],14:[2,41],15:[2,41],16:[2,41],17:[2,41],18:[2,41],19:[2,41],20:[2,41],21:[2,41],22:[2,41],23:[2,41],24:[2,41],27:[2,41],39:[2,41],40:[2,41],43:[2,41],48:[2,41],49:[2,41]},{40:[2,42],43:[2,42]},{47:[1,89]},{47:[2,44]},{47:[2,45]},{47:[2,46]},{47:[2,47]},{47:[2,48]},{47:[2,49]},{47:[2,50]},{46:[1,90]},{46:[1,91]},{5:[2,53],40:[1,92],48:[2,53]},{5:[2,54],40:[2,54],48:[2,54]},{5:[2,56],40:[2,56],48:[2,56],53:[1,93],54:[1,94],57:[1,64]},{5:[2,52],10:[1,29],11:[1,30],12:[1,31],13:[1,32],14:[1,33],15:[1,34],16:[1,35],17:[1,36],18:[1,37],19:[1,38],20:[1,39],21:[1,40],22:[1,41],23:[1,42],24:[1,43],49:[2,52]},{5:[2,9],10:[2,9],11:[2,9],12:[1,31],13:[1,32],14:[1,33],15:[1,34],16:[1,35],17:[1,36],18:[1,37],19:[1,38],20:[1,39],21:[1,40],22:[1,41],23:[1,42],24:[1,43],27:[2,9],39:[2,9],40:[2,9],43:[2,9],48:[2,9],49:[2,9]},{5:[2,10],10:[2,10],11:[2,10],12:[1,31],13:[1,32],14:[1,33],15:[1,34],16:[1,35],17:[1,36],18:[1,37],19:[1,38],20:[1,39],21:[1,40],22:[1,41],23:[1,42],24:[1,43],27:[2,10],39:[2,10],40:[2,10],43:[2,10],48:[2,10],49:[2,10]},{5:[2,11],10:[2,11],11:[2,11],12:[2,11],13:[2,11],14:[1,33],15:[1,34],16:[1,35],17:[1,36],18:[1,37],19:[1,38],20:[1,39],21:[1,40],22:[1,41],23:[1,42],24:[1,43],27:[2,11],39:[2,11],40:[2,11],43:[2,11],48:[2,11],49:[2,11]},{5:[2,12],10:[2,12],11:[2,12],12:[2,12],13:[2,12],14:[1,33],15:[1,34],16:[1,35],17:[1,36],18:[1,37],19:[1,38],20:[1,39],21:[1,40],22:[1,41],23:[1,42],24:[1,43],27:[2,12],39:[2,12],40:[2,12],43:[2,12],48:[2,12],49:[2,12]},{5:[2,13],10:[2,13],11:[2,13],12:[2,13],13:[2,13],14:[2,13],15:[1,34],16:[1,35],17:[1,36],18:[1,37],19:[1,38],20:[1,39],21:[1,40],22:[1,41],23:[1,42],24:[1,43],27:[2,13],39:[2,13],40:[2,13],43:[2,13],48:[2,13],49:[2,13]},{5:[2,14],10:[2,14],11:[2,14],12:[2,14],13:[2,14],14:[2,14],15:[2,14],16:[2,14],17:[1,36],18:[1,37],19:[1,38],20:[1,39],21:[1,40],22:[1,41],23:[1,42],24:[1,43],27:[2,14],39:[2,14],40:[2,14],43:[2,14],48:[2,14],49:[2,14]},{5:[2,15],10:[2,15],11:[2,15],12:[2,15],13:[2,15],14:[2,15],15:[2,15],16:[2,15],17:[1,36],18:[1,37],19:[1,38],20:[1,39],21:[1,40],22:[1,41],23:[1,42],24:[1,43],27:[2,15],39:[2,15],40:[2,15],43:[2,15],48:[2,15],49:[2,15]},{5:[2,16],10:[2,16],11:[2,16],12:[2,16],13:[2,16],14:[2,16],15:[2,16],16:[2,16],17:[2,16],18:[2,16],19:[2,16],20:[1,39],21:[1,40],22:[1,41],23:[1,42],24:[2,16],27:[2,16],39:[2,16],40:[2,16],43:[2,16],48:[2,16],49:[2,16]},{5:[2,17],10:[2,17],11:[2,17],12:[2,17],13:[2,17],14:[2,17],15:[2,17],16:[2,17],17:[2,17],18:[2,17],19:[2,17],20:[1,39],21:[1,40],22:[1,41],23:[1,42],24:[2,17],27:[2,17],39:[2,17],40:[2,17],43:[2,17],48:[2,17],49:[2,17]},{5:[2,18],10:[2,18],11:[2,18],12:[2,18],13:[2,18],14:[2,18],15:[2,18],16:[2,18],17:[2,18],18:[2,18],19:[2,18],20:[1,39],21:[1,40],22:[1,41],23:[1,42],24:[2,18],27:[2,18],39:[2,18],40:[2,18],43:[2,18],48:[2,18],49:[2,18]},{5:[2,19],10:[2,19],11:[2,19],12:[2,19],13:[2,19],14:[2,19],15:[2,19],16:[2,19],17:[2,19],18:[2,19],19:[2,19],20:[2,19],21:[2,19],22:[2,19],23:[2,19],24:[2,19],27:[2,19],39:[2,19],40:[2,19],43:[2,19],48:[2,19],49:[2,19]},{5:[2,20],10:[2,20],11:[2,20],12:[2,20],13:[2,20],14:[2,20],15:[2,20],16:[2,20],17:[2,20],18:[2,20],19:[2,20],20:[2,20],21:[2,20],22:[2,20],23:[2,20],24:[2,20],27:[2,20],39:[2,20],40:[2,20],43:[2,20],48:[2,20],49:[2,20]},{5:[2,21],10:[2,21],11:[2,21],12:[2,21],13:[2,21],14:[2,21],15:[2,21],16:[2,21],17:[2,21],18:[2,21],19:[2,21],20:[2,21],21:[2,21],22:[2,21],23:[2,21],24:[2,21],27:[2,21],39:[2,21],40:[2,21],43:[2,21],48:[2,21],49:[2,21]},{5:[2,22],10:[2,22],11:[2,22],12:[2,22],13:[2,22],14:[2,22],15:[2,22],16:[2,22],17:[2,22],18:[2,22],19:[2,22],20:[2,22],21:[2,22],22:[2,22],23:[2,22],24:[2,22],27:[2,22],39:[2,22],40:[2,22],43:[2,22],48:[2,22],49:[2,22]},{5:[2,23],10:[2,23],11:[2,23],12:[2,23],13:[2,23],14:[2,23],15:[2,23],16:[2,23],17:[2,23],18:[2,23],19:[2,23],20:[1,39],21:[1,40],22:[1,41],23:[1,42],24:[2,23],27:[2,23],39:[2,23],40:[2,23],43:[2,23],48:[2,23],49:[2,23]},{5:[2,26],10:[2,26],11:[2,26],12:[2,26],13:[2,26],14:[2,26],15:[2,26],16:[2,26],17:[2,26],18:[2,26],19:[2,26],20:[2,26],21:[2,26],22:[2,26],23:[2,26],24:[2,26],27:[2,26],39:[2,26],40:[2,26],43:[2,26],48:[2,26],49:[2,26]},{5:[2,36],10:[2,36],11:[2,36],12:[2,36],13:[2,36],14:[2,36],15:[2,36],16:[2,36],17:[2,36],18:[2,36],19:[2,36],20:[2,36],21:[2,36],22:[2,36],23:[2,36],24:[2,36],27:[2,36],39:[2,36],40:[2,36],43:[2,36],48:[2,36],49:[2,36]},{6:95,11:[1,6],25:[1,5],26:[1,7],28:8,29:9,30:[1,10],31:[1,11],32:[1,12],33:[1,13],34:[1,14],35:[1,15],36:16,37:[1,19],41:[1,20],46:[1,26],52:22,55:21,56:[1,25]},{5:[2,40],10:[2,40],11:[2,40],12:[2,40],13:[2,40],14:[2,40],15:[2,40],16:[2,40],17:[2,40],18:[2,40],19:[2,40],20:[2,40],21:[2,40],22:[2,40],23:[2,40],24:[2,40],27:[2,40],39:[2,40],40:[2,40],43:[2,40],48:[2,40],49:[2,40]},{30:[1,56],31:[1,57],32:[1,58],33:[1,59],34:[1,60],35:[1,61],44:96,45:55,46:[1,62]},{6:97,11:[1,6],25:[1,5],26:[1,7],28:8,29:9,30:[1,10],31:[1,11],32:[1,12],33:[1,13],34:[1,14],35:[1,15],36:16,37:[1,19],41:[1,20],46:[1,26],52:22,55:21,56:[1,25]},{5:[2,62],10:[2,62],11:[2,62],12:[2,62],13:[2,62],14:[2,62],15:[2,62],16:[2,62],17:[2,62],18:[2,62],19:[2,62],20:[2,62],21:[2,62],22:[2,62],23:[2,62],24:[2,62],27:[2,62],39:[2,62],40:[2,62],43:[2,62],48:[2,62],49:[2,62],57:[2,62]},{5:[2,64],10:[2,64],11:[2,64],12:[2,64],13:[2,64],14:[2,64],15:[2,64],16:[2,64],17:[2,64],18:[2,64],19:[2,64],20:[2,64],21:[2,64],22:[2,64],23:[2,64],24:[2,64],27:[2,64],39:[2,64],40:[2,64],43:[2,64],48:[2,64],49:[2,64],53:[2,64],54:[2,64],57:[2,64]},{46:[1,26],51:98,52:67},{5:[2,57],40:[2,57],48:[2,57]},{5:[2,58],40:[2,58],48:[2,58]},{10:[1,29],11:[1,30],12:[1,31],13:[1,32],14:[1,33],15:[1,34],16:[1,35],17:[1,36],18:[1,37],19:[1,38],20:[1,39],21:[1,40],22:[1,41],23:[1,42],24:[1,43],39:[2,39],40:[2,39]},{40:[2,43],43:[2,43]},{10:[1,29],11:[1,30],12:[1,31],13:[1,32],14:[1,33],15:[1,34],16:[1,35],17:[1,36],18:[1,37],19:[1,38],20:[1,39],21:[1,40],22:[1,41],23:[1,42],24:[1,43],40:[2,51],43:[2,51]},{5:[2,55],40:[2,55],48:[2,55]}],
defaultActions: {4:[2,3],27:[2,1],28:[2,4],47:[2,6],48:[2,8],56:[2,44],57:[2,45],58:[2,46],59:[2,47],60:[2,48],61:[2,49],62:[2,50]},
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
case 0:return 30;
break;
case 1:
  yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 31;

break;
case 2:
  yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 31;

break;
case 3:
  yy_.yytext = yy_.yytext.substr(1); return 56;

break;
case 4:/* skip whitespace */
break;
case 5:return 35;
break;
case 6:return 34;
break;
case 7:return 32;
break;
case 8:return 33;
break;
case 9:return 48;
break;
case 10:return 49;
break;
case 11:return 53;
break;
case 12:return 54;
break;
case 13:return 15;
break;
case 14:return 16;
break;
case 15:return 25;
break;
case 16:return "IN";
break;
case 17:return 17;
break;
case 18:return 18;
break;
case 19:return 19;
break;
case 20:return 23;
break;
case 21:return 21;
break;
case 22:return 15;
break;
case 23:return 16;
break;
case 24:return 48;
break;
case 25:return 25;
break;
case 26:return 22;
break;
case 27:return 20;
break;
case 28:return 26;
break;
case 29:return 27;
break;
case 30:return 37;
break;
case 31:return 39;
break;
case 32:return 41;
break;
case 33:return 43;
break;
case 34:return 47;
break;
case 35:return 57;
break;
case 36:return 40;
break;
case 37:return 10;
break;
case 38:return 11;
break;
case 39:return 12;
break;
case 40:return 13;
break;
case 41:return 14;
break;
case 42:return 46;
break;
case 43:return 5;
break;
case 44:return 'INVALID';
break;
}
};
lexer.rules = [/^(?:((?:[0-9]|[1-9][0-9]+))((?:\.[0-9]+))?((?:[eE][-+]?[0-9]+))?\b)/i,/^(?:"(\\x[a-fA-F0-9]{2}|\\u[a-fA-F0-9]{4}|\\[^xu]|[^"(\\)\n])*")/i,/^(?:'(\\['bfvnrt/(\\)]|\\u[a-fA-F0-9]{4}|[^'(\\)])*')/i,/^(?:%[1-9][0-9]*)/i,/^(?:([\s])+)/i,/^(?:undefined\b)/i,/^(?:null\b)/i,/^(?:true\b)/i,/^(?:false\b)/i,/^(?:select\b)/i,/^(?:(order([\s])+)?by\b)/i,/^(?:asc\b)/i,/^(?:desc\b)/i,/^(?:and\b)/i,/^(?:or\b)/i,/^(?:not\b)/i,/^(?:in\b)/i,/^(?:==)/i,/^(?:!=)/i,/^(?:=~)/i,/^(?:<=)/i,/^(?:>=)/i,/^(?:&&)/i,/^(?:\|\|)/i,/^(?:->)/i,/^(?:!)/i,/^(?:<)/i,/^(?:>)/i,/^(?:\()/i,/^(?:\))/i,/^(?:\[)/i,/^(?:\])/i,/^(?:\{)/i,/^(?:\})/i,/^(?::)/i,/^(?:\.)/i,/^(?:,)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:%)/i,/^(?:[A-Za-z_$][A-Za-z_$0-9]+)/i,/^(?:$)/i,/^(?:.)/i];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44],"inclusive":true}};
return lexer;})()
parser.lexer = lexer;function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = $objeqParser;
exports.Parser = $objeqParser.Parser;
exports.parse = function () { return $objeqParser.parse.apply($objeqParser, arguments); }
exports.main = function commonjsMain(args) {
    if (!args[1])
        throw new Error('Usage: '+args[0]+' FILE');
    var source, cwd;
    if (typeof process !== 'undefined') {
        source = require('fs').readFileSync(require('path').resolve(args[1]), "utf8");
    } else {
        source = require("file").path(require("file").cwd()).join(args[1]).read({charset: "utf-8"});
    }
    return exports.parser.parse(source);
}
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
}