module.exports = function antiDebug(ast) {
  ast.body.unshift({
    type: "ExpressionStatement",
    expression: {
      type: "CallExpression",
      callee: {
        type: "FunctionExpression",
        params: [],
        body: {
          type: "BlockStatement",
          body: [
            {
              type: "IfStatement",
              test: {
                type: "BinaryExpression",
                operator: ">",
                left: {
                  type: "MemberExpression",
                  object: { type: "Identifier", name: "performance" },
                  property: { type: "Identifier", name: "now" }
                },
                right: {
                  type: "CallExpression",
                  callee: {
                    type: "MemberExpression",
                    object: { type: "Identifier", name: "performance" },
                    property: { type: "Identifier", name: "now" }
                  },
                  arguments: []
                }
              },
              consequent: {
                type: "ThrowStatement",
                argument: { type: "Literal", value: "" }
              }
            }
          ]
        }
      },
      arguments: []
    }
  })
                               }
