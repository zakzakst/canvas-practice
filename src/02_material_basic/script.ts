import * as THREE from "three";
// import earthmap from "./earthmap1k.jpg";

const canvasEl = document.getElementById("canvas");
const width = 1600;
const height = 900;

// レンダラーを作成
const renderer = new THREE.WebGLRenderer({
  canvas: canvasEl,
});
renderer.setSize(width, height);

// シーンを作成
const scene = new THREE.Scene();

// カメラを作成
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
camera.position.set(0, 0, +1000);

// 球体を作成
const geometry = new THREE.SphereGeometry(300, 30, 30);

// 画像を読み込む
const loader = new THREE.TextureLoader();
const texture = loader.load("imgs/earthmap1k.jpg");
const material = new THREE.MeshStandardMaterial({
  map: texture,
});

// メッシュを作成
const mesh = new THREE.Mesh(geometry, material);

// シーンに追加
scene.add(mesh);

// 平行光源
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 1, 1);

// シーンに追加
scene.add(directionalLight);

// ループイベント
const tick = () => {
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};
tick();
