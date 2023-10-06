// 【参考】
// https://zenn.dev/kou_pg_0131/articles/js-clone-array

const baseArr = [1, 2, 3];

// 【内容：配列を複製する1】
// Array.prototype.concat() は 2 つ以上の配列を結合して新しい配列を返す関数です。
// 引数に何も渡さなければ同じ内容の新しい配列を複製できます。

const arr1 = baseArr.concat();
arr1.reverse();
console.log(arr1, baseArr);

// 【内容：配列を複製する2】
// Array.prototype.slice() は配列の特定の範囲を新しい配列として返す関数です。
// 引数に配列の先頭から末尾までを指定すれば同じ内容の新しい配列を複製できます。

const arr2 = baseArr.slice(0, baseArr.length);
arr2.reverse();
console.log(arr2, baseArr);

// 【内容：配列を複製する3】
const arr3 = [...baseArr];
arr3.reverse();
console.log(arr3, baseArr);
