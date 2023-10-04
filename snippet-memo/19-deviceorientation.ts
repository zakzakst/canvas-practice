// 【参考】
// https://developer.mozilla.org/ja/docs/Web/API/Window/deviceorientation_event

// 【内容：モバイルデバイスの傾きを検出】
if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", (e) => {
    const rotateDegrees = e.alpha;
    const leftToRight = e.gamma;
    const frontToBack = e.beta;

    console.log(
      `方位角: ${rotateDegrees}, 左右の傾き: ${leftToRight}, 前後の傾き: ${frontToBack}`
    );
  });
}
