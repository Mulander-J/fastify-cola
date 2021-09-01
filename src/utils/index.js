
const codeArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

exports.getCode = (len = 6) => {
  let code = ""
  for (let i = 0; i < len; i++) {
    let randomI = Math.floor(Math.random() * 36);
    code += codeArr[randomI];
  }
  // console.log('[ code ] >', code)
  return code
}