function encodeString(str) {
  const codes = []

  for (let i = 0; i < str.length; i++) {
    codes.push(str.charCodeAt(i) + 1)
  }

  return codes
}

function buildDecoder(codes) {
  return `
(function(){
  var _r = [];
  for(var i = 0; i < ${codes.length}; i++){
    _r.push(String.fromCharCode(${codes[i]} - 1));
  }
  return _r.join("");
})()
`
}

module.exports = {
  encryptString(str) {
    const encoded = encodeString(str)
    return buildDecoder(encoded)
  }
}
