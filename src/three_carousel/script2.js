import * as THREE from "three";
import { getDeviceType, DEVICE_TYPES } from "./util";

/** ====================
変数
==================== **/

// 描画要素関連
const stageEl = document.getElementById("canvas");
let stageWidth = 0;
let stageHeight = 0;

// three.js関連
const threeScene = new THREE.Scene();
let threeCamera = null;
let threeCameraRad = 0;
let threeRenderer = null;
const THREE_SPHERE_COUNT = 12;
const threeSphereList = [];

/** ====================
設定関連
==================== **/

/**
 * ステージのサイズを設定
 */
const setStageSize = () => {
  stageWidth = document.body.clientWidth;
  stageHeight = 600;

  // console.log("setStageSize");
};

/**
 * レンダラーのサイズを設定
 */
const setRendererSize = () => {
  threeRenderer.setSize(stageWidth, stageHeight);

  // console.log("setRendererSize", stageWidth, stageHeight);
};

/**
 * グリッドを設定
 */
const setGrid = () => {
  threeScene.add(new THREE.GridHelper(600));
  threeScene.add(new THREE.AxesHelper(600));

  // console.log("setGrid");
};

/**
 * 光源を設定
 */
const setLight = () => {
  const ambientLight = new THREE.AmbientLight(0xffffff);
  threeScene.add(ambientLight);

  // console.log("setLight", ambientLight);
};

/**
 * カメラの向きを設定
 * radian number カメラの向きの角度
 */
const setCameraRad = (radian) => {
  threeCameraRad = radian;
  threeCamera.lookAt(0, 0, 100);
};

/** ====================
初期化関連
==================== **/

/**
 * カメラを初期化
 */
const initThreeCamera = () => {
  const fov = getDeviceType() === DEVICE_TYPES[0] ? 45 : 60;
  threeCamera = new THREE.PerspectiveCamera(fov, stageWidth / stageHeight);
  threeCamera.position.set(0, 0, 0);
  // threeCamera.position.set(0, 100, +1000);
  threeScene.add(threeCamera);

  // console.log("initThreeCamera", fov);
};

/**
 * レンダラーを初期化
 */
const initThreeRenderer = () => {
  threeRenderer = new THREE.WebGL1Renderer({
    canvas: stageEl,
  });
  threeRenderer.setPixelRatio(window.devicePixelRatio);
  setRendererSize();
  threeRenderer.render(threeScene, threeCamera);

  // console.log("initThreeRenderer", stageEl, threeRenderer);
};

/**
 * 球体を初期化
 */
const initSphere = () => {
  for (let i = 0; i < THREE_SPHERE_COUNT; i++) {
    const geometry = new THREE.SphereGeometry(30, 30, 30);
    // const loader = new THREE.TextureLoader();
    // const texture = loader.load(
    //   "https://ics-creative.github.io/161208_panorama/common/images/image.jpg"
    //   // "earthmap.jpg"
    // );
    // const material = new THREE.MeshStandardMaterial({
    //   map: texture,
    // });
    const material = new THREE.MeshNormalMaterial();
    const sphere = new THREE.Mesh(geometry, material);
    const radian = (i / THREE_SPHERE_COUNT) * Math.PI * 2;
    const radius = 120;
    sphere.position.set(
      radius * Math.cos(radian),
      0,
      radius * Math.sin(radian)
    );
    threeSphereList.push(sphere);
    threeScene.add(sphere);
  }

  console.log("initSphere", threeSphereList);
};

/** ====================
 * 更新関連
==================== **/

const updateRenderer = () => {
  // カメラの向きを変更
  const updateRad = threeCameraRad + 0.1;
  setCameraRad(updateRad);
  threeRenderer.render(threeScene, threeCamera);
};

/**
 * 初期化
 */
const init = () => {
  setStageSize();
  setGrid();
  setLight();
  initThreeCamera();
  initSphere();
  initThreeRenderer();
  requestAnimationFrame(updateRenderer);
};

init();
