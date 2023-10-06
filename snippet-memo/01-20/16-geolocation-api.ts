// 【参考】
// https://b1san-blog.com/post/js/js-location/
// https://syncer.jp/how-to-use-geolocation-api

// 【内容：現在位置の取得】

// ChatGPTのコード
if (navigator.geolocation) {
  const option = {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 5000,
  };
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      console.log(`緯度: ${latitude}, 経度: ${longitude}`);
    },
    (e) => {
      console.error("位置情報の取得に失敗しました", e);
    },
    option
  );
} else {
  console.log("このブラウザは位置情報をサポートしていません");
}
