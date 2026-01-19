module.exports = {
  encryptString(str) {
    const out = []
    for (let i = 0; i < str.length; i++) {
      out.push(str.charCodeAt(i) + 1)
    }
    return out.join(",")
  },

  decryptRuntime(encoded) {
    return `
      function __nine_decode(s){
        return s.split(",").map(c=>String.fromCharCode(c-1)).join("")
      }
    `
  }
}
