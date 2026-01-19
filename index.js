const parse = require("./core/parser")
const generate = require("./core/generator")

const stringEncrypt = require("./transforms/stringEncrypt")
const identifierRename = require("./transforms/identifierRename")
const constantPool = require("./transforms/constantPool")
const controlFlow = require("./transforms/controlFlow")
const globalConceal = require("./transforms/globalConceal")
const antiDebug = require("./transforms/antiDebug")

module.exports = function nineObf(code, opt = {}) {
  const ast = parse(code)

  stringEncrypt(ast, opt)
  constantPool(ast)
  identifierRename(ast)
  controlFlow(ast)
  globalConceal(ast)
  antiDebug(ast)

  return generate(ast)
}
