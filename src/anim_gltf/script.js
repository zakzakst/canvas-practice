import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("white");

// camera
const camera = new THREE.PerspectiveCamera(90, 1000 / 1000, 1, 2000);
camera.position.set(0, 0, 25);

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#canvas"),
});

// lightとcolorEncodingの調整
const light = new THREE.AmbientLight(0xffffff, 2);
scene.add(light);
renderer.outputEncoding = THREE.sRGBEncoding;

// mouseでカメラの操作ができるようにする
new OrbitControls(camera, renderer.domElement);

// modelを表示
const loader = new GLTFLoader();
loader.load("/assets/gltf/cat/scene.gltf", function (cat) {
  const clock = new THREE.Clock();
  // AnimationMixerを作成
  const mixer = new THREE.AnimationMixer(cat.scene);

  // 全てのアニメーションを再生する
  cat.animations.forEach((clip) => {
    mixer.clipAction(clip).play();
  });

  scene.add(cat.scene);

  function animate() {
    // 次に実行されるときの時間差を保存
    const delta = clock.getDelta();
    // アニメーションを更新させる
    if (mixer) mixer.update(delta);
    // 毎回レンダリングをすることでアニメーション効果
    renderer.render(scene, camera);
    // 1秒に60回(60fps)
    requestAnimationFrame(animate);
  }
  animate();
});
