import * as THREE from "three";

const stageEl = document.getElementById("stage");
const stageWidth = 800;
const stageHeight = 450;

/**
 * レンダラー初期化
 */
const threeRenderer = new THREE.WebGLRenderer();
threeRenderer.setSize(stageWidth, stageHeight);
threeRenderer.setPixelRatio(window.devicePixelRatio);
threeRenderer.setClearColor({
  color: 0x000000,
});
stageEl.appendChild(threeRenderer.domElement);

/**
 * シーン初期化
 */
const threeScene = new THREE.Scene();

/**
 * カメラ初期化
 */
const threeCamera = new THREE.PerspectiveCamera(
  45,
  stageWidth / stageHeight,
  1,
  10000
);

/**
 * 光源初期化
 */
const threeLight = new THREE.DirectionalLight(0xffffff, 1);
threeLight.position.set(1000, 1000, 1000);
threeScene.add(threeLight);
threeScene.add(new THREE.DirectionalLightHelper(threeLight));

/**
 * ヘルパー初期化
 */
threeScene.add(new THREE.GridHelper(2000));
threeScene.add(new THREE.AxesHelper(1000));

/**
 * 島を作成
 */
const makeIsland = () => {
  const geometry = new THREE.CylinderGeometry(1000, 1000, 100, 32, 8, false);
  const material = new THREE.MeshStandardMaterial({
    color: 0x888888,
    side: THREE.DoubleSide,
  });
  const island = new THREE.Mesh(geometry, material);
  island.position.set(0, 50, 0);
  threeScene.add(island);
};

/**
 * 描画
 */
function renderScene() {
  threeRenderer.render(threeScene, threeCamera);
}

/**
 * カメラの位置・向き設定
 */
function setCameraPos() {
  threeCamera.position.set(0, 1000, 2000);
  threeCamera.lookAt(new THREE.Vector3(0, 0, 0));
}

makeIsland();
setCameraPos();
renderScene();
console.log("test");
