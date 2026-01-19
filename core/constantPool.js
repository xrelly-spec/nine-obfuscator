module.exports = function constantPool(ast) {
  const pool = [
    { type: "Literal", value: 0 },
    { type: "Literal", value: 1 },
    { type: "Literal", value: "length" },
    { type: "Literal", value: "undefined" },
    { type: "Literal", value: "fromCodePoint" }
  ]

  ast.body.unshift({
    type: "VariableDeclaration",
    kind: "const",
    declarations: [{
      type: "VariableDeclarator",
      id: { type: "Identifier", name: "_UlyN5V" },
      init: {
        type: "ArrayExpression",
        elements: pool
      }
    }]
  })
}
