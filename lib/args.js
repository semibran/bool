module.exports = function reduceargs(token) {
	let vars = reducevars(token)
	let args = []
	for (let v of vars) {
		if (args.indexOf(v) >= 0) continue
		args.push(v)
	}
	return args.sort()
}

function reducevars(token) {
	if (typeof token === "string") return [ token ]
	let [ type, x, y ] = token
	if (type === "grp") return reducevars(x)
	if (type === "not") return reducevars(x)
	return reducevars(x).concat(reducevars(y))
}
