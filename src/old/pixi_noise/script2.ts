import * as PIXI from "pixi.js";
/* @ts-ignore */
import anime from "../../node_modules/animejs/lib/anime.es.js";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const app = new PIXI.Application({
  view: canvas,
  width: window.innerWidth,
  height: window.innerHeight,
  background: 0x000000,
});

const img = PIXI.Sprite.from("https://picsum.photos/id/237/1200/1200");
const img2 = PIXI.Sprite.from("https://picsum.photos/id/239/1200/1200");
img.x = app.screen.width / 2;
img.y = app.screen.height / 2;

img.anchor.x = 0.5;
img.anchor.y = 0.5;

img.scale.x = 0.2;
img.scale.y = 0.2;

app.stage.addChild(img);

const displacementFilter = new PIXI.filters.DisplacementFilter(img2);
displacementFilter.scale.x = 0;
displacementFilter.scale.y = 0;

img.filters = [displacementFilter];

img.interactive = true;

img.on("mouseover", () => {
  anime({
    targets: displacementFilter.scale,
    x: 100,
    y: 100,
    duration: 500,
    easing: "easeInCubic",
  });
  // displacementFilter.scale.x = 100;
  // displacementFilter.scale.y = 100;
});

img.on("mouseout", () => {
  anime({
    targets: displacementFilter.scale,
    x: 0,
    y: 0,
    duration: 500,
    easing: "easeInCubic",
  });
  // displacementFilter.scale.x = 0;
  // displacementFilter.scale.y = 0;
});

const animate = () => {};
app.ticker.add(animate);
