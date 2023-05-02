import * as PIXI from "pixi.js";
import {
  AdjustmentFilter,
  AdvancedBloomFilter,
  AsciiFilter,
  BevelFilter, // 使い方難しいので一旦スルー
  BloomFilter,
  BulgePinchFilter,
  ColorGradientFilter, // 使い方難しいので一旦スルー
  ColorMapFilter, // 使い方難しいので一旦スルー
  ColorOverlayFilter, // 使い方難しいので一旦スルー（他のフィルターと組み合わせるといい感じになる？
  ColorReplaceFilter, // 使い方難しいので一旦スルー
  ConvolutionFilter,
  CrossHatchFilter,
  CRTFilter,
  DotFilter,
  DropShadowFilter,
  EmbossFilter,
  GlitchFilter,
  GlowFilter,
  GodrayFilter,
  GrayscaleFilter,
  HslAdjustmentFilter,
  KawaseBlurFilter,
  MotionBlurFilter,
  MultiColorReplaceFilter,
  OldFilmFilter,
  OutlineFilter,
  PixelateFilter,
  RadialBlurFilter,
  ReflectionFilter,
  RGBSplitFilter,
  ShockwaveFilter,
  SimpleLightmapFilter,
  TiltShiftFilter,
  TwistFilter,
  ZoomBlurFilter,
} from "pixi-filters";

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

// フォトショの色調補正みたいな感じ
const adjustmentFilter = new AdjustmentFilter({
  gamma: 5,
  saturation: 5,
  contrast: 5,
  brightness: 5,
  red: 5,
  green: 5,
  blue: 5,
  alpha: 1,
});

// 発光するような感じ
const advancedBloomFilter = new AdvancedBloomFilter({
  threshold: 0.5,
  bloomScale: 1.5,
  brightness: 1.5,
  blur: 20,
  quality: 20,
});

// アスキーアートっぽくする
const asciiFilter = new AsciiFilter(10);

// ぼかし（引数は配列で[x, y]）
const bloomFilter = new BloomFilter([50, 0]);

// 魚眼
const bulgePinchFilter = new BulgePinchFilter({
  radius: 300,
  strength: 1,
  center: [0.1, 0.6],
});

// 畳み込み
// ※引数は下記参照
// https://github.com/pixijs/filters/blob/main/filters/convolution/src/ConvolutionFilter.ts#L21-L24
const convolutionFilter = new ConvolutionFilter(
  [0, 0, 0.5, 0, 0.5, 1, 0, 0, 0.5],
  100,
  100
);

// 交差線
const crossHatchFilter = new CrossHatchFilter();

img.filters = [crossHatchFilter];
