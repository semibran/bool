const debug = false

// parse(str) -> expr
// > Parses a string into a boolean expression.
// > A boolean expression is a list of tokens.
// > Ideally, these token lists should be
// > able to be converted into functions.
module.exports = function parse(str) {
	let token = null
	let focus = null
	let parent = null
	let paren = null
	for (let i = 0; i < str.length; i++) {
		let chr = str[i]
		if (chr === " ") continue
		if (debug) console.log(chr, focus, parent)
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

		if (chr === "(") {
			paren = true
			continue
		}

		if (chr === ")") {
			paren = false
			continue
		}

		if (chr === "+") {
			// promote focus to OR token
			let or = [ "or", token || focus ]
			focus = or
			token = or
			parent = or
			continue
		}

		if (chr === "'") {
			// promote focus to NOT token
			let not = [ "not", focus ]
			focus = not
			if (!parent) {
				token = not
			} else {
				parent[2] = not
			}
			continue
		}

		// if we reach this point, chr is another token. either OR or AND it
		if (focus[0] === "or") {
			focus.push(chr)
			focus = chr
			continue
		} else {
			// promote focus to AND token
			let and = [ "and", focus, chr ]
			focus = chr
			if (!parent) {
				token = and
				parent = and
			} else if (parent[0] === "or") {
				// higher priority operator takes precedence
				parent[2] = parent[1]
				parent[1] = and
				parent = and
			} else if (parent[0] === "and") {
				parent[2] = and
				parent = and
			} else {
				parent = and
			}
		}
	}

	if (token && token[0] === "or" && token.length === 2) {
		throw new Error("Failed to parse boolean expression " + str +": Unterminated OR clause")
	}

	return token
}
