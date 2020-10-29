const parse = require("../lib/parse")
const strify = require("../lib/strify")

let expr = process.argv[2]
let token = parse(expr)
let restr = strify(token)
console.log("token: " + JSON.stringify(token))
console.log("restr: " + restr)
