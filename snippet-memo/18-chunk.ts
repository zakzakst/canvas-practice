// 【参考】

// 【内容：配列をチャンクに分割する】
const chunkArray = <T>(arr: T[], size: number): T[][] => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

console.log(chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 3));
