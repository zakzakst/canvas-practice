import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const FFT_SIZE = 256;
const GRID_SIZE = 6000;
const canvasEl = document.getElementById("js-canvas");
const audioEl = document.getElementById("js-audio") as HTMLAudioElement;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  innerWidth / innerHeight,
  1,
  200000
);
camera.position.set(3000, 5000, 5000);

const controls = new OrbitControls(camera, canvasEl);
controls.target.set(-1000, 1500, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.02;
controls.minDistance = 3000;
controls.maxDistance = 10000;
controls.minPolarAngle = Math.PI / 4;
controls.maxPolarAngle = Math.PI / 2.5;
controls.autoRotate = true;

const renderer = new THREE.WebGLRenderer({
  antialias: devicePixelRatio === 1,
  canvas: canvasEl,
});
renderer.setClearColor(0x000000);
renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);

const gridColor = new THREE.Color(0x112233);

{
  const grid = new THREE.GridHelper(GRID_SIZE, 40, gridColor, gridColor);
  scene.add(grid);
}

{
  const grid = new THREE.GridHelper(GRID_SIZE, 40, gridColor, gridColor);
  grid.position.z = -GRID_SIZE / 2;
  grid.position.y = GRID_SIZE / 2;
  grid.rotation.x = Math.PI / 2;
  scene.add(grid);
}

{
  const grid = new THREE.GridHelper(GRID_SIZE, 40, gridColor, gridColor);
  grid.position.x = -GRID_SIZE / 2;
  grid.position.y = GRID_SIZE / 2;
  grid.rotation.z = Math.PI / 2;
  scene.add(grid);
}

const geometry = new THREE.BoxGeometry(8, GRID_SIZE, 8);
const material = new THREE.MeshBasicMaterial({
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});
const mesh = new THREE.InstancedMesh(geometry, material, (FFT_SIZE / 2) ** 2);
scene.add(mesh);

const createMatrix4 = (i: number, j: number, value: number) => {
  const matrix = new THREE.Matrix4();
  const boxInterval = (GRID_SIZE / FFT_SIZE) * 2;
  const center = (boxInterval * FFT_SIZE) / 4;
  matrix.setPosition(boxInterval * j - center, 0, boxInterval * i - center);
  const yScale = Math.max(value, 0.002);
  matrix.multiply(new THREE.Matrix4().makeScale(1, yScale, 1));
  matrix.multiply(new THREE.Matrix4().makeTranslation(0, GRID_SIZE / 2, 0));
  return matrix;
};

const MAX = FFT_SIZE / 2;
for (let i = 0; i < MAX; i++) {
  for (let j = 0; j < MAX; j++) {
    const hue = (j / MAX) * 0.5 + 0.5;
    const saturation = 0.2 + Math.random() * 0.5;
    const lightness = i === MAX - 1 ? 1 : (0.1 * i) / MAX;

    const color = new THREE.Color();
    color.setHSL(hue, saturation, lightness);

    const matrix = createMatrix4(i, j, 0);
    const id = i * MAX + j;
    mesh.setMatrixAt(id, matrix);
    mesh.setColorAt(id, color);
    mesh.instanceColor.needsUpdate = true;
  }
}

const onResize = () => {
  console.log("onResize");
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
};
addEventListener("resize", onResize);
onResize();

let nodeAnalyser: any = null;

const freqByteDataArray: any[] = [];
for (let i = 0; i < FFT_SIZE / 2; i++) {
  const array = new Uint8Array(FFT_SIZE / 2);
  for (let j = 0; j < FFT_SIZE / 2; j++) {
    array[j] = 0;
  }
  freqByteDataArray.push(array);
}

const analyseSound = (el: HTMLAudioElement) => {
  const context = new AudioContext();
  const nodeAnalyser = context.createAnalyser();
  nodeAnalyser.fftSize = FFT_SIZE;
  nodeAnalyser.smoothingTimeConstant = 0.6;
  nodeAnalyser.connect(context.destination);
  const nodeSource = context.createMediaElementSource(el);
  nodeSource.connect(nodeAnalyser);
  return { nodeAnalyser };
};

const initSound = () => {
  console.log("initSound");
  const obj = analyseSound(audioEl);
  nodeAnalyser = obj.nodeAnalyser;
};

audioEl.addEventListener("play", initSound);

const draw = () => {
  if (nodeAnalyser === null) return;

  const freqByteData = new Uint8Array(FFT_SIZE / 2);
  nodeAnalyser.getByteFrequencyData(freqByteData);
  freqByteDataArray.push(freqByteData);

  if (freqByteDataArray.length > FFT_SIZE / 2) {
    freqByteDataArray.shift();
  }

  for (let i = 0; i < freqByteDataArray.length; i++) {
    for (let j = 0; j < freqByteDataArray[i].length; j++) {
      const freqSum = freqByteDataArray[i][j] / 256;
      const id = (i * FFT_SIZE) / 2 + j;
      const matrix = createMatrix4(i, j, freqSum);
      mesh.setMatrixAt(id, matrix);
      mesh.instanceMatrix.needsUpdate = true;
    }
  }
};

const loop = () => {
  requestAnimationFrame(loop);
  draw();
  controls.update();
  renderer.render(scene, camera);
};

loop();
