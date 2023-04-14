import * as THREE from "three";

const canvasEl = document.getElementById("canvas");
const width = 1600;
const height = 900;

const renderer = new THREE.WebGLRenderer({
  canvas: canvasEl,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
renderer.setClearColor(0xf9f9f9, 1.0);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xf9f9f9, 200, 300);

const camera = new THREE.PerspectiveCamera(45, width / height);

const material = new THREE.SpriteMaterial({
  map: new THREE.TextureLoader().load(
    "https://ics-creative.github.io/tutorial-three/samples/imgs/star.png"
  ),
});
material.fog = true;

for (let i = 0; i < 1000; i++) {
  const sprite = new THREE.Sprite(material);
  sprite.position.x = 500 * (Math.random() - 0.5);
  sprite.position.y = 100 * Math.random() - 40;
  sprite.position.z = 500 * (Math.random() - 0.5);
  sprite.scale.set(10, 10, 10);
  scene.add(sprite);
}

const plane = new THREE.GridHelper(300, 10, 0x888888, 0x888888);
plane.position.y = -40;
scene.add(plane);

const tick = () => {
  camera.position.x = 100 * Math.sin(Date.now() / 2000);
  camera.position.z = 100 * Math.cos(Date.now() / 2000);
  camera.position.y = 50 * Math.sin(Date.now() / 1000) + 60;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
