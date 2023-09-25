// 【参考】
// https://qiita.com/netebakari/items/7c1db0b0cea14a3d4419

// 【内容：配列の重複排除】

/**
 * 重複排除した配列を取得する
 *
 * @function
 * @param {string[]} arr 元となる配列
 * @returns {string[]} 重複排除した配列
 */
const getUniqueArray = (arr) => {
  return Array.from(new Set(arr));

  // よくない書き方だけど参考に覚えておく
  // return arr.filter((item, index) => arr.indexOf(item) === index);
};

console.log(getUniqueArray(["a", "b", "d", "e", "a", "d"]));
