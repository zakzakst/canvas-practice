const containerEls = document.querySelectorAll(".container");
const titleTextEls = document.querySelectorAll(".title__text");
const contentEls = document.querySelectorAll(".content");

// タイトルテキストアニメーション
titleTextEls.forEach((el) => {
  const options = {
    root: null,
    rootMargin: "-30% 0px",
    threshold: 0,
  };
  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("--animated");
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  observer.observe(el);
});

// セクション背景アニメーション
containerEls.forEach((el) => {
  let observer;

  const initObserver = () => {
    const threshold = window.innerHeight / el.clientHeight;
    const options = {
      root: null,
      rootMargin: "0px",
      threshold,
    };
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("--animated");
          if (entry.boundingClientRect.top < window.innerHeight) {
            // 戻り方向に入った場合、endedクラス削除
            entry.target.classList.remove("--ended");
          }
        } else {
          if (
            entry.boundingClientRect.top <
            window.innerHeight - el.clientHeight
          ) {
            // 進み方向に出た場合、endedクラス付与
            entry.target.classList.add("--ended");
          } else {
            // 戻り方向に出た場合、animatedクラス削除
            entry.target.classList.remove("--animated");
          }
        }
      });
    };
    observer = new IntersectionObserver(callback, options);
    observer.observe(el);
  };

  initObserver();

  window.addEventListener("resize", () => {
    observer.disconnect();
    initObserver();
  });
});

// コンテンツ背景アニメーション
contentEls.forEach((el) => {
  const options = {
    root: null,
    rootMargin: "-50% 0px",
    threshold: 0,
  };
  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("--animated");
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  observer.observe(el);
});
