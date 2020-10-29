const parse = require("../lib/parse")

let input = process.argv[2]
let output = parse(input)
console.log(output)
