const parse = require("../lib/parse")
const strify = require("../lib/strify")
const fnify = require("../lib/fn")
const reduceargs = require("../lib/args")

let prog = process.argv[2]
let expr = process.argv[3]
if (prog && !expr) {
	expr = prog
	prog = null
}

if (!expr) {
	console.log("Enter a valid boolean expression, eg. x+y")
	process.exit()
}

let token = parse(expr)
let fn = fnify(token)
if (prog === "parse") {
	console.log(JSON.stringify(token) + "\n")
	process.exit()
} else if (prog === "fnify") {
	console.log(fn + "\n")
	process.exit()
} else if (prog === "debug") {
	let restr = strify(token)
	console.log("token: " + JSON.stringify(token))
	console.log("restr: " + restr)
	console.log("fnify: " + fn)
} else if (prog) {
	console.log("Unrecognized program " + prog)
	console.log("Valid values are parse, fnify, and debug\n")
	process.exit()
}

let args = reduceargs(token)
let argc = args.length
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

console.log()
