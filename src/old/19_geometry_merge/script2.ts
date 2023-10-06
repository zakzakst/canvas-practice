import * as THREE from "three";
// import * as Stats from "stats-js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";

const canvasEl = document.getElementById("canvas");
// const infoEl = document.getElementById("info") as HTMLPreElement;
const width = 1600;
const height = 900;

const renderer = new THREE.WebGLRenderer({
  canvas: canvasEl,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, width / height);
camera.position.set(0, 0, 400);

const CELL_NUM = 25;
const boxes: any[] = [];

for (let i = 0; i < CELL_NUM; i++) {
  for (let j = 0; j < CELL_NUM; j++) {
    for (let k = 0; k < CELL_NUM; k++) {
      const geometryBox = new THREE.BoxGeometry(5, 5, 5);
      const geometryTranslated = geometryBox.translate(
        10 * (i - CELL_NUM / 2),
        10 * (j - CELL_NUM / 2),
        10 * (k - CELL_NUM / 2)
      );
      boxes.push(geometryTranslated);
    }
  }
}

const geometry = mergeGeometries(boxes);
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// const stats = new Stats();
// stats.domElement.style.position = "absolute";
// stats.domElement.style.top = "0px";
// document.body.appendChild(stats.domElement);

const tick = () => {
  mesh.rotation.x += Math.PI / 180;
  mesh.rotation.y += Math.PI / 180;

  renderer.render(scene, camera);
  // infoEl.innerHTML = JSON.stringify(renderer.info.render, "", "    ");
  // stats.update();
  requestAnimationFrame(tick);
};

tick();
