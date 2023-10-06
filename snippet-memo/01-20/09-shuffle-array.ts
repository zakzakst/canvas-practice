// 【参考】
// https://zenn.dev/k_kazukiiiiii/articles/cf3256ef6cbd84
// https://yumegori.com/typescript-generics （引数が配列の関数にジェネリクスを使う）

// 【内容：配列の要素をランダムにシャッフル】

const getShuffleArray = <T>(arr: T[]): T[] => {
  const arrClone = [...arr];
  for (let i = arrClone.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrClone[i], arrClone[j]] = [arrClone[j], arrClone[i]];
  }
  return arrClone;
};

console.log(getShuffleArray([1, { test: 2 }, 3]));
