// 【参考】
// https://javascript.programmer-reference.com/js-regexp-sample/
// https://mebee.info/2020/09/20/post-18756/

// 【内容：正規表現パターンサンプル】
const REGS = {
  num: /^[0-9]*$/,
  numNoBlank: /^[0-9]+$/,
  alphabet: /^[a-zA-Z]*$/,
  numNoBlank: /^[a-zA-Z]+$/,
  numAlphabet: /^[0-9a-zA-Z]*$/,
  numAlphabetSign: /^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/,
  url: /^https?:\/\//,
  postCode: /^\d{3}-\d{4}$/,
  ip: /^\d{1,3}(\.\d{1,3}){3}$/,
  decimal: /^([1-9][0-9]*|0)(\.[0-9]+)?$/,
  decimal2: /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/,
  zenHira: /^[ぁ-んー]*$/,
  zenKana: /^[ァ-ンヴー]*$/,
  hanKana: /^[ｧ-ﾝﾞﾟ\-]*$/,
  // こっちだと「あｧ」の時に正しい判定にならなかった
  // zen: /^[^\x20-\x7e]*$/,
  zen: /^[^\x01-\x7E\uFF61-\uFF9F]+$/,
};

const checkReg = (text, type) => {
  const reg = new RegExp(REGS[type]);
  return reg.test(text);
};

console.log(checkReg("002", "num"));
console.log(checkReg("0a2", "numAlphabet"));
console.log(checkReg("https://s-ishizaki.sakura.ne.jp/", "url"));
console.log(checkReg("-1.2", "decimal2"));
console.log(checkReg("あｧ", "zen"));
