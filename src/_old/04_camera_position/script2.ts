import * as THREE from "three";

const canvasEl = document.getElementById("canvas");
const width = 1600;
const height = 900;
let rot = 0;
let mouseX = 0;

const renderer = new THREE.WebGLRenderer({
  canvas: canvasEl,
});
renderer.setSize(width, height);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, width / height);

const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const material = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load(
    "https://ics-creative.github.io/tutorial-three/samples/imgs/earthmap1k.jpg"
  ),
  side: THREE.DoubleSide,
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

document.addEventListener("mousemove", (e) => {
  mouseX = e.pageX;
});

const tick = () => {
  const targetRot = (mouseX / window.innerWidth) * 360;
  rot += (targetRot - rot) * 0.02;

  const radian = (rot * Math.PI) / 180;
  camera.position.x = 1000 * Math.sin(radian);
  camera.position.z = 1000 * Math.cos(radian);

  camera.lookAt(new THREE.Vector3(0, 0, 0));
  earthMesh.rotation.y += 0.01;

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
