// 【参考】
// https://kinocolog.com/javascript_sort/

// 【内容：数値の配列をソート】
// 数値のみで構成された配列でも、ソートでは文字列として比較を行い並び替えされてしまいます。
// そのため、数値型をしっかり順番通りに行いたい場合は、sort()関数の引数に比較の式を入れる必要があります。

const arr1 = [1, 10, 5, 200, 7];
// arr1.sort();
// ※元の配列を変更したくない場合は配列を複製する（別のスニペットで記述）
arr1.sort((a, b) => a - b);
console.log(arr1);

// 【内容：降順に並び替える】
// 文字列の場合は演算子による比較の概念がなく、b-aでソートは出来ない

const arr2 = ["あ", "い", "う", "え", "お"];
arr2.sort();
arr2.reverse();
console.log(arr2);

// 【内容：オブジェクト入り配列で複数のソートを行う】

const arr3 = [
  { no: 1, name: "Apple", price: 50 },
  { no: 2, name: "Banana", price: 80 },
  { no: 3, name: "Cherry", price: 50 },
  { no: 4, name: "Orange", price: 60 },
  { no: 5, name: "Melon", price: 100 },
];
arr3.sort((a, b) => {
  // priceの昇順
  if (a.price > b.price) return 1;
  if (a.price < b.price) return -1;
  // noの降順
  if (a.no > b.no) return -1;
  if (a.no < b.no) return 1;
  return 0;
});
console.log(arr3);
