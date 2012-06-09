/*
 * Copyright (c) 2012 Agilo Software GmbH
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/**
 * objeq (JavaScript Object Querying)
 *
 * This module defines both a Lexer and Grammar that use the
 * Jison Parser Generator (http://zaach.github.com/jison/)
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

{ws}+                         /* skip whitespace */
"undefined"                   return 'UNDEFINED';
"null"                        return 'NULL';
"true"                        return 'TRUE';
"false"                       return 'FALSE';
"select"                      return 'SELECT';
("order"{ws}+)?"by"           return 'ORDER_BY';
"asc"                         return 'ASC';
"desc"                        return 'DESC';
"and"                         return 'AND';
"or"                          return 'OR';
"not"                         return 'NOT';
"in"                          return "IN";
"=="                          return 'EQ';
"!="                          return 'NEQ';
"=~"                          return 'RE';
"<="                          return 'LTE';
">="                          return 'GTE';
"&&"                          return 'AND';
"||"                          return 'OR';
"->"                          return 'SELECT';
"!"                           return 'NOT';
"<"                           return 'LT';
">"                           return 'GT';
"("                           return '(';
")"                           return ')';
"["                           return '[';
"]"                           return ']';
"{"                           return '{';
"}"                           return '}';
":"                           return ':';
"."                           return '.';
","                           return ',';
"+"                           return '+';
"-"                           return '-';
"*"                           return '*';
"/"                           return '/';
"%"                           return '%';
[A-Za-z_$][A-Za-z_$0-9]+      return 'IDENT';
<<EOF>>                       return 'EOF';
.                             return 'INVALID';

/lex

/* Operator Associativity and Precedence */

%left '+' '-'
%left '*' '/'
%left '%'
%left AND OR
%left EQ NEQ IN RE
%left GT GTE LT LTE
%left NOT NEG
%left '.'

%start program

%% /* Parser Grammar */

/*
 * There are optimizations we can perform here, like combining literals,
 * but for now, we just want to get this thing to work
 */

program
  : query EOF        { return $1; }
  ;

query
  : expr             { $$ = { expr: $1 }; }
  | filter           { $$ = $1; $1.expr = true; }
  | expr filter      { $$ = $2; $2.expr = $1; }
  ;

filter
  : order_by         { $$ = { order: $1, sortFirst: true }; }
  | order_by select  { $$ = { order: $1, select: $2, sortFirst: true }; }
  | select           { $$ = { select: $1 }; }
  | select order_by  { $$ = { select: $1, order: $2 }; }
  ;

expr
  : expr '+' expr    { $$ = yy.node('add', $1, $3); }
  | expr '-' expr    { $$ = yy.node('sub', $1, $3); }
  | expr '*' expr    { $$ = yy.node('mul', $1, $3); }
  | expr '/' expr    { $$ = yy.node('div', $1, $3); }
  | expr '%' expr    { $$ = yy.node('mod', $1, $3); }
  | expr AND expr    { $$ = yy.node('and', $1, $3); }
  | expr OR expr     { $$ = yy.node('or', $1, $3); }
  | expr EQ expr     { $$ = yy.node('eq', $1, $3); }
  | expr NEQ expr    { $$ = yy.node('neq', $1, $3); }
  | expr RE expr     { $$ = yy.node('re', $1, $3); }
  | expr GT expr     { $$ = yy.node('gt', $1, $3); }
  | expr GTE expr    { $$ = yy.node('gte', $1, $3); }
  | expr LT expr     { $$ = yy.node('lt', $1, $3); }
  | expr LTE expr    { $$ = yy.node('lte', $1, $3); }
  | expr IN expr     { $$ = yy.node('in', $1, $3); }
  | NOT expr         { $$ = yy.node('not', $2); }
  | '-' expr         %prec NEG { $$ = yy.node('neg', $2); }
  | '(' expr ')'     { $$ = $2; }
  | func             { $$ = $1; }
  | array            { $$ = $1; }
  | obj              { $$ = $1; }
  | NUMBER           { $$ = Number(yytext); }
  | STRING           { $$ = yytext; }
  | TRUE             { $$ = true; }
  | FALSE            { $$ = false; }
  | NULL             { $$ = null; }
  | UNDEFINED        { $$ = undefined; }
  | path             { $$ = $1; }
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

select
  : SELECT expr                { $$ = $2; }
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

path
  : arg_path                   { $$ = $1; }
  | local_path                 { $$ = $1; }
  ;

arg_path
  : ARGREF                    { $$ = yy.path(Number($1)-1); }
  | arg_path '.' IDENT        { $$ = $1; $1.push($3); }
  ;

local_path
  : IDENT                     { $$ = yy.path($1); }
  | local_path '.' IDENT      { $$ = $1; $1.push($3); }
  ;
