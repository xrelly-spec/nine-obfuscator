const acorn = require("acorn")

module.exports = function parse(code) {
  return acorn.parse(code, {
    ecmaVersion: "latest",
    sourceType: "module"
  })
}