const parse = require("../lib/parse")
const strify = require("../lib/strify")
const fnify = require("../lib/fn")

let expr = process.argv[2]

let token = parse(expr)
console.log("token: " + JSON.stringify(token))

let restr = strify(token)
console.log("restr: " + restr)

let fn = fnify(expr)
console.log("fn: " + fn)
