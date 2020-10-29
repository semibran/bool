module.exports = function strify(token, parent) {
	if (typeof token === "string") return token
	let [ type, x, y ] = token
	if (type === "not") {
		if (x[0] === "and" || x[0] === "or") {
			return "(" + strify(x) + ")'"
		} else {
			return strify(x) + "'"
		}
	}
	if (type === "and") {
		return strify(x, type) + strify(y, type)
	}
	if (type === "or") {
		return strify(x, type) + "+" + strify(y, type)
	}
}
