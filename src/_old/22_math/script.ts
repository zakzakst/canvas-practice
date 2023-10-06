import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  innerWidth / innerHeight,
  1,
  2000
);
camera.position.set(0, 0, 1000);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

let degree = 0;
const radius = 300;

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(10),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(sphere);

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(250),
  new THREE.MeshBasicMaterial({ wireframe: true })
);
scene.add(earth);

const tick = () => {
  requestAnimationFrame(tick);
  degree += 5;
  const rad = (degree * Math.PI) / 180;
  const x = radius * Math.cos(rad);
  const y = radius * Math.sin(rad);
  sphere.position.set(x, y, 0);
  renderer.render(scene, camera);
};

tick();
