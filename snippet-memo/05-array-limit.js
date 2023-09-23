// 【参考】
// https://kinocolog.com/javascript_array_limit/

// 【内容：配列の件数を制限し、追加時に古いものから削除する】

/**
 * 配列の件数を制限し、配列の先頭に追加する
 *
 * @function
 * @param {string[]} items 要素を追加する配列
 * @param {string} text 追加する要素
 * @param {number} [limit=0] 配列の最大件数
 * @returns {string[]} 要素を追加した後の配列
 */
const limitedUnshift = (items, text, limit = 0) => {
  // itemsが配列でない場合、空の配列を返す
  if (!Array.isArray(items)) return [];

  // 要素を先頭に追加
  const itemsClone = [...items];
  itemsClone.unshift(text);

  // limitを超えたら配列の最後の値を削除
  if (itemsClone.length > limit) {
    // NOTE: itemsの数とlimitの数の組み合わせによってはpopだと意図した挙動にならないため修正
    // itemsClone.pop();
    return itemsClone.slice(0, limit);
  }

  return itemsClone;
};

console.log(limitedUnshift(["a", "b", "d", "e"], "c", 4));
console.log(limitedUnshift(["a", "b"], "c", 2));
console.log(limitedUnshift(["a", "b", "d", "e"], "c", 1));

/**
 * 配列の件数を制限し、配列の末尾に追加する
 *
 * @function
 * @param {string[]} items 要素を追加する配列
 * @param {string} text 追加する要素
 * @param {number} [limit=0] 配列の最大件数
 * @returns {string[]} 要素を追加した後の配列
 */
const limitPush = (items, text, limit = 0) => {
  // itemsが配列でない場合、空の配列を返す
  if (!Array.isArray(items)) return [];

  // 要素を先頭に追加
  const itemsClone = [...items];
  itemsClone.push(text);

  // limitを超えたら配列の最後の値を削除
  if (itemsClone.length > limit) {
    // NOTE: itemsの数とlimitの数の組み合わせによってはshiftだと意図した挙動にならないため修正
    // itemsClone.shift();
    return itemsClone.slice(-limit);
  }

  return itemsClone;
};

console.log(limitPush(["a", "b", "d", "e"], "c", 4));
console.log(limitPush(["a", "b"], "c", 2));
console.log(limitPush(["a", "b", "d", "e"], "c", 1));
