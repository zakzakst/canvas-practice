const sectionEls = document.querySelectorAll(".js-section");
const SHOW_CLASS = "--show";

// セクション背景アニメーション
sectionEls.forEach((el) => {
  const options = {
    root: null,
    rootMargin: "-50% 0px",
    threshold: 0,
  };
  const callback = (entries) => {
    entries.forEach((entry) => {
      const targetBgSelector = entry.target.dataset.targetBg;
      const targetBg = document.querySelector(targetBgSelector);
      if (entry.isIntersecting) {
        targetBg.classList.add(SHOW_CLASS);
      } else {
        if (entry.boundingClientRect.top >= 0) {
          // 戻り方向に出た場合、表示クラス削除
          targetBg.classList.remove(SHOW_CLASS);
        }
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  observer.observe(el);
});
