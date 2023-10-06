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
camera.position.set(-100, 150, 500);
camera.lookAt(new THREE.Vector3(0, 0, 0));

scene.add(new THREE.GridHelper(600));
scene.add(new THREE.GridHelper(300));

class MyGroup extends THREE.Group {
  constructor() {
    super();
    const length = 10;
    for (let i = 0; i < length; i++) {
      const material = new THREE.MeshNormalMaterial();
      const geometry = new THREE.SphereGeometry(30, 30, 30);
      const mesh = new THREE.Mesh(geometry, material);

      const radian = (i / length) * Math.PI * 2;
      mesh.position.set(200 * Math.cos(radian), 30, 200 * Math.sin(radian));
      this.add(mesh);
    }
  }
}

const group = new MyGroup();
scene.add(group);

const tick = () => {
  group.rotation.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
