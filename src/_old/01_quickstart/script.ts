import * as THREE from "three";

const canvasEl = document.getElementById("canvas");
const width = 1600;
const height = 900;

// レンダラーを作成
const renderer = new THREE.WebGLRenderer({
  canvas: canvasEl,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);

// シーンを作成
const scene = new THREE.Scene();

// カメラを作成
const camera = new THREE.PerspectiveCamera(45, width / height);
camera.position.set(0, 0, +1000);

// 箱を作成
const geometry = new THREE.BoxGeometry(400, 400, 400);
const material = new THREE.MeshNormalMaterial();
const box = new THREE.Mesh(geometry, material);
scene.add(box);

const tick = () => {
  box.rotation.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};
tick();
