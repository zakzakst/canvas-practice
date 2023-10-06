import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const walkThroughItem1El = document.getElementById("js-walk-through-item-1");
const walkThroughItem2El = document.getElementById("js-walk-through-item-2");
const walkThroughBgImgsEl = document.querySelector(".walk-through__bg-imgs");
const walkThroughBgImgEls = document.querySelectorAll(".walk-through__bg-img");
const walkThroughBgMovieEl = document.querySelector(
  ".walk-through__bg-movie video"
);
// TODO: メタデータ読み込み完了タイミングでdurationで取得できないか試す
// https://shanabrian.com/web/javascript/video-duration.php
const frameRate = 1 / 30;
// const videoTime = 15;
const videoTime = 9;
let targetTime = 0;
let isMove = false;
let isScrollForward = false;
walkThroughBgMovieEl.playbackRate = 5;

gsap.to(walkThroughBgImgEls, {
  clipPath: (index) => {
    // TODO: 画面の縦横比取得してvwかvhを出し分ける（初期に取得して、リサイズで変更）
    const minRad = 70;
    const rad = minRad + 10 * index;
    return `circle(${rad}vw)`;
  },
  scrollTrigger: {
    trigger: walkThroughItem1El,
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
    // markers: true,
  },
});

gsap.to(walkThroughBgImgsEl, {
  opacity: 0,
  scrollTrigger: {
    trigger: walkThroughItem1El,
    start: "bottom bottom",
    end: "bottom top",
    scrub: 1,
    // markers: true,
  },
});

ScrollTrigger.create({
  trigger: walkThroughItem2El,
  start: "top top",
  end: "bottom bottom",
  // scrub: 1,
  // markers: true,
  onUpdate: (self) => {
    // スクロール進捗から目標時間を更新（秒単位）
    targetTime = Math.floor(videoTime * self.progress);
    console.log(targetTime, walkThroughBgMovieEl.currentTime);
    isScrollForward = self.getVelocity() > 0;
    if (targetTime !== walkThroughBgMovieEl.currentTime && !isMove) {
      // もし現在の動画時間が目標時間と違う場合、移動アニメーションを発火
      // isMove = true;
      tick();
    }
    // const second = Math.floor(videoTime * self.progress);
    // const remain = videoTime * self.progress - second;
    // const frameNum = Math.floor(remain / frameRate);
    // walkThroughBgMovieEl.currentTime = second + frameNum * frameRate;
    // console.log(second, remain, frameNum);
    // walkThroughBgMovieEl.currentTime += frameRate;
    // const dir = self.getVelocity() < 0 ? -1 : 1;
    // walkThroughBgMovieEl.currentTime =
    //   walkThroughBgMovieEl.currentTime + dir * frameRate;
    // walkThroughBgMovieEl.playbackRate = -0.5;
    // walkThroughBgMovieEl.play();
    // console.log("test");
    // const targetTime = videoTime * self.progress;
    // walkThroughBgMovieEl.currentTime = targetTime;
    // // 動画再生
    // console.log(targetTime);
    // const dir = self.getVelocity() < 0 ? -1.1 : 1.1;
    // console.log(walkThroughBgMovieEl.playbackRate);
    // walkThroughBgMovieEl.playbackRate = dir;
    // if (dir < 0) {
    //   walkThroughBgMovieEl.currentTime = 3;
    //   walkThroughBgMovieEl.play();
    // }
    // walkThroughBgMovieEl.paused = false;
  },
});

function tick() {
  if (isScrollForward) {
    // スクロール方向が進む場合
    if (targetTime > walkThroughBgMovieEl.currentTime) {
      if (targetTime - walkThroughBgMovieEl.currentTime > 6) {
        // 6秒以上の差がある場合、2秒差のところまで動画を飛ばす
        walkThroughBgMovieEl.currentTime = targetTime - 2;
      }
      console.log("再生");
      // 動画再生フラグがfalseの場合、再生してフラグをtrueにする
      if (!isMove) {
        walkThroughBgMovieEl.play();
        isMove = true;
      }
      requestAnimationFrame(tick);
    } else {
      console.log("停止");
      walkThroughBgMovieEl.pause();
      isMove = false;
      // if (isMove) {
      // }
    }
  } else {
    walkThroughBgMovieEl.pause();
    isMove = false;
    // スクロール方向が戻る場合
    if (targetTime < walkThroughBgMovieEl.currentTime) {
      console.log("戻る");
      walkThroughBgMovieEl.currentTime -= frameRate;
      requestAnimationFrame(tick);
    } else {
      // 再読み込みなどでページ途中から開始した場合の処理
      walkThroughBgMovieEl.currentTime = targetTime;
    }
  }
  // console.log(targetTime, walkThroughBgMovieEl.currentTime);
  // if (targetTime > walkThroughBgMovieEl.currentTime) {
  //   console.log("再生");
  //   if (!isMove && isScrollForward) {
  //     walkThroughBgMovieEl.play();
  //     isMove = true;
  //   }
  //   requestAnimationFrame(tick);
  // } else {
  //   console.log("停止");
  //   if (!isScrollForward) {
  //     // walkThroughBgMovieEl.currentTime = targetTime;
  //     walkThroughBgMovieEl.currentTime -= frameRate;
  //     requestAnimationFrame(tick);
  //   }
  //   // 現在の動画時間が目標時間より大きければ、1フレーム戻る
  //   // walkThroughBgMovieEl.currentTime -= frameRate;
  //   // if (targetTime < walkThroughBgMovieEl.currentTime) {
  //   //   // 1フレーム進めた後、目標時間より大きければ、再度tick
  //   //   requestAnimationFrame(tick);
  //   // } else {
  //   //   isMove = false;
  //   // }
  // }
  // requestAnimationFrame(tick);
  // isMove = false;
  // if (targetTime > walkThroughBgMovieEl.currentTime) {
  //   // 現在の動画時間が目標時間より小さければ、1フレーム進める
  //   // walkThroughBgMovieEl.currentTime += frameRate;
  //   walkThroughBgMovieEl.play();
  //   if (targetTime > walkThroughBgMovieEl.currentTime) {
  //     // 1フレーム進めた後、目標時間より小さければ、再度tick
  //     // requestAnimationFrame(tick);
  //   } else {
  //     walkThroughBgMovieEl.pause();
  //     isMove = false;
  //   }
  // } else if (targetTime < walkThroughBgMovieEl.currentTime) {
  //   // 現在の動画時間が目標時間より大きければ、1フレーム戻る
  //   walkThroughBgMovieEl.currentTime -= frameRate;
  //   if (targetTime < walkThroughBgMovieEl.currentTime) {
  //     // 1フレーム進めた後、目標時間より大きければ、再度tick
  //     requestAnimationFrame(tick);
  //   } else {
  //     isMove = false;
  //   }
  // } else {
  //   isMove = false;
  // }
}
