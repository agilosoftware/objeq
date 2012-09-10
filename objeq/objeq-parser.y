/*!
 * objeq (JavaScript Object Querying)
 * Licensed under the MIT License
 * see doc/LICENSE.md
 *
 * @author Thom Bradford (github/bradford653)
 * @author Stefano Rago (github/sterago)
 */

%lex

%options case-insensitive

digit [0-9]
esc   "\\"
card  (?:[0-9]|[1-9][0-9]+)
exp   (?:[eE][-+]?[0-9]+)
frac  (?:\.[0-9]+)
ws    [\s]

%%

{card}{frac}?{exp}?\b return 'NUMBER';

'"'("\\x"[a-fA-F0-9]{2}|"\\u"[a-fA-F0-9]{4}|"\\"[^xu]|[^"{esc}\n])*'"' {
  yytext = yytext.substr(1,yyleng-2); return 'STRING';
}
"'"("\\"['bfvnrt/{esc}]|"\\u"[a-fA-F0-9]{4}|[^'{esc}])*"'" {
  yytext = yytext.substr(1,yyleng-2); return 'STRING';
}

"%"[1-9][0-9]* {
  yytext = yytext.substr(1); return 'ARGREF';
};

{ws}+                     /* skip whitespace */
"undefined"               return 'UNDEFINED';
"null"                    return 'NULL';
"true"                    return 'TRUE';
"false"                   return 'FALSE';
"when"                    return 'WHEN';
"select"                  return 'SELECT';
"contract"                return 'CONTRACT';
"expand"                  return 'EXPAND';
"aggregate"               return 'AGGREGATE';
("order"{ws}+)?"by"       return 'ORDER_BY';
"then"                    return 'THEN';
"this"                    return 'THIS';
"asc"                     return 'ASC';
"desc"                    return 'DESC';
"and"                     return 'AND';
"or"                      return 'OR';
"not"                     return 'NOT';
"in"                      return "IN";
"=="                      return 'EQ';
"!="                      return 'NEQ';
"=~"                      return 'RE';
"<="                      return 'LTE';
">="                      return 'GTE';
"&&"                      return 'AND';
"||"                      return 'OR';
"->"                      return 'SELECT';
":>"                      return 'CONTRACT';
"<:"                      return 'EXPAND';
":="                      return 'AGGREGATE';
"!"                       return 'NOT';
"<"                       return 'LT';
">"                       return 'GT';
"|"                       return 'THEN';
"("                       return '(';
")"                       return ')';
"["                       return '[';
"]"                       return ']';
"{"                       return '{';
"}"                       return '}';
"?"                       return '?';
":"                       return ':';
"."                       return '.';
","                       return ',';
"+"                       return '+';
"-"                       return '-';
"*"                       return '*';
"/"                       return '/';
"%"                       return '%';
[A-Za-z_$][A-Za-z_$0-9]+  return 'IDENT';
<<EOF>>                   return 'EOF';
.                         return 'INVALID';

/lex

/* Operator Associativity and Precedence */

%left '?'
%left OR
%left AND
%left EQ NEQ IN RE
%left GT GTE LT LTE
%left '+' '-'
%left '*' '/' '%'
%left NOT NEG
%left '.'

%start program

%% /* Parser Grammar */

/*
 * There are optimizations we can perform here, like combining literals,
 * but for now, we just want to get this thing to work
 */

program
  : query EOF          { return $1; }
  ;

query
  : step               { $$ = [$1]; }
  | query THEN step    { $$ = $1; $1.push($3); yy.step += 1; }
  ;

step
  : when               { $$ = $1; }
  | when filter        { $$ = $2; $2.expr = $1.expr; }
  | when aggr          { $$ = $1; $1.aggregate = $2; }
  | when filter aggr   { $$ = $2; $2.expr = $1.expr; $2.aggregate = $3; }
  | filter             { $$ = $1; }
  | filter aggr        { $$ = $1; $1.aggregate = $2; }
  | aggr               { $$ = { aggregate: $1 }; }
  ;

when
  : expr               { $$ = { expr: $1 }; }
  | WHEN expr          { $$ = { expr: $2 }; }
  ;

filter
  : order_by           { $$ = { order: $1, sortFirst: true }; }
  | order_by selector  { $$ = { order: $1, select: $2, sortFirst: true }; }
  | selector           { $$ = { select: $1 }; }
  | selector order_by  { $$ = { select: $1, order: $2 }; }
  ;

expr
  : expr '+' expr      { $$ = yy.node('add', $1, $3); }
  | expr '-' expr      { $$ = yy.node('sub', $1, $3); }
  | expr '*' expr      { $$ = yy.node('mul', $1, $3); }
  | expr '/' expr      { $$ = yy.node('div', $1, $3); }
  | expr '%' expr      { $$ = yy.node('mod', $1, $3); }
  | expr AND expr      { $$ = yy.node('and', $1, $3); }
  | expr OR expr       { $$ = yy.node('or', $1, $3); }
  | expr EQ expr       { $$ = yy.node('eq', $1, $3); }
  | expr NEQ expr      { $$ = yy.node('neq', $1, $3); }
  | expr RE expr       { $$ = yy.node('re', $1, $3); }
  | expr GT expr       { $$ = yy.node('gt', $1, $3); }
  | expr GTE expr      { $$ = yy.node('gte', $1, $3); }
  | expr LT expr       { $$ = yy.node('lt', $1, $3); }
  | expr LTE expr      { $$ = yy.node('lte', $1, $3); }
  | expr IN expr       { $$ = yy.node('in', $1, $3); }
  | NOT expr           { $$ = yy.node('not', $2); }
  | '-' expr           %prec NEG { $$ = yy.node('neg', $2); }
  | '(' expr ')'       { $$ = $2; }
  | ternary            { $$ = $1; }
  | func               { $$ = $1; }
  | array              { $$ = $1; }
  | obj                { $$ = $1; }
  | NUMBER             { $$ = Number(yytext); }
  | STRING             { $$ = yytext; }
  | TRUE               { $$ = true; }
  | FALSE              { $$ = false; }
  | NULL               { $$ = null; }
  | UNDEFINED          { $$ = undefined; }
  | path               { $$ = $1; }
  ;

ternary
  : expr '?' expr ':' expr     { $$ = yy.node('tern', $1, $3, $5); }
  ;

func
  : IDENT '(' expr_list ')'    { $$ = yy.node('func', $1, $3); }
  | IDENT '(' ')'              { $$ = yy.node('func', $1, []); }
  ;

array
  : '[' expr_list ']'          { $$ = yy.node('arr', $2); }
  | '[' ']'                    { $$ = yy.node('arr', []); }
  ;

expr_list
  : expr                       { $$ = [$1]; }
  | expr_list ',' expr         { $$ = $1; $1.push($3); }
  ;

obj
  : '{' obj_items '}'          { $$ = yy.node('obj', $2); }
  | '{' '}'                    { $$ = yy.node('obj', {}); }
  ;

obj_items
  : obj_item                   { $$ = {}; $$[$1[0]] = $1[1]; }
  | obj_items ',' obj_item     { $$ = $1; $$[$3[0]] = $3[1]; }
  ;

obj_non_id: NUMBER | STRING | TRUE | FALSE | NULL | UNDEFINED;

obj_item
  : obj_non_id ':' expr        { $$ = [$1, $3]; }
  | IDENT ':' expr             { $$ = [$1, $3]; }
  | IDENT                      { $$ = [$1, yy.path($1)]; }
  ;

selector
  : SELECT expr                { $$ = yy.node('select', $2); }
  | CONTRACT expr              { $$ = yy.node('contract', $2); }
  | EXPAND expr                { $$ = yy.node('expand', $2); }
  ;

order_by
  : ORDER_BY order_list        { $$ = $2; }
  ;

order_list
  : order_spec                 { $$ = [$1]; }
  | order_list ',' order_spec  { $$ = $1; $1.push($3); }
  ;

order_spec
  : local_path                 { $$ = { path: $1, ascending: true }; }
  | local_path ASC             { $$ = { path: $1, ascending: true }; }
  | local_path DESC            { $$ = { path: $1 }; }
  ;

aggr
  : AGGREGATE aggr_list        { $$ = $2; }
  ;

aggr_list
  : IDENT                      { $$ = [$1]; }
  | aggr_list ',' IDENT        { $$ = $1; $1.push($3); }
  ;

path
  : arg_path                   { $$ = $1; }
  | local_path                 { $$ = $1; }
  ;

arg_path
  : ARGREF                    { $$ = yy.path(Number($1)-1); }
  | arg_path '.' IDENT        { $$ = $1; $1.push($3); }
  | arg_path '[' expr ']'     { $$ = $1; $1.push($3); }
  ;

local_path
  : THIS                      { $$ = yy.path(); }
  | IDENT                     { $$ = yy.path($1); }
  | local_path '.' IDENT      { $$ = $1; $1.push($3); }
  | local_path '[' expr ']'   { $$ = $1; $1.push($3); }
  ;
