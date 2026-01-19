const parse = require("./core/parser")
const generate = require("./core/generator")

const stringEncrypt = require("./transforms/stringEncrypt")
const globalConceal = require("./transforms/globalConceal")
const antiDebug = require("./transforms/antiDebug")

module.exports = function nineObf(code, options = {}) {
  const ast = parse(code)

  if (options.stringEncrypt !== false) {
    stringEncrypt(ast, options)
  }

  if (options.globalConceal !== false) {
    globalConceal(ast, options)
  }

  if (options.antiDebug === true) {
    antiDebug(ast, options)
  }

  return generate(ast)
}