const { xorEncode } = require("../utils/xor")

module.exports = {
  encryptString(str) {
    return xorEncode(str)
  }
}
