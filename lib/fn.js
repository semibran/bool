const reduceargs = require("./args")

module.exports = function fnify(token) {
	let str = strify(token)
	let args = reduceargs(token)
	return eval("(" + args.join(",") + ")=>" + str)
}

function strify(token, parent) {
	if (typeof token === "string") return token
	let [ type, x, y ] = token
	if (type === "not") {
		return "!" + strify(x, type)
	}
	if (type === "and") {
		return strify(x, type) + "&&" + strify(y, type)
	}
	if (type === "or") {
		let clause = strify(x, type) + "||" + strify(y, type)
		if (parent === "not" || parent === "and") {
			return "(" + clause + ")"
		} else {
			return clause
		}
	}
}
