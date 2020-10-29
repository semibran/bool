const parse = require("../lib/parse")
const strify = require("../lib/strify")
const fnify = require("../lib/fn")
const reduceargs = require("../lib/args")

let expr = process.argv[2]

let token = parse(expr)
// console.log("token: " + JSON.stringify(token))

// let restr = strify(token)
// console.log("restr: " + restr)

let args = reduceargs(token)
let argc = args.length
let fn = fnify(token)
// console.log("fn: " + fn)

console.log(args.join(" ") + " " + expr)
let perms = Math.pow(2, argc)
for (let i = 0; i < perms; i++) {
	let str = i.toString(2)
	while (str.length < argc) {
		str = "0" + str
	}
	let argv = str.split("").map(Number)
	console.log(argv.join(" "), Number(fn(...argv)))
}
