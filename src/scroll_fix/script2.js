class TextItem {
  constructor() {
    // 要素
    this.containerScrollEl = document.querySelector(
      "#scale-anim #container-scroll2"
    );
    this.containerYEl = document.querySelector("#scale-anim #container-y2");
    this.textEl = document.querySelector("#scale-anim #scale-text");
    // スクロール関数（removeEventListenerする目的）
    // https://log.tkyisgk.com/addeventlistener-this
    this.onScrollCallback = this.onScroll.bind(this);
    this.maxScale = 80;
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
    const scale = this.getTargetScale(scrollProgress);
    this.textEl.style.transform = `scale(${scale})`;
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
   * 目標拡大値の取得
   * @param progress 進行割合
   * @returns 目標拡大値
   */
  getTargetScale(progress) {
    const arrangedProgress = progress > 1 ? 1 : progress < 0 ? 0 : progress;
    const scale = 1 + (this.maxScale - 1) * arrangedProgress;
    return scale;
  }
}

const textItem = new TextItem();
textItem.init();
