// parse(str) -> expr
// > Parses a string into a boolean expression.
// > A boolean expression is a list of tokens.
// > Ideally, these token lists should be
// > able to be converted into functions.
// >
// > Types of tokens:
// > { type = "or", operands = [ exp1, exp2 ] }
// > definition of an expression in this case is fuzzy
// > maybe store a list of unique expressions
// > and refer to them by index

module.exports = function parse(str) {
	let vars = []
	let exprs = []
	let tokens = []
	let token = null
	for (let i = 0; i < str.length; i++) {
		let chr = str[i]
		if (chr === " ") continue
		if (chr === "+") {
			token[0] = "or"
			continue
		}
		if (chr === "'") {
			token[0] = "not"
			token = null
			continue
		}
		if (!token) {
			token = [ "id", chr ]
			tokens.push(token)
			if (vars.indexOf(chr) < 0) {
				vars.push(chr)
			}
			continue
		}
		// if we reach this point, chr is another token
		if (token[0] === "or") {
			token.push(chr)
			token = null
			continue
		} else {
			token[0] = "and"
			token.push(chr)
			token = null
		}
	}

	let last = tokens[tokens.length - 1]
	if (last && last[0] === "or" && last.length === 2) {
		throw new Error("Failed to parse boolean expression " + str +": Unterminated or clause")
	}

	return { vars, tokens }
}
