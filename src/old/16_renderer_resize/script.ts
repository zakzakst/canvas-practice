import * as THREE from "three";

const canvasEl = document.getElementById("canvas");

const renderer = new THREE.WebGLRenderer({
  canvas: canvasEl,
  antialias: true,
});

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, 1.0);
camera.position.set(0, 0, +1000);

const geometry = new THREE.SphereGeometry(300, 30, 30);
const material = new THREE.MeshBasicMaterial({ wireframe: true });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const tick = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();

const onResize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};

window.addEventListener("resize", onResize);

onResize();
