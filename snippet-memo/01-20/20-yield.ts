// 【参考】
// https://ja.javascript.info/async-iterators-generators
// https://tokitsubaki.com/javascript-yield-statement/676/
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/for-await...of

// NOTE: ちょっと内容掴み切れないので保留

// NOTE: ChatGPTで出力されたコード
// 【内容：非同期ジェネレータを使用した反復処理】
// async function* fetchMultipleData(urls) {
//   for (const url of urls) {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error('データの取得に失敗しました');
//     }
//     yield await response.json();
//   }
// }
// const dataUrls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
// for await (const data of fetchMultipleData(dataUrls)) {
//   console.log(data);
// }
