import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

async function init() {
  const canvasEl = document.getElementById("canvas");
  const width = 1600;
  const height = 900;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvasEl,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
  camera.position.set(1, 1, 1);

  const controls = new OrbitControls(camera, canvasEl);
  controls.target.set(0, 0, 0);
  controls.update();

  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 0, 1);
  scene.add(directionalLight2);

  const loader = new GLTFLoader();
  const gltf = await loader.loadAsync(
    "https://ics-creative.github.io/tutorial-three/samples/models/gltf/gltf/ToyCar.gltf"
  );
  const model = gltf.scene;
  scene.add(model);

  model.scale.set(30, 30, 30);

  const tick = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };

  tick();
}

init();
