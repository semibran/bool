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
		if (x[0] === "and" || x[0] === "or") {
			return "!(" + strify(x, type) + ")"
		} else {
			return "!" + strify(x, type)
		}
	}
	if (type === "and") {
		return strify(x, type) + "&&" + strify(y, type)
	}
	if (type === "or") {
		return strify(x, type) + "||" + strify(y, type)
	}
}
