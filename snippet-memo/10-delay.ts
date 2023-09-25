// 【参考】
//

// 【内容：指定時間待機する】

const delay = (ms: number) => {
  return new Promise((resolve) => {
    return setTimeout(resolve, ms);
  });
};

const test = async () => {
  console.log("before");
  await delay(2000);
  console.log("after");
};

test();
