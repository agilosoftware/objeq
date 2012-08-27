/* Jison generated parser */

if ( !this.$objeq ) this.$objeq = {};
this.$objeq.parser = (function () {
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"program":3,"query":4,"EOF":5,"step":6,"|":7,"expr":8,"filter":9,"order_by":10,"selector":11,"+":12,"-":13,"*":14,"/":15,"%":16,"AND":17,"OR":18,"EQ":19,"NEQ":20,"RE":21,"GT":22,"GTE":23,"LT":24,"LTE":25,"IN":26,"NOT":27,"(":28,")":29,"ternary":30,"func":31,"array":32,"obj":33,"NUMBER":34,"STRING":35,"TRUE":36,"FALSE":37,"NULL":38,"UNDEFINED":39,"path":40,"?":41,":":42,"IDENT":43,"expr_list":44,"[":45,"]":46,",":47,"{":48,"obj_items":49,"}":50,"obj_item":51,"obj_non_id":52,"SELECT":53,"FIRST":54,"local_path":55,"EACH":56,"ORDER_BY":57,"order_list":58,"order_spec":59,"ASC":60,"DESC":61,"arg_path":62,"ARGREF":63,".":64,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"|",12:"+",13:"-",14:"*",15:"/",16:"%",17:"AND",18:"OR",19:"EQ",20:"NEQ",21:"RE",22:"GT",23:"GTE",24:"LT",25:"LTE",26:"IN",27:"NOT",28:"(",29:")",34:"NUMBER",35:"STRING",36:"TRUE",37:"FALSE",38:"NULL",39:"UNDEFINED",41:"?",42:":",43:"IDENT",45:"[",46:"]",47:",",48:"{",50:"}",53:"SELECT",54:"FIRST",56:"EACH",57:"ORDER_BY",60:"ASC",61:"DESC",63:"ARGREF",64:"."},
productions_: [0,[3,2],[4,1],[4,3],[6,1],[6,1],[6,2],[9,1],[9,2],[9,1],[9,2],[8,3],[8,3],[8,3],[8,3],[8,3],[8,3],[8,3],[8,3],[8,3],[8,3],[8,3],[8,3],[8,3],[8,3],[8,3],[8,2],[8,2],[8,3],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[30,5],[31,4],[31,3],[32,3],[32,2],[44,1],[44,3],[33,3],[33,2],[49,1],[49,3],[52,1],[52,1],[52,1],[52,1],[52,1],[52,1],[51,3],[51,3],[51,1],[11,2],[11,2],[11,2],[10,2],[58,1],[58,3],[59,1],[59,2],[59,2],[40,1],[40,1],[62,1],[62,3],[62,4],[55,1],[55,3],[55,4]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: return $$[$0-1]; 
break;
case 2: this.$ = [$$[$0]]; 
break;
case 3: this.$ = $$[$0-2]; $$[$0-2].push($$[$0]); yy.step += 1; 
break;
case 4: this.$ = { expr: $$[$0] }; 
break;
case 5: this.$ = $$[$0]; $$[$0].expr = true; 
break;
case 6: this.$ = $$[$0]; $$[$0].expr = $$[$0-1]; 
break;
case 7: this.$ = { order: $$[$0], sortFirst: true }; 
break;
case 8: this.$ = { order: $$[$0-1], select: $$[$0], sortFirst: true }; 
break;
case 9: this.$ = { select: $$[$0] }; 
break;
case 10: this.$ = { select: $$[$0-1], order: $$[$0] }; 
break;
case 11: this.$ = yy.node('add', $$[$0-2], $$[$0]); 
break;
case 12: this.$ = yy.node('sub', $$[$0-2], $$[$0]); 
break;
case 13: this.$ = yy.node('mul', $$[$0-2], $$[$0]); 
break;
case 14: this.$ = yy.node('div', $$[$0-2], $$[$0]); 
break;
case 15: this.$ = yy.node('mod', $$[$0-2], $$[$0]); 
break;
case 16: this.$ = yy.node('and', $$[$0-2], $$[$0]); 
break;
case 17: this.$ = yy.node('or', $$[$0-2], $$[$0]); 
break;
case 18: this.$ = yy.node('eq', $$[$0-2], $$[$0]); 
break;
case 19: this.$ = yy.node('neq', $$[$0-2], $$[$0]); 
break;
case 20: this.$ = yy.node('re', $$[$0-2], $$[$0]); 
break;
case 21: this.$ = yy.node('gt', $$[$0-2], $$[$0]); 
break;
case 22: this.$ = yy.node('gte', $$[$0-2], $$[$0]); 
break;
case 23: this.$ = yy.node('lt', $$[$0-2], $$[$0]); 
break;
case 24: this.$ = yy.node('lte', $$[$0-2], $$[$0]); 
break;
case 25: this.$ = yy.node('in', $$[$0-2], $$[$0]); 
break;
case 26: this.$ = yy.node('not', $$[$0]); 
break;
case 27: this.$ = yy.node('neg', $$[$0]); 
break;
case 28: this.$ = $$[$0-1]; 
break;
case 29: this.$ = $$[$0]; 
break;
case 30: this.$ = $$[$0]; 
break;
case 31: this.$ = $$[$0]; 
break;
case 32: this.$ = $$[$0]; 
break;
case 33: this.$ = Number(yytext); 
break;
case 34: this.$ = yytext; 
break;
case 35: this.$ = true; 
break;
case 36: this.$ = false; 
break;
case 37: this.$ = null; 
break;
case 38: this.$ = undefined; 
break;
case 39: this.$ = $$[$0]; 
break;
case 40: this.$ = yy.node('tern', $$[$0-4], $$[$0-2], $$[$0]); 
break;
case 41: this.$ = yy.node('func', $$[$0-3], $$[$0-1]); 
break;
case 42: this.$ = yy.node('func', $$[$0-2], []); 
break;
case 43: this.$ = yy.node('arr', $$[$0-1]); 
break;
case 44: this.$ = yy.node('arr', []); 
break;
case 45: this.$ = [$$[$0]]; 
break;
case 46: this.$ = $$[$0-2]; $$[$0-2].push($$[$0]); 
break;
case 47: this.$ = yy.node('obj', $$[$0-1]); 
break;
case 48: this.$ = yy.node('obj', {}); 
break;
case 49: this.$ = {}; this.$[$$[$0][0]] = $$[$0][1]; 
break;
case 50: this.$ = $$[$0-2]; this.$[$$[$0][0]] = $$[$0][1]; 
break;
case 57: this.$ = [$$[$0-2], $$[$0]]; 
break;
case 58: this.$ = [$$[$0-2], $$[$0]]; 
break;
case 59: this.$ = [$$[$0], yy.path($$[$0])]; 
break;
case 60: this.$ = yy.node('select', $$[$0]); 
break;
case 61: this.$ = yy.node('first', $$[$0]); 
break;
case 62: this.$ = yy.node('each', $$[$0]); 
break;
case 63: this.$ = $$[$0]; 
break;
case 64: this.$ = [$$[$0]]; 
break;
case 65: this.$ = $$[$0-2]; $$[$0-2].push($$[$0]); 
break;
case 66: this.$ = { path: $$[$0], ascending: true }; 
break;
case 67: this.$ = { path: $$[$0-1], ascending: true }; 
break;
case 68: this.$ = { path: $$[$0-1] }; 
break;
case 69: this.$ = $$[$0]; 
break;
case 70: this.$ = $$[$0]; 
break;
case 71: this.$ = yy.path(Number($$[$0])-1); 
break;
case 72: this.$ = $$[$0-2]; $$[$0-2].push($$[$0]); 
break;
case 73: this.$ = $$[$0-3]; $$[$0-3].push($$[$0-1]); 
break;
case 74: this.$ = yy.path($$[$0]); 
break;
case 75: this.$ = $$[$0-2]; $$[$0-2].push($$[$0]); 
break;
case 76: this.$ = $$[$0-3]; $$[$0-3].push($$[$0-1]); 
break;
}
},
table: [{3:1,4:2,6:3,8:4,9:5,10:20,11:21,13:[1,7],27:[1,6],28:[1,8],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],45:[1,23],48:[1,24],53:[1,28],54:[1,29],55:26,56:[1,30],57:[1,27],62:25,63:[1,31]},{1:[3]},{5:[1,32],7:[1,33]},{5:[2,2],7:[2,2]},{5:[2,4],7:[2,4],9:34,10:20,11:21,12:[1,35],13:[1,36],14:[1,37],15:[1,38],16:[1,39],17:[1,40],18:[1,41],19:[1,42],20:[1,43],21:[1,44],22:[1,45],23:[1,46],24:[1,47],25:[1,48],26:[1,49],41:[1,50],53:[1,28],54:[1,29],56:[1,30],57:[1,27]},{5:[2,5],7:[2,5]},{8:51,13:[1,7],27:[1,6],28:[1,8],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],45:[1,23],48:[1,24],55:26,62:25,63:[1,31]},{8:52,13:[1,7],27:[1,6],28:[1,8],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],45:[1,23],48:[1,24],55:26,62:25,63:[1,31]},{8:53,13:[1,7],27:[1,6],28:[1,8],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],45:[1,23],48:[1,24],55:26,62:25,63:[1,31]},{5:[2,29],7:[2,29],12:[2,29],13:[2,29],14:[2,29],15:[2,29],16:[2,29],17:[2,29],18:[2,29],19:[2,29],20:[2,29],21:[2,29],22:[2,29],23:[2,29],24:[2,29],25:[2,29],26:[2,29],29:[2,29],41:[2,29],42:[2,29],46:[2,29],47:[2,29],50:[2,29],53:[2,29],54:[2,29],56:[2,29],57:[2,29]},{5:[2,30],7:[2,30],12:[2,30],13:[2,30],14:[2,30],15:[2,30],16:[2,30],17:[2,30],18:[2,30],19:[2,30],20:[2,30],21:[2,30],22:[2,30],23:[2,30],24:[2,30],25:[2,30],26:[2,30],29:[2,30],41:[2,30],42:[2,30],46:[2,30],47:[2,30],50:[2,30],53:[2,30],54:[2,30],56:[2,30],57:[2,30]},{5:[2,31],7:[2,31],12:[2,31],13:[2,31],14:[2,31],15:[2,31],16:[2,31],17:[2,31],18:[2,31],19:[2,31],20:[2,31],21:[2,31],22:[2,31],23:[2,31],24:[2,31],25:[2,31],26:[2,31],29:[2,31],41:[2,31],42:[2,31],46:[2,31],47:[2,31],50:[2,31],53:[2,31],54:[2,31],56:[2,31],57:[2,31]},{5:[2,32],7:[2,32],12:[2,32],13:[2,32],14:[2,32],15:[2,32],16:[2,32],17:[2,32],18:[2,32],19:[2,32],20:[2,32],21:[2,32],22:[2,32],23:[2,32],24:[2,32],25:[2,32],26:[2,32],29:[2,32],41:[2,32],42:[2,32],46:[2,32],47:[2,32],50:[2,32],53:[2,32],54:[2,32],56:[2,32],57:[2,32]},{5:[2,33],7:[2,33],12:[2,33],13:[2,33],14:[2,33],15:[2,33],16:[2,33],17:[2,33],18:[2,33],19:[2,33],20:[2,33],21:[2,33],22:[2,33],23:[2,33],24:[2,33],25:[2,33],26:[2,33],29:[2,33],41:[2,33],42:[2,33],46:[2,33],47:[2,33],50:[2,33],53:[2,33],54:[2,33],56:[2,33],57:[2,33]},{5:[2,34],7:[2,34],12:[2,34],13:[2,34],14:[2,34],15:[2,34],16:[2,34],17:[2,34],18:[2,34],19:[2,34],20:[2,34],21:[2,34],22:[2,34],23:[2,34],24:[2,34],25:[2,34],26:[2,34],29:[2,34],41:[2,34],42:[2,34],46:[2,34],47:[2,34],50:[2,34],53:[2,34],54:[2,34],56:[2,34],57:[2,34]},{5:[2,35],7:[2,35],12:[2,35],13:[2,35],14:[2,35],15:[2,35],16:[2,35],17:[2,35],18:[2,35],19:[2,35],20:[2,35],21:[2,35],22:[2,35],23:[2,35],24:[2,35],25:[2,35],26:[2,35],29:[2,35],41:[2,35],42:[2,35],46:[2,35],47:[2,35],50:[2,35],53:[2,35],54:[2,35],56:[2,35],57:[2,35]},{5:[2,36],7:[2,36],12:[2,36],13:[2,36],14:[2,36],15:[2,36],16:[2,36],17:[2,36],18:[2,36],19:[2,36],20:[2,36],21:[2,36],22:[2,36],23:[2,36],24:[2,36],25:[2,36],26:[2,36],29:[2,36],41:[2,36],42:[2,36],46:[2,36],47:[2,36],50:[2,36],53:[2,36],54:[2,36],56:[2,36],57:[2,36]},{5:[2,37],7:[2,37],12:[2,37],13:[2,37],14:[2,37],15:[2,37],16:[2,37],17:[2,37],18:[2,37],19:[2,37],20:[2,37],21:[2,37],22:[2,37],23:[2,37],24:[2,37],25:[2,37],26:[2,37],29:[2,37],41:[2,37],42:[2,37],46:[2,37],47:[2,37],50:[2,37],53:[2,37],54:[2,37],56:[2,37],57:[2,37]},{5:[2,38],7:[2,38],12:[2,38],13:[2,38],14:[2,38],15:[2,38],16:[2,38],17:[2,38],18:[2,38],19:[2,38],20:[2,38],21:[2,38],22:[2,38],23:[2,38],24:[2,38],25:[2,38],26:[2,38],29:[2,38],41:[2,38],42:[2,38],46:[2,38],47:[2,38],50:[2,38],53:[2,38],54:[2,38],56:[2,38],57:[2,38]},{5:[2,39],7:[2,39],12:[2,39],13:[2,39],14:[2,39],15:[2,39],16:[2,39],17:[2,39],18:[2,39],19:[2,39],20:[2,39],21:[2,39],22:[2,39],23:[2,39],24:[2,39],25:[2,39],26:[2,39],29:[2,39],41:[2,39],42:[2,39],46:[2,39],47:[2,39],50:[2,39],53:[2,39],54:[2,39],56:[2,39],57:[2,39]},{5:[2,7],7:[2,7],11:54,53:[1,28],54:[1,29],56:[1,30]},{5:[2,9],7:[2,9],10:55,57:[1,27]},{5:[2,74],7:[2,74],12:[2,74],13:[2,74],14:[2,74],15:[2,74],16:[2,74],17:[2,74],18:[2,74],19:[2,74],20:[2,74],21:[2,74],22:[2,74],23:[2,74],24:[2,74],25:[2,74],26:[2,74],28:[1,56],29:[2,74],41:[2,74],42:[2,74],45:[2,74],46:[2,74],47:[2,74],50:[2,74],53:[2,74],54:[2,74],56:[2,74],57:[2,74],64:[2,74]},{8:59,13:[1,7],27:[1,6],28:[1,8],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],44:57,45:[1,23],46:[1,58],48:[1,24],55:26,62:25,63:[1,31]},{34:[1,65],35:[1,66],36:[1,67],37:[1,68],38:[1,69],39:[1,70],43:[1,64],49:60,50:[1,61],51:62,52:63},{5:[2,69],7:[2,69],12:[2,69],13:[2,69],14:[2,69],15:[2,69],16:[2,69],17:[2,69],18:[2,69],19:[2,69],20:[2,69],21:[2,69],22:[2,69],23:[2,69],24:[2,69],25:[2,69],26:[2,69],29:[2,69],41:[2,69],42:[2,69],45:[1,72],46:[2,69],47:[2,69],50:[2,69],53:[2,69],54:[2,69],56:[2,69],57:[2,69],64:[1,71]},{5:[2,70],7:[2,70],12:[2,70],13:[2,70],14:[2,70],15:[2,70],16:[2,70],17:[2,70],18:[2,70],19:[2,70],20:[2,70],21:[2,70],22:[2,70],23:[2,70],24:[2,70],25:[2,70],26:[2,70],29:[2,70],41:[2,70],42:[2,70],45:[1,74],46:[2,70],47:[2,70],50:[2,70],53:[2,70],54:[2,70],56:[2,70],57:[2,70],64:[1,73]},{43:[1,78],55:77,58:75,59:76},{8:79,13:[1,7],27:[1,6],28:[1,8],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],45:[1,23],48:[1,24],55:26,62:25,63:[1,31]},{43:[1,78],55:80},{43:[1,78],55:81},{5:[2,71],7:[2,71],12:[2,71],13:[2,71],14:[2,71],15:[2,71],16:[2,71],17:[2,71],18:[2,71],19:[2,71],20:[2,71],21:[2,71],22:[2,71],23:[2,71],24:[2,71],25:[2,71],26:[2,71],29:[2,71],41:[2,71],42:[2,71],45:[2,71],46:[2,71],47:[2,71],50:[2,71],53:[2,71],54:[2,71],56:[2,71],57:[2,71],64:[2,71]},{1:[2,1]},{6:82,8:4,9:5,10:20,11:21,13:[1,7],27:[1,6],28:[1,8],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],45:[1,23],48:[1,24],53:[1,28],54:[1,29],55:26,56:[1,30],57:[1,27],62:25,63:[1,31]},{5:[2,6],7:[2,6]},{8:83,13:[1,7],27:[1,6],28:[1,8],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],45:[1,23],48:[1,24],55:26,62:25,63:[1,31]},{8:84,13:[1,7],27:[1,6],28:[1,8],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],45:[1,23],48:[1,24],55:26,62:25,63:[1,31]},{8:85,13:[1,7],27:[1,6],28:[1,8],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],45:[1,23],48:[1,24],55:26,62:25,63:[1,31]},{8:86,13:[1,7],27:[1,6],28:[1,8],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],45:[1,23],48:[1,24],55:26,62:25,63:[1,31]},{8:87,13:[1,7],27:[1,6],28:[1,8],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],45:[1,23],48:[1,24],55:26,62:25,63:[1,31]},{8:88,13:[1,7],27:[1,6],28:[1,8],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],45:[1,23],48:[1,24],55:26,62:25,63:[1,31]},{8:89,13:[1,7],27:[1,6],28:[1,8],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],45:[1,23],48:[1,24],55:26,62:25,63:[1,31]},{8:90,13:[1,7],27:[1,6],28:[1,8],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],45:[1,23],48:[1,24],55:26,62:25,63:[1,31]},{8:91,13:[1,7],27:[1,6],28:[1,8],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],45:[1,23],48:[1,24],55:26,62:25,63:[1,31]},{8:92,13:[1,7],27:[1,6],28:[1,8],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],45:[1,23],48:[1,24],55:26,62:25,63:[1,31]},{8:93,13:[1,7],27:[1,6],28:[1,8],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],45:[1,23],48:[1,24],55:26,62:25,63:[1,31]},{8:94,13:[1,7],27:[1,6],28:[1,8],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],45:[1,23],48:[1,24],55:26,62:25,63:[1,31]},{8:95,13:[1,7],27:[1,6],28:[1,8],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],45:[1,23],48:[1,24],55:26,62:25,63:[1,31]},{8:96,13:[1,7],27:[1,6],28:[1,8],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],45:[1,23],48:[1,24],55:26,62:25,63:[1,31]},{8:97,13:[1,7],27:[1,6],28:[1,8],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],45:[1,23],48:[1,24],55:26,62:25,63:[1,31]},{8:98,13:[1,7],27:[1,6],28:[1,8],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],45:[1,23],48:[1,24],55:26,62:25,63:[1,31]},{5:[2,26],7:[2,26],12:[2,26],13:[2,26],14:[2,26],15:[2,26],16:[2,26],17:[2,26],18:[2,26],19:[2,26],20:[2,26],21:[2,26],22:[2,26],23:[2,26],24:[2,26],25:[2,26],26:[2,26],29:[2,26],41:[2,26],42:[2,26],46:[2,26],47:[2,26],50:[2,26],53:[2,26],54:[2,26],56:[2,26],57:[2,26]},{5:[2,27],7:[2,27],12:[2,27],13:[2,27],14:[2,27],15:[2,27],16:[2,27],17:[2,27],18:[2,27],19:[2,27],20:[2,27],21:[2,27],22:[2,27],23:[2,27],24:[2,27],25:[2,27],26:[2,27],29:[2,27],41:[2,27],42:[2,27],46:[2,27],47:[2,27],50:[2,27],53:[2,27],54:[2,27],56:[2,27],57:[2,27]},{12:[1,35],13:[1,36],14:[1,37],15:[1,38],16:[1,39],17:[1,40],18:[1,41],19:[1,42],20:[1,43],21:[1,44],22:[1,45],23:[1,46],24:[1,47],25:[1,48],26:[1,49],29:[1,99],41:[1,50]},{5:[2,8],7:[2,8]},{5:[2,10],7:[2,10]},{8:59,13:[1,7],27:[1,6],28:[1,8],29:[1,101],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],44:100,45:[1,23],48:[1,24],55:26,62:25,63:[1,31]},{46:[1,102],47:[1,103]},{5:[2,44],7:[2,44],12:[2,44],13:[2,44],14:[2,44],15:[2,44],16:[2,44],17:[2,44],18:[2,44],19:[2,44],20:[2,44],21:[2,44],22:[2,44],23:[2,44],24:[2,44],25:[2,44],26:[2,44],29:[2,44],41:[2,44],42:[2,44],46:[2,44],47:[2,44],50:[2,44],53:[2,44],54:[2,44],56:[2,44],57:[2,44]},{12:[1,35],13:[1,36],14:[1,37],15:[1,38],16:[1,39],17:[1,40],18:[1,41],19:[1,42],20:[1,43],21:[1,44],22:[1,45],23:[1,46],24:[1,47],25:[1,48],26:[1,49],29:[2,45],41:[1,50],46:[2,45],47:[2,45]},{47:[1,105],50:[1,104]},{5:[2,48],7:[2,48],12:[2,48],13:[2,48],14:[2,48],15:[2,48],16:[2,48],17:[2,48],18:[2,48],19:[2,48],20:[2,48],21:[2,48],22:[2,48],23:[2,48],24:[2,48],25:[2,48],26:[2,48],29:[2,48],41:[2,48],42:[2,48],46:[2,48],47:[2,48],50:[2,48],53:[2,48],54:[2,48],56:[2,48],57:[2,48]},{47:[2,49],50:[2,49]},{42:[1,106]},{42:[1,107],47:[2,59],50:[2,59]},{42:[2,51]},{42:[2,52]},{42:[2,53]},{42:[2,54]},{42:[2,55]},{42:[2,56]},{43:[1,108]},{8:109,13:[1,7],27:[1,6],28:[1,8],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],45:[1,23],48:[1,24],55:26,62:25,63:[1,31]},{43:[1,110]},{8:111,13:[1,7],27:[1,6],28:[1,8],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],45:[1,23],48:[1,24],55:26,62:25,63:[1,31]},{5:[2,63],7:[2,63],47:[1,112],53:[2,63],54:[2,63],56:[2,63]},{5:[2,64],7:[2,64],47:[2,64],53:[2,64],54:[2,64],56:[2,64]},{5:[2,66],7:[2,66],45:[1,74],47:[2,66],53:[2,66],54:[2,66],56:[2,66],60:[1,113],61:[1,114],64:[1,73]},{5:[2,74],7:[2,74],45:[2,74],47:[2,74],53:[2,74],54:[2,74],56:[2,74],57:[2,74],60:[2,74],61:[2,74],64:[2,74]},{5:[2,60],7:[2,60],12:[1,35],13:[1,36],14:[1,37],15:[1,38],16:[1,39],17:[1,40],18:[1,41],19:[1,42],20:[1,43],21:[1,44],22:[1,45],23:[1,46],24:[1,47],25:[1,48],26:[1,49],41:[1,50],57:[2,60]},{5:[2,61],7:[2,61],45:[1,74],57:[2,61],64:[1,73]},{5:[2,62],7:[2,62],45:[1,74],57:[2,62],64:[1,73]},{5:[2,3],7:[2,3]},{5:[2,11],7:[2,11],12:[2,11],13:[2,11],14:[1,37],15:[1,38],16:[1,39],17:[2,11],18:[2,11],19:[2,11],20:[2,11],21:[2,11],22:[2,11],23:[2,11],24:[2,11],25:[2,11],26:[2,11],29:[2,11],41:[2,11],42:[2,11],46:[2,11],47:[2,11],50:[2,11],53:[2,11],54:[2,11],56:[2,11],57:[2,11]},{5:[2,12],7:[2,12],12:[2,12],13:[2,12],14:[1,37],15:[1,38],16:[1,39],17:[2,12],18:[2,12],19:[2,12],20:[2,12],21:[2,12],22:[2,12],23:[2,12],24:[2,12],25:[2,12],26:[2,12],29:[2,12],41:[2,12],42:[2,12],46:[2,12],47:[2,12],50:[2,12],53:[2,12],54:[2,12],56:[2,12],57:[2,12]},{5:[2,13],7:[2,13],12:[2,13],13:[2,13],14:[2,13],15:[2,13],16:[2,13],17:[2,13],18:[2,13],19:[2,13],20:[2,13],21:[2,13],22:[2,13],23:[2,13],24:[2,13],25:[2,13],26:[2,13],29:[2,13],41:[2,13],42:[2,13],46:[2,13],47:[2,13],50:[2,13],53:[2,13],54:[2,13],56:[2,13],57:[2,13]},{5:[2,14],7:[2,14],12:[2,14],13:[2,14],14:[2,14],15:[2,14],16:[2,14],17:[2,14],18:[2,14],19:[2,14],20:[2,14],21:[2,14],22:[2,14],23:[2,14],24:[2,14],25:[2,14],26:[2,14],29:[2,14],41:[2,14],42:[2,14],46:[2,14],47:[2,14],50:[2,14],53:[2,14],54:[2,14],56:[2,14],57:[2,14]},{5:[2,15],7:[2,15],12:[2,15],13:[2,15],14:[2,15],15:[2,15],16:[2,15],17:[2,15],18:[2,15],19:[2,15],20:[2,15],21:[2,15],22:[2,15],23:[2,15],24:[2,15],25:[2,15],26:[2,15],29:[2,15],41:[2,15],42:[2,15],46:[2,15],47:[2,15],50:[2,15],53:[2,15],54:[2,15],56:[2,15],57:[2,15]},{5:[2,16],7:[2,16],12:[1,35],13:[1,36],14:[1,37],15:[1,38],16:[1,39],17:[2,16],18:[2,16],19:[1,42],20:[1,43],21:[1,44],22:[1,45],23:[1,46],24:[1,47],25:[1,48],26:[1,49],29:[2,16],41:[2,16],42:[2,16],46:[2,16],47:[2,16],50:[2,16],53:[2,16],54:[2,16],56:[2,16],57:[2,16]},{5:[2,17],7:[2,17],12:[1,35],13:[1,36],14:[1,37],15:[1,38],16:[1,39],17:[1,40],18:[2,17],19:[1,42],20:[1,43],21:[1,44],22:[1,45],23:[1,46],24:[1,47],25:[1,48],26:[1,49],29:[2,17],41:[2,17],42:[2,17],46:[2,17],47:[2,17],50:[2,17],53:[2,17],54:[2,17],56:[2,17],57:[2,17]},{5:[2,18],7:[2,18],12:[1,35],13:[1,36],14:[1,37],15:[1,38],16:[1,39],17:[2,18],18:[2,18],19:[2,18],20:[2,18],21:[2,18],22:[1,45],23:[1,46],24:[1,47],25:[1,48],26:[2,18],29:[2,18],41:[2,18],42:[2,18],46:[2,18],47:[2,18],50:[2,18],53:[2,18],54:[2,18],56:[2,18],57:[2,18]},{5:[2,19],7:[2,19],12:[1,35],13:[1,36],14:[1,37],15:[1,38],16:[1,39],17:[2,19],18:[2,19],19:[2,19],20:[2,19],21:[2,19],22:[1,45],23:[1,46],24:[1,47],25:[1,48],26:[2,19],29:[2,19],41:[2,19],42:[2,19],46:[2,19],47:[2,19],50:[2,19],53:[2,19],54:[2,19],56:[2,19],57:[2,19]},{5:[2,20],7:[2,20],12:[1,35],13:[1,36],14:[1,37],15:[1,38],16:[1,39],17:[2,20],18:[2,20],19:[2,20],20:[2,20],21:[2,20],22:[1,45],23:[1,46],24:[1,47],25:[1,48],26:[2,20],29:[2,20],41:[2,20],42:[2,20],46:[2,20],47:[2,20],50:[2,20],53:[2,20],54:[2,20],56:[2,20],57:[2,20]},{5:[2,21],7:[2,21],12:[1,35],13:[1,36],14:[1,37],15:[1,38],16:[1,39],17:[2,21],18:[2,21],19:[2,21],20:[2,21],21:[2,21],22:[2,21],23:[2,21],24:[2,21],25:[2,21],26:[2,21],29:[2,21],41:[2,21],42:[2,21],46:[2,21],47:[2,21],50:[2,21],53:[2,21],54:[2,21],56:[2,21],57:[2,21]},{5:[2,22],7:[2,22],12:[1,35],13:[1,36],14:[1,37],15:[1,38],16:[1,39],17:[2,22],18:[2,22],19:[2,22],20:[2,22],21:[2,22],22:[2,22],23:[2,22],24:[2,22],25:[2,22],26:[2,22],29:[2,22],41:[2,22],42:[2,22],46:[2,22],47:[2,22],50:[2,22],53:[2,22],54:[2,22],56:[2,22],57:[2,22]},{5:[2,23],7:[2,23],12:[1,35],13:[1,36],14:[1,37],15:[1,38],16:[1,39],17:[2,23],18:[2,23],19:[2,23],20:[2,23],21:[2,23],22:[2,23],23:[2,23],24:[2,23],25:[2,23],26:[2,23],29:[2,23],41:[2,23],42:[2,23],46:[2,23],47:[2,23],50:[2,23],53:[2,23],54:[2,23],56:[2,23],57:[2,23]},{5:[2,24],7:[2,24],12:[1,35],13:[1,36],14:[1,37],15:[1,38],16:[1,39],17:[2,24],18:[2,24],19:[2,24],20:[2,24],21:[2,24],22:[2,24],23:[2,24],24:[2,24],25:[2,24],26:[2,24],29:[2,24],41:[2,24],42:[2,24],46:[2,24],47:[2,24],50:[2,24],53:[2,24],54:[2,24],56:[2,24],57:[2,24]},{5:[2,25],7:[2,25],12:[1,35],13:[1,36],14:[1,37],15:[1,38],16:[1,39],17:[2,25],18:[2,25],19:[2,25],20:[2,25],21:[2,25],22:[1,45],23:[1,46],24:[1,47],25:[1,48],26:[2,25],29:[2,25],41:[2,25],42:[2,25],46:[2,25],47:[2,25],50:[2,25],53:[2,25],54:[2,25],56:[2,25],57:[2,25]},{12:[1,35],13:[1,36],14:[1,37],15:[1,38],16:[1,39],17:[1,40],18:[1,41],19:[1,42],20:[1,43],21:[1,44],22:[1,45],23:[1,46],24:[1,47],25:[1,48],26:[1,49],41:[1,50],42:[1,115]},{5:[2,28],7:[2,28],12:[2,28],13:[2,28],14:[2,28],15:[2,28],16:[2,28],17:[2,28],18:[2,28],19:[2,28],20:[2,28],21:[2,28],22:[2,28],23:[2,28],24:[2,28],25:[2,28],26:[2,28],29:[2,28],41:[2,28],42:[2,28],46:[2,28],47:[2,28],50:[2,28],53:[2,28],54:[2,28],56:[2,28],57:[2,28]},{29:[1,116],47:[1,103]},{5:[2,42],7:[2,42],12:[2,42],13:[2,42],14:[2,42],15:[2,42],16:[2,42],17:[2,42],18:[2,42],19:[2,42],20:[2,42],21:[2,42],22:[2,42],23:[2,42],24:[2,42],25:[2,42],26:[2,42],29:[2,42],41:[2,42],42:[2,42],46:[2,42],47:[2,42],50:[2,42],53:[2,42],54:[2,42],56:[2,42],57:[2,42]},{5:[2,43],7:[2,43],12:[2,43],13:[2,43],14:[2,43],15:[2,43],16:[2,43],17:[2,43],18:[2,43],19:[2,43],20:[2,43],21:[2,43],22:[2,43],23:[2,43],24:[2,43],25:[2,43],26:[2,43],29:[2,43],41:[2,43],42:[2,43],46:[2,43],47:[2,43],50:[2,43],53:[2,43],54:[2,43],56:[2,43],57:[2,43]},{8:117,13:[1,7],27:[1,6],28:[1,8],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],45:[1,23],48:[1,24],55:26,62:25,63:[1,31]},{5:[2,47],7:[2,47],12:[2,47],13:[2,47],14:[2,47],15:[2,47],16:[2,47],17:[2,47],18:[2,47],19:[2,47],20:[2,47],21:[2,47],22:[2,47],23:[2,47],24:[2,47],25:[2,47],26:[2,47],29:[2,47],41:[2,47],42:[2,47],46:[2,47],47:[2,47],50:[2,47],53:[2,47],54:[2,47],56:[2,47],57:[2,47]},{34:[1,65],35:[1,66],36:[1,67],37:[1,68],38:[1,69],39:[1,70],43:[1,64],51:118,52:63},{8:119,13:[1,7],27:[1,6],28:[1,8],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],45:[1,23],48:[1,24],55:26,62:25,63:[1,31]},{8:120,13:[1,7],27:[1,6],28:[1,8],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],45:[1,23],48:[1,24],55:26,62:25,63:[1,31]},{5:[2,72],7:[2,72],12:[2,72],13:[2,72],14:[2,72],15:[2,72],16:[2,72],17:[2,72],18:[2,72],19:[2,72],20:[2,72],21:[2,72],22:[2,72],23:[2,72],24:[2,72],25:[2,72],26:[2,72],29:[2,72],41:[2,72],42:[2,72],45:[2,72],46:[2,72],47:[2,72],50:[2,72],53:[2,72],54:[2,72],56:[2,72],57:[2,72],64:[2,72]},{12:[1,35],13:[1,36],14:[1,37],15:[1,38],16:[1,39],17:[1,40],18:[1,41],19:[1,42],20:[1,43],21:[1,44],22:[1,45],23:[1,46],24:[1,47],25:[1,48],26:[1,49],41:[1,50],46:[1,121]},{5:[2,75],7:[2,75],12:[2,75],13:[2,75],14:[2,75],15:[2,75],16:[2,75],17:[2,75],18:[2,75],19:[2,75],20:[2,75],21:[2,75],22:[2,75],23:[2,75],24:[2,75],25:[2,75],26:[2,75],29:[2,75],41:[2,75],42:[2,75],45:[2,75],46:[2,75],47:[2,75],50:[2,75],53:[2,75],54:[2,75],56:[2,75],57:[2,75],60:[2,75],61:[2,75],64:[2,75]},{12:[1,35],13:[1,36],14:[1,37],15:[1,38],16:[1,39],17:[1,40],18:[1,41],19:[1,42],20:[1,43],21:[1,44],22:[1,45],23:[1,46],24:[1,47],25:[1,48],26:[1,49],41:[1,50],46:[1,122]},{43:[1,78],55:77,59:123},{5:[2,67],7:[2,67],47:[2,67],53:[2,67],54:[2,67],56:[2,67]},{5:[2,68],7:[2,68],47:[2,68],53:[2,68],54:[2,68],56:[2,68]},{8:124,13:[1,7],27:[1,6],28:[1,8],30:9,31:10,32:11,33:12,34:[1,13],35:[1,14],36:[1,15],37:[1,16],38:[1,17],39:[1,18],40:19,43:[1,22],45:[1,23],48:[1,24],55:26,62:25,63:[1,31]},{5:[2,41],7:[2,41],12:[2,41],13:[2,41],14:[2,41],15:[2,41],16:[2,41],17:[2,41],18:[2,41],19:[2,41],20:[2,41],21:[2,41],22:[2,41],23:[2,41],24:[2,41],25:[2,41],26:[2,41],29:[2,41],41:[2,41],42:[2,41],46:[2,41],47:[2,41],50:[2,41],53:[2,41],54:[2,41],56:[2,41],57:[2,41]},{12:[1,35],13:[1,36],14:[1,37],15:[1,38],16:[1,39],17:[1,40],18:[1,41],19:[1,42],20:[1,43],21:[1,44],22:[1,45],23:[1,46],24:[1,47],25:[1,48],26:[1,49],29:[2,46],41:[1,50],46:[2,46],47:[2,46]},{47:[2,50],50:[2,50]},{12:[1,35],13:[1,36],14:[1,37],15:[1,38],16:[1,39],17:[1,40],18:[1,41],19:[1,42],20:[1,43],21:[1,44],22:[1,45],23:[1,46],24:[1,47],25:[1,48],26:[1,49],41:[1,50],47:[2,57],50:[2,57]},{12:[1,35],13:[1,36],14:[1,37],15:[1,38],16:[1,39],17:[1,40],18:[1,41],19:[1,42],20:[1,43],21:[1,44],22:[1,45],23:[1,46],24:[1,47],25:[1,48],26:[1,49],41:[1,50],47:[2,58],50:[2,58]},{5:[2,73],7:[2,73],12:[2,73],13:[2,73],14:[2,73],15:[2,73],16:[2,73],17:[2,73],18:[2,73],19:[2,73],20:[2,73],21:[2,73],22:[2,73],23:[2,73],24:[2,73],25:[2,73],26:[2,73],29:[2,73],41:[2,73],42:[2,73],45:[2,73],46:[2,73],47:[2,73],50:[2,73],53:[2,73],54:[2,73],56:[2,73],57:[2,73],64:[2,73]},{5:[2,76],7:[2,76],12:[2,76],13:[2,76],14:[2,76],15:[2,76],16:[2,76],17:[2,76],18:[2,76],19:[2,76],20:[2,76],21:[2,76],22:[2,76],23:[2,76],24:[2,76],25:[2,76],26:[2,76],29:[2,76],41:[2,76],42:[2,76],45:[2,76],46:[2,76],47:[2,76],50:[2,76],53:[2,76],54:[2,76],56:[2,76],57:[2,76],60:[2,76],61:[2,76],64:[2,76]},{5:[2,65],7:[2,65],47:[2,65],53:[2,65],54:[2,65],56:[2,65]},{5:[2,40],7:[2,40],12:[1,35],13:[1,36],14:[1,37],15:[1,38],16:[1,39],17:[1,40],18:[1,41],19:[1,42],20:[1,43],21:[1,44],22:[1,45],23:[1,46],24:[1,47],25:[1,48],26:[1,49],29:[2,40],41:[2,40],42:[2,40],46:[2,40],47:[2,40],50:[2,40],53:[2,40],54:[2,40],56:[2,40],57:[2,40]}],
defaultActions: {32:[2,1],65:[2,51],66:[2,52],67:[2,53],68:[2,54],69:[2,55],70:[2,56]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == "undefined")
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === "function")
        this.parseError = this.yy.parseError;
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || 1;
        if (typeof token !== "number") {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == "undefined") {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
        if (typeof action === "undefined" || !action.length || !action[0]) {
            var errStr = "";
            if (!recovering) {
                expected = [];
                for (p in table[state])
                    if (this.terminals_[p] && p > 2) {
                        expected.push("'" + this.terminals_[p] + "'");
                    }
                if (this.lexer.showPosition) {
                    errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                } else {
                    errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1?"end of input":"'" + (this.terminals_[symbol] || symbol) + "'");
                }
                this.parseError(errStr, {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }
        }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0)
                    recovering--;
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
            if (ranges) {
                yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
            }
            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
            if (typeof r !== "undefined") {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}
};
undefined/* Jison generated lexer */
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
        if (this.options.ranges) this.yylloc.range = [0,0];
        this.offset = 0;
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) this.yylloc.range[1]++;

        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length-len-1);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length-1);
        this.matched = this.matched.substr(0, this.matched.length-1);

        if (lines.length-1) this.yylineno -= lines.length-1;
        var r = this.yylloc.range;

        this.yylloc = {first_line: this.yylloc.first_line,
          last_line: this.yylineno+1,
          first_column: this.yylloc.first_column,
          last_column: lines ?
              (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length:
              this.yylloc.first_column - len
          };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
less:function (n) {
        this.unput(this.match.slice(n));
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
            lines = match[0].match(/(?:\r\n?|\n).*/g);
            if (lines) this.yylineno += lines.length;
            this.yylloc = {first_line: this.yylloc.last_line,
                           last_line: this.yylineno+1,
                           first_column: this.yylloc.last_column,
                           last_column: lines ? lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length};
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;
            if (this.options.ranges) {
                this.yylloc.range = [this.offset, this.offset += this.yyleng];
            }
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
case 0:return 34;
break;
case 1:
  yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 35;

break;
case 2:
  yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 35;

break;
case 3:
  yy_.yytext = yy_.yytext.substr(1); return 63;

break;
case 4:/* skip whitespace */
break;
case 5:return 39;
break;
case 6:return 38;
break;
case 7:return 36;
break;
case 8:return 37;
break;
case 9:return 56;
break;
case 10:return 54;
break;
case 11:return 53;
break;
case 12:return 57;
break;
case 13:return 60;
break;
case 14:return 61;
break;
case 15:return 17;
break;
case 16:return 18;
break;
case 17:return 27;
break;
case 18:return "IN";
break;
case 19:return 19;
break;
case 20:return 20;
break;
case 21:return 21;
break;
case 22:return 25;
break;
case 23:return 23;
break;
case 24:return 17;
break;
case 25:return 18;
break;
case 26:return 53;
break;
case 27:return 56;
break;
case 28:return 27;
break;
case 29:return 24;
break;
case 30:return 22;
break;
case 31:return 7;
break;
case 32:return 28;
break;
case 33:return 29;
break;
case 34:return 45;
break;
case 35:return 46;
break;
case 36:return 48;
break;
case 37:return 50;
break;
case 38:return 41;
break;
case 39:return 42;
break;
case 40:return 64;
break;
case 41:return 47;
break;
case 42:return 12;
break;
case 43:return 13;
break;
case 44:return 14;
break;
case 45:return 15;
break;
case 46:return 16;
break;
case 47:return 43;
break;
case 48:return 5;
break;
case 49:return 'INVALID';
break;
}
};
lexer.rules = [/^(?:((?:[0-9]|[1-9][0-9]+))((?:\.[0-9]+))?((?:[eE][-+]?[0-9]+))?\b)/i,/^(?:"(\\x[a-fA-F0-9]{2}|\\u[a-fA-F0-9]{4}|\\[^xu]|[^"(\\)\n])*")/i,/^(?:'(\\['bfvnrt/(\\)]|\\u[a-fA-F0-9]{4}|[^'(\\)])*')/i,/^(?:%[1-9][0-9]*)/i,/^(?:([\s])+)/i,/^(?:undefined\b)/i,/^(?:null\b)/i,/^(?:true\b)/i,/^(?:false\b)/i,/^(?:select([\s])+each\b)/i,/^(?:select([\s])+first\b)/i,/^(?:select\b)/i,/^(?:(order([\s])+)?by\b)/i,/^(?:asc\b)/i,/^(?:desc\b)/i,/^(?:and\b)/i,/^(?:or\b)/i,/^(?:not\b)/i,/^(?:in\b)/i,/^(?:==)/i,/^(?:!=)/i,/^(?:=~)/i,/^(?:<=)/i,/^(?:>=)/i,/^(?:&&)/i,/^(?:\|\|)/i,/^(?:->)/i,/^(?:<:)/i,/^(?:!)/i,/^(?:<)/i,/^(?:>)/i,/^(?:\|)/i,/^(?:\()/i,/^(?:\))/i,/^(?:\[)/i,/^(?:\])/i,/^(?:\{)/i,/^(?:\})/i,/^(?:\?)/i,/^(?::)/i,/^(?:\.)/i,/^(?:,)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:%)/i,/^(?:[A-Za-z_$][A-Za-z_$0-9]+)/i,/^(?:$)/i,/^(?:.)/i];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49],"inclusive":true}};
return lexer;})()
parser.lexer = lexer;function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();
if ( typeof exports !== 'undefined' ) {
  if ( typeof module !== 'undefined' && module.exports ) {
    exports = module.exports = this.$objeq.parser.Parser;
  }
  exports.Parser = this.$objeq.parser.Parser;
}
