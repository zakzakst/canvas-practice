import * as THREE from "three";

const canvasEl = document.getElementById("canvas");
const width = 1600;
const height = 900;

const renderer = new THREE.WebGLRenderer({
  canvas: canvasEl,
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, width / height);
camera.position.set(0, 0, +1000);

const geometry = new THREE.TorusGeometry(300, 100, 64, 100);
// const material = new THREE.MeshBasicMaterial({ color: 0x6699ff });
// const material = new THREE.MeshNormalMaterial();
// const material = new THREE.MeshLambertMaterial({ color: 0x6699ff });
// const material = new THREE.MeshPhongMaterial({ color: 0x6699ff });
// const material = new THREE.MeshToonMaterial({ color: 0x6699ff });
const material = new THREE.MeshStandardMaterial({
  color: 0x6699ff,
  roughness: 0.5,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 2, 1000);
scene.add(pointLight);
const pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
scene.add(pointLightHelper);

const tick = () => {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  pointLight.position.set(
    500 * Math.sin(Date.now() / 500),
    500 * Math.sin(Date.now() / 1000),
    500 * Math.cos(Date.now() / 500)
  );

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
