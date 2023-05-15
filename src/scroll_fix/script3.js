class LRItem {
  constructor() {
    // 要素
    this.containerScrollEl = document.querySelector(
      "#lr-anim #container-scroll3"
    );
    this.containerYEl = document.querySelector("#lr-anim #container-y3");
    this.itemEls = document.querySelectorAll("#lr-anim #items3 .item3");
    // スクロール関数（removeEventListenerする目的）
    // https://log.tkyisgk.com/addeventlistener-this
    this.onScrollCallback = this.onScroll.bind(this);
    this.startRotate = 30;
    this.endRotate = 3;
  }

  /**
   * 初期化
   */
  init() {
    this.initObserver();
    // リサイズ処理と再読み込みなどでページ途中で初期表示された場合の考慮
    document.addEventListener("resize", this.onScrollCallback);
    this.onScroll();
  }

  /**
   * インターセクションオブザーバー初期化
   */
  initObserver() {
    // スクロール範囲がwindowを覆ったタイミングでスクロールイベントの出し分けを行う
    // TODO: リサイズのタイミングでこの値も更新しないとNG?
    const threshold = window.innerHeight / this.containerScrollEl.clientHeight;
    const options = {
      root: null,
      rootMargin: "0px",
      threshold,
    };
    const observer = new IntersectionObserver(
      this.scrollEventObserve.bind(this),
      options
    );
    observer.observe(this.containerScrollEl);
  }

  /**
   * スクロールイベント監視
   */
  scrollEventObserve(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.addScrollEvent();
      } else {
        this.removeScrollEvent();
      }
    });
  }

  /**
   * スクロール処理追加
   */
  addScrollEvent() {
    document.addEventListener("scroll", this.onScrollCallback);
  }

  /**
   * スクロール処理削除
   */
  removeScrollEvent() {
    document.removeEventListener("scroll", this.onScrollCallback);
  }

  /**
   * スクロール処理
   */
  onScroll() {
    // TODO: スクロール処理requestAnimationFrameで間引く
    const scrollProgress = this.getScrollProgress();
    [...this.itemEls].forEach((item, index) => {
      const style = this.getTargetStyle(
        scrollProgress,
        this.itemEls.length,
        index
      );
      item.querySelector(".card").style.opacity = style.opacity;
      item.querySelector(
        ".card"
      ).style.transform = `rotate(${style.rotate}deg)`;
    });
  }

  /**
   * スクロール進行の割合の取得
   * @returns スクロール進行の割合
   */
  getScrollProgress() {
    // スクロール範囲の上下
    const containerScrollRect = this.containerScrollEl.getBoundingClientRect();
    const containerScrollTop = window.scrollY + containerScrollRect.top;
    const containerScrollBottom =
      containerScrollTop + this.containerScrollEl.clientHeight;
    // Yコンテナの高さ
    const containerYHeight = this.containerYEl.clientHeight;
    // スクロール範囲
    const scrollRange = {
      start: containerScrollTop,
      end: containerScrollBottom - containerYHeight,
    };
    // 現在のスクロール位置
    const scrollCurrent = window.scrollY;
    // スクロール進行の割合
    const scrollProgress =
      (scrollCurrent - scrollRange.start) /
      (scrollRange.end - scrollRange.start);
    return scrollProgress;
  }

  /**
   * 目標変化量の取得
   * @param progress 進行割合
   * @param itemLength 要素の総数
   * @param index 要素の番号
   * @returns { opacity, rotate } 目標変化量
   */
  getTargetStyle(progress, itemLength, index) {
    const arrangedProgress = progress >= 1 ? 1 : progress <= 0 ? 0 : progress;
    const indexRange = {
      start: index / itemLength,
      end: (index + 1) / itemLength,
    };
    const indexProgress =
      indexRange.start > arrangedProgress
        ? 0
        : indexRange.end < arrangedProgress
        ? 1
        : (arrangedProgress - indexRange.start) /
          (indexRange.end - indexRange.start);
    // 透明度
    const opacity = indexProgress;
    // 角度（奇数と偶数で正負を変更）
    const sign = index % 2 === 0 ? 1 : -1;
    const rotate =
      sign * this.startRotate -
      (sign * this.startRotate - sign * this.endRotate) * indexProgress;
    return {
      opacity,
      rotate,
    };
  }
}

const lRItem = new LRItem();
lRItem.init();
