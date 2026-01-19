module.exports = function globalConceal(ast) {
  ast.body = [{
    type: "ExpressionStatement",
    expression: {
      type: "CallExpression",
      callee: {
        type: "FunctionExpression",
        params: [{ type: "Identifier", name: "__g" }],
        body: {
          type: "BlockStatement",
          body: ast.body
        }
      },
      arguments: [{
        type: "Identifier",
        name: "globalThis"
      }]
    }
  }]
}