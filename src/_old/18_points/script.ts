import * as THREE from "three";

const canvasEl = document.getElementById("canvas");
const width = 1600;
const height = 900;
let rot = 0;

const renderer = new THREE.WebGLRenderer({
  canvas: canvasEl,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, width / height);

const createStarField = () => {
  const vertices: number[] = [];
  const SIZE = 3000;
  const LENGTH = 1000;
  for (let i = 0; i < LENGTH; i++) {
    const x = SIZE * (Math.random() - 0.5);
    const y = SIZE * (Math.random() - 0.5);
    const z = SIZE * (Math.random() - 0.5);
    vertices.push(x, y, z);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  const material = new THREE.PointsMaterial({
    size: 10,
    color: 0xffffff,
  });
  const mesh = new THREE.Points(geometry, material);
  scene.add(mesh);
};

createStarField();

const tick = () => {
  rot += 1;
  const radian = (rot * Math.PI) / 180;
  camera.position.x = 1000 * Math.sin(radian);
  camera.position.z = 1000 * Math.cos(radian);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
