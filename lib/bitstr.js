const reduceargs = require("./args")
const fnify = require("./fn")

module.exports = function bitstr(token) {
	let bits = ""
	let fn = fnify(token)
	let argc = reduceargs(token).length
	let perms = Math.pow(2, argc)
	for (let i = 0; i < perms; i++) {
		let str = i.toString(2)
		while (str.length < argc) {
			str = "0" + str
		}
		let argv = str.split("").map(Number)
		bits += Number(fn(...argv))
	}
	return bits
}
