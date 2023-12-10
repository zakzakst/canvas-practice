(() => {
  const columnsEls = document.querySelectorAll('.columns');

  [...columnsEls].forEach((columnsEl) => {
    const numberImgEl = columnsEl.querySelector('.number-img');
    const mainImgEl = columnsEl.querySelector('.main-img');
    const contentEl = columnsEl.querySelector('.column-content');

    gsap.set(mainImgEl, {
      opacity: 0,
      x: -50,
    });

    const anim = () => {
      const tl = gsap.timeline({
        onStart: () => {
          numberImgEl.classList.add('--animated');
        },
      });

      tl
        .to(mainImgEl, {
          duration: 0.5,
          opacity: 1,
          x: 0,
        }, '+=0.6')
        .to(contentEl, {
          onStart: () => {
            contentEl.classList.add('--animated');
          },
        }, '-=0.2');
    };

    ScrollTrigger.create({
      trigger: columnsEl,
      start: 'top 50%',
      onEnter: (self) => {
        self.kill();
        anim();
      },
      // markers: true,
    });
  })
})();