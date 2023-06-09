class CardItems {
  constructor() {
    // 要素
    this.containerScrollEl = document.querySelector(
      "#card-anim #container-scroll"
    );
    this.containerYEl = document.querySelector("#card-anim #container-y");
    this.containerXEl = document.querySelector("#card-anim #container-x");
    this.itemsEl = document.querySelector("#card-anim #items");
    // スクロール関数（removeEventListenerする目的）
    // https://log.tkyisgk.com/addeventlistener-this
    this.onScrollCallback = this.onScroll.bind(this);
    // 目標位置
    this.targetPosition = 0;
    // 現在の位置
    this.currentPosition = 0;
    // イージング中の位置
    this.easingPosition = 0;
    // 移動中かどうか
    this.isMoving = false;
    // イージングする時間（ms）
    this.easingTime = 200;
    // イージングの開始時間
    this.easingStart = null;
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
    const scrollProgress = this.getScrollProgress();
    // 目標位置とイージング開始時間を更新し、移動中でなければ移動処理を発火
    this.targetPosition = this.getTargetPosition(scrollProgress);
    this.itemsEl.style.transform = `translateX(${this.targetPosition}px)`;
    // TODO: イージング上手くいかない、イージングなしでもいい感じの動きな気がするから一旦これで対応
    // // TODO: requestAnimationFrameの引数でtimestamp渡せるっぽい。こっちでやった方がスマートか？
    // // https://coding-memo.work/javascript/895/
    // this.easingStart = Date.now();
    // if (!this.isMoving) {
    //   this.moveToTargetPosition();
    // }
  }

  /**
   * 目標位置へ移動
   */
  moveToTargetPosition() {
    // 経過時間
    const elapsedTime = Date.now() - this.easingStart;
    if (elapsedTime > this.easingTime) {
      this.currentPosition = this.easingPosition;
      return;
    }
    // イージング量を返す関数（「t：アニメーションの経過時間」「b：始点」「c：変化量」「d：変化にかける時間」）
    // https://noze.space/archives/432
    const easing = (t, b, c, d) => {
      return c * (t /= d) * t + b;
    };
    // 移動位置
    const position = easing(
      elapsedTime,
      this.currentPosition,
      this.targetPosition,
      this.easingTime
    );
    console.log(position);
    this.easingPosition = position;
    this.itemsEl.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(this.moveToTargetPosition.bind(this));
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
   * 目標位置の取得
   * @param progress 進行割合
   * @returns 目標位置
   */
  getTargetPosition(progress) {
    // TODO: arrangedProgressでやっていることはgetScrollProgressに移動したほうがいいか
    const arrangedProgress = progress > 1 ? 1 : progress < 0 ? 0 : progress;
    // NOTE: overflowの関係か幅取得上手くいかない（SP表示の時に）そのための対応
    const containerWidth =
      this.containerXEl.clientWidth >= document.body.clientWidth
        ? document.body.clientWidth
        : this.containerXEl.clientWidth;
    const itemsWidth = this.itemsEl.scrollWidth;
    const position = -(itemsWidth - containerWidth) * arrangedProgress;
    return position;
  }
}

const cardItems = new CardItems();
cardItems.init();
