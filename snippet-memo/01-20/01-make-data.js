// 【参考】
// https://qiita.com/reika_engineer/items/b8b6ca343cf33157a666

// 【内容：指定の数の配列データを作成する】

const total = 20;

const items = [...new Array(total)].map((_, index) => ({
  id: index,
  name: `name-${index}`,
}));

console.log(items);

// 【内容：アルファベットの配列を作成する】

// 「a」のUTF-16コードを取得
const start = "a".charCodeAt(0);

// Array.applyを利用した書き方もある（ちょっと理解しきれてないが。。）
const alphabets = Array.apply(null, new Array(26)).map((_, index) => {
  // UTF-16コードから文字列を取得
  return String.fromCharCode(start + index);
});

console.log(alphabets);
