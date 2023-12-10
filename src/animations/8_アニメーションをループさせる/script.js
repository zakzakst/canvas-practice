(() => {
  const sectionEls = document.querySelectorAll('.section');
  const buttonContainerEls = document.querySelectorAll('.button__container');

  gsap.set([sectionEls, buttonContainerEls], {
    opacity: 0,
    y: 50,
  });

  [...sectionEls, ...buttonContainerEls].forEach((el) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top center',
      },
      opacity: 1,
      y: 0,
    });
  });
})();