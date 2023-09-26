// 【参考】
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

// 【内容：数値配列の合計を取得する】

const getSum = (arr: number[]): number => {
  return arr.reduce((sum, currentVal) => sum + currentVal);
};

console.log(getSum([1, 2, 3, 4]));
