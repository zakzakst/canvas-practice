// https://threejs.org/docs/#examples/en/controls/OrbitControls
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const canvasEl = document.getElementById("canvas");
const width = 1600;
const height = 900;

const renderer = new THREE.WebGLRenderer({
  canvas: canvasEl,
});
renderer.setSize(width, height);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, width / height);
camera.position.set(0, 0, 1000);

const controls = new OrbitControls(camera, canvasEl);

const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(300, 300, 300),
  new THREE.MeshNormalMaterial()
);
scene.add(mesh);

const tick = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
