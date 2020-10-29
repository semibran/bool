const reduceargs = require("./args")

module.exports = function fnify(token) {
	let str = strify(token)
	let args = reduceargs(token)
	return eval("(" + args.join(",") + ")=>" + str)
}

function strify(token) {
	if (typeof token === "string") return token
	let [ type, x, y ] = token
	if (type === "grp") {
		return "(" + strify(x) + ")"
	}
	if (type === "not") {
		return "!" + strify(x)
	}
	if (type === "and") {
		return strify(x) + "&&" + strify(y)
	}
	if (type === "or") {
		return strify(x) + "||" + strify(y)
	}
}
