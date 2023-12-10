import '@lottiefiles/lottie-player'
import { create } from '@lottiefiles/lottie-interactivity'

const initLottie = () => {
  // スクロール連動のアニメーション
  const player = document.querySelector('#lottie');
  player.addEventListener('rendered', () => {
    // lottie-playerが描画されてからinteractivityの設定を実行
    create({
      player,
      mode: 'scroll',
      container: '.section',
      actions: [
        {
          visibility: [0, 0.5],
          type: 'seek',
          frames: [0, 300],
        },
        {
          visibility: [0.5, 1.0],
          type: 'loop',
          frames: [0, 300],
        },
      ]
    });
  });

  // ホバーアニメーション（ループ）
  const player2 = document.querySelector('#lottie-2');
  player2.addEventListener('rendered', () => {
    // lottie-playerが描画されてからinteractivityの設定を実行
    create({
      player: player2,
      mode: 'cursor',
      actions: [
        {
          position: { x: [0, 1], y: [0, 1] },
          type: 'loop',
          frames: [0, 300]
        },
        {
          position: { x: -1, y: -1 },
          type: 'stop',
          frames: [0],
        },
      ]
    });
  });

  // ホバーアニメーション（一度）
  const player3 = document.querySelector('#lottie-3');
  player3.addEventListener('rendered', () => {
    // lottie-playerが描画されてからinteractivityの設定を実行
    create({
      player: player3,
      mode: 'cursor',
      actions: [
        {
          type: 'hover',
          forceFlag: false,
        }
      ]
    });
  });
}

initLottie()
