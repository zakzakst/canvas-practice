(() => {
  const mainEl = document.querySelector('.main');
  const sectionTargetEl = document.querySelector('.section.--target');

  const bgChangeBlack = () => {
    gsap.to(mainEl, {
      backgroundColor: '#4a4a4a',
    });
    gsap.to(sectionTargetEl, {
      color: '#fff',
    });
  };

  const bgChangeWhite = () => {
    gsap.to(mainEl, {
      backgroundColor: '#fff',
    });
    gsap.to(sectionTargetEl, {
      color: '#4a4a4a',
    });
  };

  ScrollTrigger.create({
    trigger: sectionTargetEl,
    start: 'top 50%',
    end: 'bottom 50%',
    onEnter: () => {
      bgChangeBlack();
    },
    onEnterBack: () => {
      bgChangeBlack();
    },
    onLeave: () => {
      bgChangeWhite();
    },
    onLeaveBack: () => {
      bgChangeWhite();
    },
    // markers: true,
  });

  const bgAnimEl = document.querySelector('.bg-anim');

  ScrollTrigger.create({
    trigger: bgAnimEl,
    start: 'top 50%',
    onEnter: (self) => {
      self.kill();
      bgAnimEl.classList.add('--animated');
    },
    // markers: true,
  });
})();