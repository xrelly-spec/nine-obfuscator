const estraverse = require("estraverse")

module.exports = function identifierRename(ast) {
  const map = new Map()
  let count = 0

  function gen() {
    return (
      String.fromCharCode(107 + (count % 10)) +
      Math.random().toString(36).slice(2, 6)
    )
  }

  estraverse.traverse(ast, {
    enter(node) {
      if (
        node.type === "Identifier" &&
        !["require","module","exports","globalThis"].includes(node.name)
      ) {
        if (!map.has(node.name)) {
          map.set(node.name, gen())
        }
        node.name = map.get(node.name)
      }
    }
  })
}
