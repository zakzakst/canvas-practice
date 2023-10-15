// 【参考】

// 【内容：】
const asyncCallback = (
  callback: () => void,
  delay: number = 1000
): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      callback();
      resolve();
    }, delay);
  });
};

// 使用例
const asyncCallbackTest = async () => {
  console.log("start");
  await asyncCallback(() => {
    console.log("Callback executed after 3 second");
  }, 3000);
};

asyncCallbackTest();
