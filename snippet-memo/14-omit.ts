// 【参考】
// https://qiita.com/mangano-ito/items/75e65071c9c482ddc335

// 【内容：Omit利用例】
interface Shape {
  area(): number;
  perimeter(): number;
}

type ShapeWithPerimeter = Omit<Shape, "perimeter">;

const circle: ShapeWithPerimeter = {
  area: () => Math.PI * 5 * 5,
};

console.log(circle.area());
