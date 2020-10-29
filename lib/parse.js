const debug = true

// parse(str) -> expr
// > Parses a string into a boolean expression.
// > A boolean expression is a list of tokens.
// > Ideally, these token lists should be
// > able to be converted into functions.
module.exports = function parse(str) {
	let stack = []
	for (let i = 0; i < str.length; i++) {
		let chr = str[i]
		if (chr === " ") continue
		if (debug) console.log(chr, stack)
		let node = stack[stack.length - 1]
		let parent = stack[stack.length - 2]
		if (!node && chr !== "(") {
			// first pass
			// all operators invalid, so throw if we find one
			if (chr === "'") {
				throw new Error("Failed to parse boolean expression " + str
					+ ": Attempting to NOT an undefined clause")
			}
			if (chr === "+") {
				throw new Error("Failed to parse boolean expression " + str
					+ ": Attempting to OR an undefined clause")
			}
			if (chr === ")") {
				throw new Error("Failed to parse boolean expression " + str
					+ ": Attempting to terminate an undefined clause")
			}
			// this var is our token for now in case we terminate here
			stack.push(chr)
			continue
		}

		if (chr === "(") {
			if (!node) {
				let grp = [ "grp" ]
				stack.push(grp)
			} else {
				// AND clause with a group in form x(y)
				let grp = [ "grp" ]
				let and = [ "and", node, grp ]
				stack[stack.length - 1] = and
				stack.push(grp)
				if (parent) parent[parent.length - 1] = and
			}
			continue
		}

		if (chr === ")") {
			let token = null
			while (!token || token[0] !== "grp") {
				token = stack.pop()
			}
			stack.push(token[1])
			parent = stack[stack.length - 2]
			if (parent) parent[parent.length - 1] = token[1]
			continue
		}

		if (chr === "'") {
			// create token: NOT inverse of most recent var
			// replace var with inverse in stack
			// replace var with inverse in parent if existent
			// point to NOT node
			let not = [ "not", node ]
			stack[stack.length - 1] = not
			if (parent) parent[parent.length - 1] = not
			continue
		}

		if (chr === "+") {
			// create token: OR with highest level non-grouped parent
			// point to OR node
			let node = null
			let parent = null
			let i = stack.length
			while (i) {
				node = stack[--i]
				if (node[0] === "grp") {
					parent = node
					node = node[1]
					break
				}
			}
			let or = [ "or", node ]
			if (!parent) {
				stack.length = i
				stack.push(or)
			} else {
				stack.length = i + 1
				stack.push(or)
				parent[parent.length - 1] = or
			}
			continue
		}

		// if we reach this point, chr is another token
		if (node[0] === "or" && node.length === 2) {
			node.push(chr)
			stack.push(chr)
			continue
		}

		if (node[0] === "grp" && node.length === 1) {
			node.push(chr)
			stack.push(chr)
			continue
		}

		let and = [ "and", node, chr ]
		stack[stack.length - 1] = and
		stack.push(chr)
		if (parent) parent[parent.length - 1] = and
	}

	let token = stack[0]
	if (token && token[0] === "or" && token.length === 2) {
		throw new Error("Failed to parse boolean expression " + str +": Unterminated OR clause")
	}

	return token
}
