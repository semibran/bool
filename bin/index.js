const fs = require("fs")
const path = require("path")
const parse = require("../lib/parse")
const strify = require("../lib/strify")
const fnify = require("../lib/fn")
const reduceargs = require("../lib/args")
const bitstr = require("../lib/bitstr")

let prog = process.argv[2]
let expr = process.argv[3]
let expr2 = process.argv[4]
if (prog && !expr && prog !== "help") {
	expr = prog
	prog = null
}

if (!expr || prog === "help") {
	console.log(fs.readFileSync(path.join(__dirname, "./help.txt"), "utf-8"))
	process.exit()
}

let token = parse(expr)
if (prog === "debug") {
	console.log("token: " + JSON.stringify(token))
	console.log("restr: " + strify(token))
}

let fn = fnify(token)
if (prog === "table") {
	// do nothing; everything is handled outside of this conditional
} else if (prog === "id") {
	console.log(parseInt(bitstr(token), 2))
	process.exit()
} else if (prog === "bitstr") {
	console.log(bitstr(token))
	process.exit()
} else if (prog === "equals") {
	let token2 = parse(expr2)
	console.log(bitstr(token) === bitstr(token2))
	process.exit()
} else if (prog === "parse") {
	console.log(JSON.stringify(token) + "\n")
	process.exit()
} else if (prog === "fnify") {
	console.log(fn + "\n")
	process.exit()
} else if (prog === "debug") {
	console.log("fnify: " + fn)
} else if (prog) {
	console.log("Unrecognized program " + prog)
	console.log("Valid values are table, equals, id, bitstr, parse, fnify, and debug\n")
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
