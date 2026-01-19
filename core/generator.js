const escodegen = require("escodegen")

module.exports = function generate(ast) {
  return escodegen.generate(ast, {
    format: {
      compact: false,
      semicolons: true
    }
  })
}