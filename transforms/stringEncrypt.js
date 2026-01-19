const estraverse = require("estraverse")
const { encryptString } = require("../core/encryptor")

module.exports = function stringEncrypt(ast, options) {
  const pool = []
  const decoderName = options.name || "__nine_decode"

  estraverse.replace(ast, {
    enter(node) {
      if (
        node.type === "Literal" &&
        typeof node.value === "string" &&
        node.value.length > 0
      ) {
        const encrypted = encryptString(node.value)
        const index = pool.push(encrypted) - 1

        return {
          type: "CallExpression",
          callee: { type: "Identifier", name: decoderName },
          arguments: [{ type: "Literal", value: index }]
        }
      }
    }
  })

  ast.body.unshift(createDecoder(pool, decoderName))
}

function createDecoder(pool, name) {
  return {
    type: "FunctionDeclaration",
    id: { type: "Identifier", name },
    params: [{ type: "Identifier", name: "i" }],
    body: {
      type: "BlockStatement",
      body: [
        {
          type: "VariableDeclaration",
          kind: "const",
          declarations: [{
            type: "VariableDeclarator",
            id: { type: "Identifier", name: "data" },
            init: {
              type: "ArrayExpression",
              elements: pool.map(v => ({ type: "Literal", value: v }))
            }
          }]
        },
        {
          type: "ReturnStatement",
          argument: {
            type: "CallExpression",
            callee: { type: "Identifier", name: "__nine_xor" },
            arguments: [{
              type: "MemberExpression",
              object: { type: "Identifier", name: "data" },
              property: { type: "Identifier", name: "i" },
              computed: true
            }]
          }
        }
      ]
    }
  }
}