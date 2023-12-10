(() => {
  const sectionEls = document.querySelectorAll('.section');

  gsap.set(sectionEls, {
    opacity: 0,
    y: 50,
  });

  [...sectionEls].forEach((sectionEl) => {
    gsap.to(sectionEl, {
      scrollTrigger: {
        trigger: sectionEl,
        start: 'top center',
      },
      opacity: 1,
      y: 0,
    });
  });

  const buttonsEls = document.querySelectorAll('.buttons');

  [...buttonsEls].forEach((buttonsEl) => {
    gsap.set(buttonsEl.children, {
      opacity: 0,
      scale: 0.5,
      y: 50,
    });

    gsap.to(buttonsEl.children, {
      scrollTrigger: {
        trigger: buttonsEl,
        start: 'top center',
      },
      opacity: 1,
      scale: 1,
      y: 0,
      stagger: 0.1,
      ease: 'back.out',
    })
  });
})();