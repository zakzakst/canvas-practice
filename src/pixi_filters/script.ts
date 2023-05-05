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
  DropShadowFilter, // 使い方難しいので一旦スルー
  EmbossFilter, // 使い方難しいので一旦スルー
  GlitchFilter,
  GlowFilter, // 使い方難しいので一旦スルー
  GodrayFilter,
  GrayscaleFilter, // グレースケールなので、CSSでいいかと思う
  HslAdjustmentFilter, // 使い方難しいので一旦スルー
  KawaseBlurFilter,
  MotionBlurFilter,
  MultiColorReplaceFilter, // 使い方難しいので一旦スルー
  OldFilmFilter,
  OutlineFilter, // 使い方難しいので一旦スルー
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

// ブラウン管的な表現？
const crtFilter = new CRTFilter({
  curvature: 10, // 線の歪み
  lineWidth: 5,
  lineContrast: 1,
  // verticalLine: true,
  noise: 0.2,
  noiseSize: 2,
  vignetting: 0.3, // 淵の影の範囲
  vignettingAlpha: 0.7,
  vignettingBlur: 0.2,
  seed: 0, // よく分からない
  time: 0.5, // よく分からない
});

// ドット
const dotFilter = new DotFilter(1, 5, false);

// グリッチ
const glitchFilter = new GlitchFilter({
  seed: 0.5, // よく分からない
  slices: 10,
  offset: 100,
  direction: 0, // 角度
  fillMode: 2, // 下記参照
  // https://github.com/pixijs/filters/blob/main/filters/glitch/src/GlitchFilter.ts#L116-L121
  red: [10, 10],
  blue: [-10, -10],
  green: [-5, 5],
});

// 神の光？
const godrayFilter = new GodrayFilter({
  time: 0, // よく分からない
  gain: 0.75, // 強さ？
  lacunarity: 4, // 細かさ？
  alpha: 1,
  // parallel: false,
  angle: 45,
  center: [0, 0], // よく分からない
});

// const kawaseBlurFilter = new KawaseBlurFilter({})
// const motionBlurFilter = new MotionBlurFilter({})
// const oldFilmFilter = new OldFilmFilter({})
// const pixelateFilter = new PixelateFilter({})
// const radialBlurFilter = new RadialBlurFilter({})
// const reflectionFilter = new ReflectionFilter({})
// const rGBSplitFilter = new RGBSplitFilter({})
// const shockwaveFilter = new ShockwaveFilter({})
// const simpleLightmapFilter = new SimpleLightmapFilter({})
// const tiltShiftFilter = new TiltShiftFilter({})
// const twistFilter = new TwistFilter({})
// const zoomBlurFilter = new ZoomBlurFilter({})

img.filters = [godrayFilter];
