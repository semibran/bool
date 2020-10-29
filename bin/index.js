const parse = require("../lib/parse")
const strify = require("../lib/strify")
const fnify = require("../lib/fn")

let expr = process.argv[2]
let token = parse(expr)
let restr = strify(token)
let fn = fnify(expr)
console.log("token: " + JSON.stringify(token))
console.log("restr: " + restr)
console.log("fn: " + fn)
