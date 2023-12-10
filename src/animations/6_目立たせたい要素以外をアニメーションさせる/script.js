(() => {
  const sectionEl = document.querySelector('#section');
  const decorationBlackEl = document.querySelectorAll('.decoration-black');
  const decorationLightEl = document.querySelectorAll('.decoration-light');
  const decorationLineEl = document.querySelectorAll('.decoration-line');

  gsap.to(decorationBlackEl, {
    scrollTrigger: {
      trigger: sectionEl,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      // markers: true,
    },
    y: -150,
    rotation: 180,
  });

  gsap.to(decorationLightEl, {
    scrollTrigger: {
      trigger: sectionEl,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      // markers: true,
    },
    y: -250,
    rotation: -90,
  });

  gsap.to(decorationLineEl, {
    scrollTrigger: {
      trigger: sectionEl,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      // markers: true,
    },
    y: -200,
    rotation: -180,
  });
})();