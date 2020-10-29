// parse(str) -> expr
// > Parses a string into a boolean expression.
// > A boolean expression is a list of tokens.
// > Ideally, these token lists should be
// > able to be converted into functions.
module.exports = function parse(str) {
	let token = null
	let focus = null
	let parent = null
	for (let i = 0; i < str.length; i++) {
		let chr = str[i]
		if (chr === " ") continue
		if (!focus) {
			// first pass
			// all operators invalid, so throw if we find one
			if (chr === "'") {
				throw new Error("Failed to parse boolean expression " + str +": Attempting to NOT an undefined clause")
			}
			if (chr === "+") {
				throw new Error("Failed to parse boolean expression " + str +": Attempting to OR an undefined clause")
			}
			// this var is our token for now in case we terminate
			token = chr
			focus = token
			continue
		}

		if (chr === "+") {
			// promote focus to OR token
			let or = [ "or", focus ]
			focus = or
			if (!parent) {
				token = or
				parent = or
			} else {
				parent[2] = or
			}
			continue
		}

		if (chr === "'") {
			// promote focus to NOT token
			let not = [ "not", focus ]
			focus = not
			if (!parent) {
				token = not
				parent = not
			} else {
				parent[2] = not
			}
			continue
		}

		// if we reach this point, chr is another token. either OR or AND
		if (focus[0] === "or") {
			focus.push(chr)
			focus = chr
			continue
		} else {
			let and = [ "and", focus, chr ]
			focus = and
			if (!parent) {
				token = and
				parent = and
			} else {
				parent[2] = and
			}
		}
	}

	if (token && token[0] === "or" && token.length === 2) {
		throw new Error("Failed to parse boolean expression " + str +": Unterminated OR clause")
	}

	return token
}
