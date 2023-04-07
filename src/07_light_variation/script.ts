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
camera.position.set(20, 20, 20);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const meshFloor = new THREE.Mesh(
  new THREE.BoxGeometry(2000, 0.1, 2000),
  new THREE.MeshStandardMaterial({
    color: 0x808080,
    roughness: 0.0,
  })
);
scene.add(meshFloor);

const meshKnot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(3, 1, 100, 16),
  new THREE.MeshStandardMaterial({
    color: 0xaa0000,
    roughness: 0.0,
  })
);
meshKnot.position.set(0, 5, 0);
scene.add(meshKnot);

// const light = new THREE.AmbientLight(0xffffff, 1.0);
// const light = new THREE.DirectionalLight(0xffffff, 1);
// const light = new THREE.HemisphereLight(0x888888, 0x0000ff, 1.0);
// const light = new THREE.PointLight(0xffffff, 2, 50, 1.0);
// const light = new THREE.SpotLight(0xffffff, 4, 30, Math.PI / 4, 10, 0.5);
const light = new THREE.RectAreaLight(0xffffff, 5.0, 10, 10);
scene.add(light);

// const lightHelper = new THREE.DirectionalLightHelper(light);
// const lightHelper = new THREE.HemisphereLightHelper(light);
// const lightHelper = new THREE.PointLightHelper(light);
// const lightHelper = new THREE.SpotLightHelper(light);
// scene.add(lightHelper);

const tick = () => {
  renderer.render(scene, camera);

  const t = Date.now() / 500;
  const r = 20.0;
  const lx = r * Math.cos(t);
  const lz = r * Math.sin(t);
  const ly = 6.0 + 5.0 * Math.sin(t / 3.0);
  light.position.set(lx, ly, lz);
  // lightHelper.update();
  light.lookAt(new THREE.Vector3(0, 0, 0));

  requestAnimationFrame(tick);
};

tick();
