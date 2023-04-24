import * as THREE from "three";

const canvasEl = document.getElementById("canvas");
const width = 1600;
const height = 900;

const renderer = new THREE.WebGLRenderer({
  canvas: canvasEl,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, width / height);
camera.position.set(-100, 150, 500);
camera.lookAt(new THREE.Vector3(0, 0, 0));
class Donuts extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.TorusGeometry(120, 40, 60, 50);
    const material = new THREE.MeshNormalMaterial();
    super(geometry, material);
  }
}

const mesh = new Donuts();
scene.add(mesh);

const tick = () => {
  mesh.rotation.x += 0.02;
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
