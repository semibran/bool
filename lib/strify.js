module.exports = function strify(op) {
	let [ type, x, y ] = op
	if (type === "var") {
		return x
	}
	if (type === "not") {
		return strify(x) + "'"
	}
	if (type === "and") {
		return strify(x) + strify(y)
	}
	if (type === "or") {
		return strify(x) + "+" + strify(y)
	}
}
