const sectionEls = document.querySelectorAll(".section");

sectionEls.forEach((el) => {
  const threshold = window.innerHeight / el.clientHeight;
  const options = {
    root: null,
    rootMargin: "0px",
    threshold,
  };
  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-show-bg");
      } else {
        // 戻り方向に出た場合のみクラス削除
        if (
          entry.boundingClientRect.top >
          window.innerHeight - el.clientHeight
        ) {
          entry.target.classList.remove("is-show-bg");
        }
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  observer.observe(el);
});

// is-show-bg is-end-section
