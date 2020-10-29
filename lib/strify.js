module.exports = function strify(token) {
	if (typeof token === "string") return token
	let [ type, x, y ] = token
	if (type === "grp") {
		return "(" + strify(x) + ")"
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
