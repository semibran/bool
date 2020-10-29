// parse(str) -> expr
// > Parses a string into a boolean expression.
// > A boolean expression is a list of tokens.
// > Ideally, these token lists should be
// > able to be converted into functions.
module.exports = function parse(str) {
	let token = null
	let focus = null
	for (let i = 0; i < str.length; i++) {
		let chr = str[i]
		if (chr === " ") continue
		if (chr === "+") {
			let or = [ "or", token ]
			token = or
			focus = or
			continue
		}
		if (chr === "'") {
			let not = [ "not", token ]
			token = not
			focus = not
			continue
		}
		if (!token) {
			token = [ "var", chr ]
			focus = token
			continue
		}
		// if we reach this point, chr is another token
		if (focus[0] === "or") {
			let other = [ "var", chr ]
			focus.push(other)
			focus = other
			continue
		} else {
			let other = [ "var", chr ]
			let and = [ "and", token, other ]
			token = and
			focus = and
		}
	}

	if (token && token[0] === "or" && token.length === 2) {
		throw new Error("Failed to parse boolean expression " + str +": Unterminated or clause")
	}

	return token
}
