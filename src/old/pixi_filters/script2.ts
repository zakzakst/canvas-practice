import * as PIXI from "pixi.js";
import { ShockwaveFilter } from "pixi-filters";
/* @ts-ignore */
import anime from "../../node_modules/animejs/lib/anime.es.js";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const app = new PIXI.Application({
  view: canvas,
  width: window.innerWidth,
  height: window.innerHeight,
  background: 0x000000,
});

const img = PIXI.Sprite.from("https://picsum.photos/id/237/600/600");
img.x = app.screen.width / 2;
img.y = app.screen.height / 2;

img.anchor.x = 0.5;
img.anchor.y = 0.5;

img.scale.x = 1;
img.scale.y = 1;

app.stage.addChild(img);

const shockwaveFilter = new ShockwaveFilter(
  [300, 300],
  {
    amplitude: 10,
    wavelength: 10,
    brightness: 5,
    radius: 0,
  },
  0
);

canvas.addEventListener("click", () => {
  anime({
    targets: shockwaveFilter,
    time: 1,
    duration: 1000,
    easing: "easeInCubic",
    complete: () => {
      shockwaveFilter.time = 0;
    },
  });
});

img.filters = [shockwaveFilter];
