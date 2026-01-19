const KEY = 123

function xorEncode(str) {
  return str
    .split("")
    .map(c => c.charCodeAt(0) ^ KEY)
    .join(",")
}

function xorDecode(data) {
  return data
    .split(",")
    .map(c => String.fromCharCode(Number(c) ^ KEY))
    .join("")
}

global.__nine_xor = xorDecode

module.exports = {
  xorEncode,
  xorDecode
}
