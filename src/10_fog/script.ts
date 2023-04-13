import * as THREE from "three";

const canvasEl = document.getElementById("canvas");
const width = 1600;
const height = 900;

const renderer = new THREE.WebGLRenderer({
  canvas: canvasEl,
  antialias: true,
  devicePixelRatio: window.devicePixelRatio,
});
renderer.setSize(width, height);

const scene = new THREE.Scene();

scene.fog = new THREE.Fog(0x000000, 50, 2000);

const camera = new THREE.PerspectiveCamera(45, width / height);
camera.position.set(0, 0, +1000);

const group = new THREE.Group();
scene.add(group);
const geometry = new THREE.BoxBufferGeometry(50, 50, 50);
const material = new THREE.MeshStandardMaterial();

for (let i = 0; i < 1000; i++) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = (Math.random() - 0.5) * 2000;
  mesh.position.y = (Math.random() - 0.5) * 2000;
  mesh.position.z = (Math.random() - 0.5) * 2000;
  mesh.rotation.x = Math.random() * 2 * Math.PI;
  mesh.rotation.y = Math.random() * 2 * Math.PI;
  mesh.rotation.z = Math.random() * 2 * Math.PI;
  group.add(mesh);
}

scene.add(new THREE.DirectionalLight(0xff0000, 2));
scene.add(new THREE.AmbientLight(0x00ffff));

const tick = () => {
  group.rotateY(0.01);
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
