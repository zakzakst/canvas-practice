// 【参考】
//

// 【内容：デバッグ用のコンソールヘルパー】
const debugLog = (message: string) => {
  // デバッグモードの切替
  const debugMode = true;
  if (debugMode) {
    console.log(`[DEBUG] ${message}`);
  }
};

debugLog("これはデバッグメッセージです");
