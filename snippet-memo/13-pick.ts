// 【参考】
// https://marsquai.com/745ca65e-e38b-4a8e-8d59-55421be50f7e/1f67fdab-8e00-4ae1-a1b9-077d5a30a5d6/aa0b7f56-5a8f-46e7-bf5b-c962b91c5b2c/
// https://typescriptbook.jp/reference/generics/type-parameter-constraint#型引数に制約をつける

// 【内容：オブジェクトのプロパティを絞り込む】

const pick = <T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> => {
  return keys.reduce((acc, key) => {
    if (obj.hasOwnProperty(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as Pick<T, K>);
};

console.log(
  pick(
    {
      name: "John",
      age: 30,
      city: "New York",
    },
    "name",
    "age"
  )
);
