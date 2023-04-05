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
controls.enableDamping = true;
controls.dampingFactor = 0.2;

const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const material = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load(
    "https://ics-creative.github.io/tutorial-three/samples/imgs/earthmap1k.jpg"
  ),
});

const geometry = new THREE.SphereGeometry(300, 30, 30);
const earthMesh = new THREE.Mesh(geometry, material);
scene.add(earthMesh);

const createStarField = () => {
  const vertices: any[] = [];
  for (let i = 0; i < 1000; i++) {
    const x = 3000 * (Math.random() - 0.5);
    const y = 3000 * (Math.random() - 0.5);
    const z = 3000 * (Math.random() - 0.5);
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
  earthMesh.rotation.y += 0.001;
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
