# bool
> tiny boolean expression parser

## usage
```sh
$ bool [program] ...exprs

programs (defaults to table):
  help     show this help message
  table    displays the expression's associated truth table
  equals   determines if expr1 and expr2 are equivalent
  parse    displays expr as a lexed binary tree
  fnify    displays expr as a C function
  bitstr   displays expr as the final column in its truth table
  id       displays expr as its bitstring's base 10 uint
  debug    display truth table with debugging information

examples:
  $ bool x+y
  $ bool table x+y
  $ bool equals "x'y'" "(x+y)'"
```
