// import Lenis from "https://cdn.skypack.dev/@studio-freight/lenis@0.1.12";
// const lenis = new Lenis({
//   lerp: 0.1,
//   smooth: true,
//   direction: "vertical",
// });

// function raf() {
//   lenis.raf();
//   requestAnimationFrame(raf);
// }

// requestAnimationFrame(raf);

const lenis = new Lenis();
const raf = (time) => {
  lenis.raf(time);
  requestAnimationFrame(raf);
};
requestAnimationFrame(raf);
