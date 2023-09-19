// 【内容】
// 指定の数の配列データを作成する
type ItemData = {
  id: number;
  name: string;
};

const total = 20;

const items: ItemData[] = [...new Array(total)].map((_, index) => ({
  id: index,
  name: `name-${index}`,
}));

// 【応用】
// アルファベットの配列を作成する

// 「a」のUTF-16コードを取得
const start = "a".charCodeAt(0);

const alphabets = Array.apply(null, new Array(26)).map((_, index) => {
  // UTF-16コードから文字列を取得
  return String.fromCharCode(start + index);
});
