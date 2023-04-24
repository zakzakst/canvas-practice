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
camera.position.set(0, 0, 500);

class MyGroup extends THREE.Object3D {
  constructor() {
    super();
    this.sphere = new THREE.Mesh(
      new THREE.SphereGeometry(40, 20, 40),
      new THREE.MeshNormalMaterial()
    );
    this.donuts = new THREE.Mesh(
      new THREE.TorusGeometry(120, 40, 60, 60),
      new THREE.MeshNormalMaterial()
    );
    this.add(this.sphere);
    this.add(this.donuts);
  }

  update() {
    this.sphere.position.x = 200 * Math.sin(Date.now() / 500);
    this.donuts.rotation.y += 0.01;
  }
}

const myGroup = new MyGroup();
scene.add(myGroup);

const tick = () => {
  myGroup.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
