// 【参考】
// https://typescriptbook.jp/reference/functions/type-guard-functions

// 【内容：】
const filterNumbers = (values: (string | number)[]): number[] => {
  return values.filter((value): value is number => typeof value === "number");
};

// 使用例
const mixedValues = ["apple", 42, "banana", 7, "cherry"];
const numbers = filterNumbers(mixedValues);
console.log(numbers);
