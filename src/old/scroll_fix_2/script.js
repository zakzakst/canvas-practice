import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const dressingUpItem2El = document.getElementById("js-dressing-up-item-2");
const dressingUpBgItem2El = document.getElementById("js-dressing-up-bg-item-2");

gsap.to(dressingUpBgItem2El, {
  scale: 1,
  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  scrollTrigger: {
    trigger: dressingUpItem2El,
    start: "top bottom",
    end: "bottom bottom",
    scrub: 1,
    // markers: true,
    // onUpdate: (self) => {
    //   console.log(self.progress);
    // },
  },
});

const dressingUpItem3El = document.getElementById("js-dressing-up-item-3");
const dressingUpBgItem3El = document.getElementById("js-dressing-up-bg-item-3");

gsap.to(dressingUpBgItem3El, {
  scale: 1,
  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  scrollTrigger: {
    trigger: dressingUpItem3El,
    start: "top bottom",
    end: "bottom bottom",
    scrub: 1,
  },
});
