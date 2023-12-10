(() => {
  const sectionEls = document.querySelectorAll('.section');

  [...sectionEls].forEach((sectionEl) => {
    const buttonEl = sectionEl.querySelector('button');

    gsap.set(buttonEl, {
      opacity: 0,
      scale: 1.2,
    });

    gsap.to(buttonEl, {
      scrollTrigger: {
        trigger: buttonEl,
        start: 'top center',
      },
      scale: 1,
      opacity: 1,
    });
  });
})();