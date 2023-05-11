import Lenis from "@studio-freight/lenis";

// const lenis = new Lenis({
//   lerp: 0.1,
//   duration: 1.0,
//   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//   orientation: "vertical",
//   gestureOrientation: "vertical",
//   smoothWheel: true,
//   smoothTouch: false,
//   touchMultiplier: 2,
// });
const lenis = new Lenis();

// lenis.on("scroll", ({ scroll, limit, velocity, direction, progress }) => {
//   // console.log({ scroll, limit, velocity, direction, progress });
//   window.scrollTo(0, scroll);
// });

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// setTimeout(() => {
//   lenis.scrollTo("#anchor");
// }, 2000);
