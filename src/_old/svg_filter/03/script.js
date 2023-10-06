const textEl = document.querySelector(".btn-glitch-active");
const filterEl = document.querySelector(".svg-sprite");
const btnGlitchEls = document.querySelectorAll(".btn-glitch");
const turbEl = filterEl.querySelector("#filter feTurbulence");
const turbVal = { val: 0.000001 };
const turbValX = { val: 0.000001 };

const glitchTimeline = () => {
  const timeline = new TimelineMax({
    repeat: -1,
    repeatDelay: 2,
    paused: true,
    onUpdate: () => {
      turbEl.setAttribute("baseFrequency", turbVal.val + " " + turbValX.val);
    },
  });

  timeline.to(turbValX, 0.1, { val: 0.5 }).to(turbVal, 0.1, { val: 0.02 });
  timeline.set(turbValX, { val: 0.000001 }).set(turbVal, { val: 0.000001 });
  timeline
    .to(turbValX, 0.2, { val: 0.4 }, 0.4)
    .to(turbVal, 0.2, { val: 0.002 }, 0.4);
  timeline.set(turbValX, { val: 0.000001 }).set(turbVal, { val: 0.000001 });

  return {
    start: () => {
      timeline.play(0);
    },
    stop: () => {
      timeline.pause();
    },
  };
};

const btnGlitch = new glitchTimeline();

Array.from(btnGlitchEls).forEach((el) => {
  el.addEventListener("mouseenter", (e) => {
    e.target.classList.add("btn-glitch-active");
    btnGlitch.start();
  });
  el.addEventListener("mouseleave", (e) => {
    const targetEl = e.target;
    if (e.target.classList.contains("btn-glitch-active")) {
      targetEl.classList.remove("btn-glitch-active");
      btnGlitch.stop();
    }
  });
});
