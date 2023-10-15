// 【参考】

// 【内容：】
const swapTupleElements = <T, U>(tuple: [T, U]): [U, T] => {
  return [tuple[1], tuple[0]];
};

// 使用例
const originalTuple: [number, string] = [42, "hello"];
const swappedTuple = swapTupleElements(originalTuple);
console.log(swappedTuple);
