// 【参考】
// https://www.freecodecamp.org/japanese/news/how-to-reverse-a-string-in-javascript-in-3-different-ways-75e4763c68cb/

// 【内容：文字列を反転させる】

/**
 * 反転した文字列を取得する
 *
 * @function
 * @param {string[]} str 元となる文字列
 * @returns {string[]} 反転した文字列
 */
const getReverseString = (str) => {
  return str.split("").reverse().join("");
};

const getReverseString2 = (str) => {
  let result = "";
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
};

const getReverseString3 = (str) => {
  if (str === "") return "";
  return getReverseString3(str.substr(1)) + str.charAt(0);
};

console.log(getReverseString("test"));
console.log(getReverseString2("test"));
console.log(getReverseString3("test"));
