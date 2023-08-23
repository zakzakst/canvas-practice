const noiseEl = document.querySelector(".noise");
const textNoiseEl = document.querySelector("#textNoise");
const turbEl = textNoiseEl.querySelector("feTurbulence");
const disMEl = textNoiseEl.querySelector("feDisplacementMap");
const frequencyVal = { value: null };
const scaleVal = { value: null };

const animNoise = () => {
  gsap.fromTo(
    noiseEl,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 0.3,
    }
  );

  gsap.fromTo(
    frequencyVal,
    {
      value: 1.5,
    },
    {
      value: 0,
      duration: 0.9,
      ease: "Expo.easeIn",
      onUpdate: () => {
        turbEl.setAttribute("baseFrequency", frequencyVal.value);
      },
    }
  );

  gsap.fromTo(
    scaleVal,
    {
      value: 50,
    },
    {
      value: 1,
      duration: 0.45,
      delay: 0.55,
      ease: "Expo.easeOut",
      onUpdate: () => {
        disMEl.setAttribute("scale", scaleVal.value);
      },
    }
  );
};

setTimeout(() => {
  animNoise();
}, 1000);
