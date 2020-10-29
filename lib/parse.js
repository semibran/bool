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
			let or = [ "or", token ]
			tokens[tokens.length - 1] = or
			token = or
			continue
		}
		if (chr === "'") {
			let not = [ "not", token ]
			tokens[tokens.length - 1] = not
			exprs.push(not)
			token = not
			continue
		}
		if (!token) {
			token = [ "var", chr ]
			tokens.push(token)
			exprs.push(token)
			if (vars.indexOf(chr) < 0) {
				vars.push(chr)
			}
			continue
		}
		// if we reach this point, chr is another token
		if (token[0] === "or") {
			let other = [ "var", chr ]
			token.push(other)
			if (vars.indexOf(chr) < 0) {
				vars.push(chr)
			}
			continue
		} else {
			let other = [ "var", chr ]
			let and = [ "and", token, other ]
			tokens[tokens.length - 1] = and
			token = and
			if (vars.indexOf(chr) < 0) {
				vars.push(chr)
			}
		}
	}

	let last = tokens[tokens.length - 1]
	if (last && last[0] === "or" && last.length === 2) {
		throw new Error("Failed to parse boolean expression " + str +": Unterminated or clause")
	}

	return { vars, tokens }
}
