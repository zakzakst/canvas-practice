// 【参考】
// https://qiita.com/mizno/items/b837278c66139c50f174
// https://mebee.info/2020/08/27/post-16942/
// https://zenn.dev/rabee/articles/image-load-event

// 【内容：】
document.addEventListener("DOMContentLoaded", () => {
  const imgEls = document.querySelectorAll<HTMLImageElement>(
    'img:not([loading="lazy"])'
  );

  let loadedImagesCount = 0;

  const onImageLoaded = () => {
    loadedImagesCount++;
    if (loadedImagesCount === imgEls.length) {
      // 全ての画像の読み込み完了時の処理
    }
  };

  Array.from(imgEls).forEach((el) => {
    if (el.complete) {
      onImageLoaded();
    } else {
      el.addEventListener("load", onImageLoaded);
    }
  });
});
