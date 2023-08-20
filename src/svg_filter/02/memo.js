const $helper = document.body.querySelector(".helper.decoration");
const $container = document.body.querySelector(".content");

window.addEventListener(
  "mousemove",
  (e) => {
    const x = e.clientX;
    const y = e.clientY;
    $helper.style.left = `${x}px`;
    $helper.style.top = `${y}px`;
  },
  false
);
