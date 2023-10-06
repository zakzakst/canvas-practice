// 【参考】

// 【内容：オブジェクトのキーを取得する】
const getObjectKeys = <T>(obj: T): (keyof T)[] => {
  return Object.keys(obj) as (keyof T)[];
};

console.log(
  getObjectKeys({
    name: "name",
    age: 10,
    city: "Tokyo",
  })
);
