// 【参考】
// https://kinocolog.com/javascript_baisu_check/
// https://magazine.techacademy.jp/magazine/28270
// https://kinocolog.com/javascript_zeropadding/
// https://rfs.jp/sb/javascript/js-lab/zeropadding.html
// https://qiita.com/sho-17/items/4a89f13e13fa9dcc250a

// 【内容：奇数・偶数の判定】

/**
 * 奇数・偶数の判定
 *
 * @function
 * @param {number} targetNum チェックする数
 * @returns {string} 判定結果を返します
 */
const checkOddEven = (targetNum) => {
  // 返すメッセージを設定
  const MESSAGE = {
    NOT_INTEGER: "整数ではありません",
    ODD: "奇数です",
    EVEN: "偶数です",
  };

  // 整数かどうかを判定
  const isInteger = Number.isInteger(targetNum);
  if (!isInteger) return MESSAGE.NOT_INTEGER;

  // 奇数・偶数を判定
  if (targetNum % 2 === 0) {
    return MESSAGE.EVEN;
  } else {
    return MESSAGE.ODD;
  }
};

console.log(checkOddEven(2));
console.log(checkOddEven(3));
console.log(checkOddEven(3.5));

/**
 * 倍数の判定
 *
 * @function
 * @param {number} targetNum チェックする数
 * @param {number} targetBaisu チェックする倍数
 * @returns {string} 判定結果を返します
 */
const checkBaisu = (targetNum, targetBaisu) => {
  // 返すメッセージを設定
  const MESSAGE = {
    NOT_INTEGER: "チェックする数が整数ではありません",
    NOT_INTEGER_BAISU: "チェックする倍数が整数ではありません",
    IS_BAISU: `${targetBaisu}の倍数です`,
    IS_NOT_BAISU: `${targetBaisu}の倍数ではありません`,
  };

  // チェックする数が整数かどうかを判定
  const isInteger = Number.isInteger(targetNum);
  if (!isInteger) return MESSAGE.NOT_INTEGER;

  // チェックする倍数が整数かどうかを判定
  const isIntegerBaisu = Number.isInteger(targetBaisu);
  if (!isIntegerBaisu) return MESSAGE.NOT_INTEGER_BAISU;

  // 倍数か判定
  if (targetNum % targetBaisu === 0) {
    return MESSAGE.IS_BAISU;
  } else {
    return MESSAGE.IS_NOT_BAISU;
  }
};

console.log(checkBaisu(15, 3));
console.log(checkBaisu(15, 4));
console.log(checkBaisu(15.5, 4));
console.log(checkBaisu(15, 4.2));

/**
 * 桁数指定した数値の取得
 *
 * @function
 * @param {number} targetNum 元の数値
 * @param {number} digits 桁数
 * @returns {string} 桁数指定した数値
 */
const zeroPadding = (targetNum, digits) => {
  // 返すメッセージを設定
  const MESSAGE = {
    NOT_INTEGER: "整数ではありません",
    NOT_INTEGER_DIGITS: "桁数が整数ではありません",
  };

  // 元の数値が整数かどうかを判定
  const isInteger = Number.isInteger(targetNum);
  if (!isInteger) return MESSAGE.NOT_INTEGER;

  // 桁数が整数かどうかを判定
  const isIntegerDigits = Number.isInteger(digits);
  if (!isIntegerDigits) return MESSAGE.NOT_INTEGER_DIGITS;

  // 桁数指定した数値を返す
  return (Array(digits).join("0") + targetNum).slice(-digits);
};

console.log(zeroPadding(12.3, 5));
console.log(zeroPadding(12, 5.5));
console.log(zeroPadding(12, 5));
