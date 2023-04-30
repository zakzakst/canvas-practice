import * as PIXI from "pixi.js";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const app = new PIXI.Application({
  view: canvas,
  width: window.innerWidth,
  height: window.innerHeight,
  background: 0x000000,
});

const img = PIXI.Sprite.from("https://picsum.photos/id/237/1200/1200");
img.x = app.screen.width / 2;
img.y = app.screen.height / 2;

img.anchor.x = 0.5;
img.anchor.y = 0.5;

img.scale.x = 0.2;
img.scale.y = 0.2;

app.stage.addChild(img);

const noiseFilter = new PIXI.filters.NoiseFilter();
noiseFilter.noise = 0.75;
noiseFilter.seed = 0.75;

img.filters = [noiseFilter];

img.interactive = true;

const animate = () => {
  noiseFilter.seed += 0.002;
};
app.ticker.add(animate);
