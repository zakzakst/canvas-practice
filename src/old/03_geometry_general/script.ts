import * as THREE from "three";

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
camera.position.set(0, 500, +1000);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// コンテナを作成
const container = new THREE.Object3D();
scene.add(container);

// マテリアルを作成
const material = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide,
});

// 平行光源を作成
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// 環境光を作成
const ambientLight = new THREE.AmbientLight(0x999999);
scene.add(ambientLight);

// ジオメトリを作成
const geometryList = [
  new THREE.SphereGeometry(50),
  new THREE.BoxGeometry(100, 100, 100),
  new THREE.PlaneGeometry(100, 100),
  new THREE.TetrahedronGeometry(100, 0),
  new THREE.ConeGeometry(100, 100, 32),
  new THREE.CylinderGeometry(50, 50, 100, 32),
  new THREE.TorusGeometry(50, 30, 16, 100),
];

geometryList.map((geometry, index) => {
  const mesh = new THREE.Mesh(geometry, material);
  container.add(mesh);
  mesh.position.x = 400 * Math.sin((index / geometryList.length) * Math.PI * 2);
  mesh.position.y = 400 * Math.cos((index / geometryList.length) * Math.PI * 2);
});

const tick = () => {
  container.rotation.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
