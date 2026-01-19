const parse = require("./core/parser")
const generate = require("./core/generator")

const stringEncrypt = require("./transforms/stringEncrypt")
const identifierRename = require("./transforms/identifierRename")
const constantPool = require("./transforms/constantPool")
const controlFlow = require("./transforms/controlFlow")
const globalConceal = require("./transforms/globalConceal")
const antiDebug = require("./transforms/antiDebug")

module.exports = function nineObf(code, opt = {}) {
  const options = {
    stringEncrypt: true,
    constantPool: true,
    rename: true,
    controlFlow: true,
    globalConceal: true,
    antiDebug: false,
    ...opt
  }

  const ast = parse(code)

  if (options.stringEncrypt) {
    stringEncrypt(ast, options)
  }

  if (options.constantPool) {
    constantPool(ast, options)
  }

  if (options.rename) {
    identifierRename(ast, options)
  }

  if (options.controlFlow) {
    controlFlow(ast, options)
  }
  
  if (options.globalConceal) {
    globalConceal(ast, options)
  }

  if (options.antiDebug) {
    antiDebug(ast, options)
  }

  return generate(ast)
}
