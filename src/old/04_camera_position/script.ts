import * as THREE from "three";

const canvasEl = document.getElementById("canvas");
const width = 1600;
const height = 900;

let rot = 0;

// レンダラーを作成
const renderer = new THREE.WebGLRenderer({
  canvas: canvasEl,
});
renderer.setSize(width, height);

// シーンを作成
const scene = new THREE.Scene();

// カメラを作成
const camera = new THREE.PerspectiveCamera(45, width / height);

// 平行光源を作成
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// マテリアルを作成
const material = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load(
    "https://ics-creative.github.io/tutorial-three/samples/imgs/earthmap1k.jpg"
  ),
  side: THREE.DoubleSide,
});

// 球体を作成
const geometry = new THREE.SphereGeometry(300, 30, 30);

// メッシュを作成
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 星屑作成関数
const createStarField = () => {
  const vertices: any[] = [];

  for (let i = 0; i < 1000; i++) {
    const x = 3000 * (Math.random() - 0.5);
    const y = 3000 * (Math.random() - 0.5);
    const z = 3000 * (Math.random() - 0.5);
    vertices.push(x, y, z);
  }
  // TODO: ここ分からない後で調べる
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  // マテリアルを作成
  const material = new THREE.PointsMaterial({
    size: 10,
    color: 0xffffff,
  });

  // 物体を作成
  const mesh = new THREE.Points(geometry, material);
  scene.add(mesh);
};

createStarField();

const tick = () => {
  rot += 0.5;
  const radian = (rot * Math.PI) / 180;
  camera.position.x = 1000 * Math.sin(radian);
  camera.position.z = 1000 * Math.cos(radian);

  // 原点方向を見つめる
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
