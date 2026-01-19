const estraverse = require("estraverse")
const { encryptString } = require("../core/encryptor")

module.exports = function stringEncrypt(ast, options = {}) {
  const pool = []
  const decoderName = options.name || "__nine_decode"

  estraverse.replace(ast, {
    enter(node) {
      if (
        node.type === "Literal" &&
        typeof node.value === "string" &&
        node.value.length > 0
      ) {
        const encoded = encryptString(node.value)
        const index = pool.push(encoded) - 1

        return {
          type: "CallExpression",
          callee: { type: "Identifier", name: decoderName },
          arguments: [
            { type: "Literal", value: index }
          ]
        }
      }
    }
  })

  if (pool.length > 0) {
    ast.body.unshift(createDecoder(pool, decoderName))
  }
}

function createDecoder(pool, name) {
  return {
    type: "FunctionDeclaration",
    id: { type: "Identifier", name },
    params: [{ type: "Identifier", name: "i" }],
    body: {
      type: "BlockStatement",
      body: [
        // const data = [ "98,99,100", ... ]
        {
          type: "VariableDeclaration",
          kind: "const",
          declarations: [{
            type: "VariableDeclarator",
            id: { type: "Identifier", name: "data" },
            init: {
              type: "ArrayExpression",
              elements: pool.map(v => ({
                type: "Literal",
                value: v
              }))
            }
          }]
        },
        // return data[i].split(",").map(c => String.fromCharCode(c - 1)).join("")
        {
          type: "ReturnStatement",
          argument: {
            type: "CallExpression",
            callee: {
              type: "MemberExpression",
              object: {
                type: "CallExpression",
                callee: {
                  type: "MemberExpression",
                  object: {
                    type: "CallExpression",
                    callee: {
                      type: "MemberExpression",
                      object: {
                        type: "MemberExpression",
                        object: { type: "Identifier", name: "data" },
                        property: { type: "Identifier", name: "i" },
                        computed: true
                      },
                      property: { type: "Identifier", name: "split" }
                    },
                    arguments: [{ type: "Literal", value: "," }]
                  },
                  property: { type: "Identifier", name: "map" }
                },
                arguments: [{
                  type: "FunctionExpression",
                  params: [{ type: "Identifier", name: "c" }],
                  body: {
                    type: "BlockStatement",
                    body: [{
                      type: "ReturnStatement",
                      argument: {
                        type: "CallExpression",
                        callee: {
                          type: "MemberExpression",
                          object: { type: "Identifier", name: "String" },
                          property: { type: "Identifier", name: "fromCharCode" }
                        },
                        arguments: [{
                          type: "BinaryExpression",
                          operator: "-",
                          left: { type: "Identifier", name: "c" },
                          right: { type: "Literal", value: 1 }
                        }]
                      }
                    }]
                  }
                }]
              },
              property: { type: "Identifier", name: "join" }
            },
            arguments: [{ type: "Literal", value: "" }]
          }
        }
      ]
    }
  }
}
