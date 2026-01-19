const JsConfuser = require("js-confuser")
const defaultOptions = require("./options")

module.exports = async function encrypt(code, customOptions = {}) {
  if (typeof code !== "string") {
    throw new Error("Input code harus string")
  }

  const options = {
    ...defaultOptions,
    ...customOptions
  }

  try {
    const result = await JsConfuser.obfuscate(code, options)
    return result
  } catch (err) {
    throw new Error("Encrypt gagal: " + err.message)
  }
}
