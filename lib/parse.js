const ops = [ "+", "'" ]

// parse(str) -> expr
// > Parses a string into a boolean expression.
module.exports = function parse(str) {
	let vars = []
	let tokens = []
	for (let i = 0; i < str.length; i++) {
		let chr = str[i]
		if (chr === " ") continue
		if (ops.indexOf(chr) < 0 && vars.indexOf(chr) < 0) {
			vars.push(chr)
		}
	}
	return { vars, tokens }
}
