import * as THREE from "three";

const canvasEl = document.getElementById("canvas");
const width = 1600;
const height = 900;

const mouse = new THREE.Vector2();

const renderer = new THREE.WebGLRenderer({
  canvas: canvasEl,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, width / height);
camera.position.set(0, 0, +1000);

const geometry = new THREE.BoxBufferGeometry(50, 50, 50);

const meshList: any[] = [];
for (let i = 0; i < 200; i++) {
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = (Math.random() - 0.5) * 800;
  mesh.position.y = (Math.random() - 0.5) * 800;
  mesh.position.z = (Math.random() - 0.5) * 800;
  mesh.rotation.x = Math.random() * 2 * Math.PI;
  mesh.rotation.y = Math.random() * 2 * Math.PI;
  mesh.rotation.z = Math.random() * 2 * Math.PI;
  scene.add(mesh);
  meshList.push(mesh);
}

const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const raycaster = new THREE.Raycaster();

const handleMouseMove = (event) => {
  const element = event.currentTarget;
  const x = event.clientX - element.offsetLeft;
  const y = event.clientY - element.offsetTop;
  const w = element.offsetWidth;
  const h = element.offsetHeight;
  mouse.x = (x / w) * 2 - 1;
  mouse.y = -(y / h) * 2 + 1;
};

const tick = () => {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(meshList);
  meshList.map((mesh) => {
    if (intersects.length > 0 && mesh === intersects[0].object) {
      mesh.material.color.setHex(0xff0000);
    } else {
      mesh.material.color.setHex(0xffffff);
    }
  });
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

canvasEl?.addEventListener("mousemove", handleMouseMove);

tick();
