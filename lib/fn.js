const parse = require("./parse")

module.exports = function fnify(expr) {
	let token = parse(expr)
	let str = strify(token)
	return str
}

function strify(token) {
	let [ type, x, y ] = token
	if (type === "var") {
		return x
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
