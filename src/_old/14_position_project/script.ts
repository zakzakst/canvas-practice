import * as THREE from "three";

const canvasEl = document.getElementById("canvas");
const svgEl = document.getElementById("svgLine") as HTMLElement;
const tfEl = document.getElementById("hud") as HTMLDivElement;
const width = 1600;
const height = 900;
let rot = 0;

const renderer = new THREE.WebGLRenderer({
  canvas: canvasEl,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, width / height);
camera.position.set(100, 150, 500);
camera.lookAt(new THREE.Vector3(0, 0, 0));

scene.add(new THREE.GridHelper(600));
scene.add(new THREE.AxesHelper(300));

const material = new THREE.MeshNormalMaterial();
const geometry = new THREE.SphereGeometry(30, 30, 30);

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const tick = () => {
  rot += 0.5;
  const radian = (rot * Math.PI) / 180;
  mesh.position.x = 200 * Math.sin(radian);
  mesh.position.y = 50;
  mesh.position.z = 200 * Math.cos(radian);
  renderer.render(scene, camera);

  const worldPosition = mesh.getWorldPosition(new THREE.Vector3());
  const projection = worldPosition.project(camera);
  const sx: number = (width / 2) * (+projection.x + 1.0);
  const sy: number = (height / 2) * (+projection.y + 1.0);

  tfEl.innerHTML = `スクリーン座標（${Math.round(sx)}, ${Math.round(sy)}）`;
  tfEl.style.transform = `translate(${sx}px, ${sy}px)`;

  svgEl.setAttribute("x2", String(sx));
  svgEl.setAttribute("y2", String(sy));

  requestAnimationFrame(tick);
};

tick();
