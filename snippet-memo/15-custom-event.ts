// 【参考】
// https://developer.mozilla.org/ja/docs/Web/API/CustomEvent/CustomEvent
// https://qiita.com/tronicboy/items/a1805fa97c51b803c192
// https://www.web-dev-qa-db-ja.com/ja/typescript/グローバルスコープの拡張は、外部モジュールまたはアンビエントモジュール宣言でのみ直接ネストできます（2669）/810779808/
// アプリケーション内でコンポーネント間のコミュニケーションを可能にします。これにより、コンポーネント間でデータや状態を共有し、アプリケーションの機能を拡張できます。

// NOTE: 「declare.d.ts」も必要

// 【内容：カスタムイベント】
const customEvent = new CustomEvent("custom-event-name", {
  detail: { key: "value" },
  bubbles: true,
  cancelable: true,
});

const element = document.getElementById("id");

element.addEventListener("custom-event-name", (e) => {
  console.log("カスタムイベントが発生しました", e.detail);
});

element.dispatchEvent(customEvent);
