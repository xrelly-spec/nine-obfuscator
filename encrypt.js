const JsConfuser = require("js-confuser")
const crypto = require("crypto")
const defaultOptions = require("./options")

function buildAntiTamper() {
  return `(function(){
    function die(){
      try{process.exit(1)}catch(e){while(true){}}
    }
    try{
      const fs = require("fs")
      const crypto = require("crypto")

      const realPath = __filename
      const code = fs.readFileSync(realPath,"utf8")
      const hash = crypto.createHash("sha256").update(code).digest("hex")

      const LOCK = "__HASH__"
      if (hash !== LOCK) die()

    }catch(e){die()}
  })();`
}

module.exports = async function encrypt(code, customOptions = {}) {
  if (typeof code !== "string") {
    throw new Error("Input code harus string")
  }

  const options = {
    ...defaultOptions,
    ...customOptions
  }
  let wrapped = `
/* nine-obfuscator-protect */
${buildAntiTamper(options.lockPath || "__filename__")}
${code}
`

  const hash = crypto
    .createHash("sha256")
    .update(wrapped)
    .digest("hex")

  wrapped = wrapped.replace("__HASH__", hash)

  const result = await JsConfuser.obfuscate(wrapped, options)
  return result
}
