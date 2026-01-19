module.exports = function controlFlow(ast) {
  ast.body.unshift({
    type: "IfStatement",
    test: {
      type: "BinaryExpression",
      operator: "===",
      left: { type: "Literal", value: 1 },
      right: { type: "Literal", value: 1 }
    },
    consequent: {
      type: "EmptyStatement"
    }
  })
}
