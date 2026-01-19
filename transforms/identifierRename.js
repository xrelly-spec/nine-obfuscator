const { randomName } = require("../utils/random")

module.exports = function identifierRename(ast, options = {}) {
  const map = Object.create(null)

  ast.traverse({
    Identifier(path) {
      if (
        path.parent.type === "MemberExpression" &&
        path.parent.property === path.node &&
        !path.parent.computed
      ) return

      const name = path.node.name

      if (
        name === "require" ||
        name === "module" ||
        name === "exports" ||
        name === "__dirname" ||
        name === "__filename"
      ) return

      if (!map[name]) {
        map[name] = "_" + randomName(6)
      }

      path.scope.rename(name, map[name])
    }
  })
}
