(() => {
  const columnImgEls = document.querySelectorAll('.column.img');

  [...columnImgEls].forEach((el) => {
    const imgItemEl = el.querySelector('img');
    gsap.set(imgItemEl, {
      opacity: 0,
      y: 100,
      x: -100,
    });
    gsap.to(imgItemEl, {
      scrollTrigger: {
        trigger: el,
        start: 'top 50%',
        // markers: true,
      },
      duration: 1,
      opacity: 1,
      y: 0,
      x: 0,
    });
  });

  const thumbnailsContainerEl = document.querySelector('.thumbnails__container:not(.other)');
  const thumbnailsEl = document.querySelector('.thumbnails__container:not(.other) .thumbnails');

  gsap.to(thumbnailsEl, {
    scrollTrigger: {
      trigger: thumbnailsContainerEl,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      // markers: true,
    },
    // xPercent: -20,
    x: -500,
  });

  const thumbnailsOtherContainerEl = document.querySelector('.thumbnails__container.other');
  const thumbnailsOtherEl = document.querySelector('.thumbnails__container.other .thumbnails');

  gsap.to(thumbnailsOtherEl, {
    scrollTrigger: {
      trigger: thumbnailsOtherContainerEl,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      // markers: true,
    },
    // xPercent: -20,
    x: 500,
  });
})();