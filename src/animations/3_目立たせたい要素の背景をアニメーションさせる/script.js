(() => {
  // 背景1
  const img1BgEl = document.querySelector('.img.--1 .img-bg');
  const img1BgItem = document.querySelectorAll('.img.--1 .img-bg span');

  gsap.to(img1BgItem, {
    scrollTrigger: {
      trigger: img1BgEl,
      start: 'top 50%',
      // markers: true,
    },
    stagger: 0.1,
    y: (index) => {
      return index * 25;
    },
  });

  // 背景2
  const img2BgEl = document.querySelector('.img.--2 .img-bg');

  const lottieAnim = lottie.loadAnimation({
    container: img2BgEl,
    renderer: 'svg',
    loop: false,
    // loop: true,
    autoplay: false,
    path: 'https://assets6.lottiefiles.com/packages/lf20_yrelFtPfpX.json'
  });

  ScrollTrigger.create({
    trigger: img2BgEl,
    start: 'top 50%',
    onEnter: (self) => {
      self.kill();
      lottieAnim.play();
    },
    // markers: true,
  });

  // 背景3
  const img3El = document.querySelector('.img.--3');
  const maskPathEl = document.querySelector('#mask-path');
  const maskPathLength = maskPathEl.getTotalLength();
  maskPathEl.style.setProperty('--stroke-length', maskPathLength);

  ScrollTrigger.create({
    trigger: img3El,
    start: 'top 50%',
    onEnter: (self) => {
      self.kill();
      img3El.classList.add('--animated');
    },
    // markers: true,
  });
})();