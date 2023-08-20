const decorationEl = document.querySelector(".decoration") as HTMLElement;
const containerEl = document.querySelector(".content");

window.addEventListener(
  "mousemove",
  (e) => {
    const x = e.clientX;
    const y = e.clientY;
    decorationEl.style.left = `${x}px`;
    decorationEl.style.top = `${y}px`;
  },
  false
);
