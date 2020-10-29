// parse(str) -> expr
// > Parses a string into a boolean expression.
// > A boolean expression is a list of tokens.
// > Ideally, these token lists should be
// > able to be converted into functions.
module.exports = function parse(str) {
	let token = null
	for (let i = 0; i < str.length; i++) {
		let chr = str[i]
		if (chr === " ") continue
		if (chr === "+") {
			let or = [ "or", token ]
			token = or
			continue
		}
		if (chr === "'") {
			let not = [ "not", token ]
			token = not
			continue
		}
		if (!token) {
			token = [ "var", chr ]
			continue
		}
		// if we reach this point, chr is another token
		if (token[0] === "or") {
			let other = [ "var", chr ]
			token.push(other)
			continue
		} else {
			let other = [ "var", chr ]
			let and = [ "and", token, other ]
			token = and
		}
	}

	if (token && token[0] === "or" && token.length === 2) {
		throw new Error("Failed to parse boolean expression " + str +": Unterminated or clause")
	}

	return token
}
