import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import * as THREE from "three";

const walkThroughItem1El = document.getElementById("js-walk-through-item-1");
const walkThroughItem2El = document.getElementById("js-walk-through-item-2");
const walkThroughBgImgsEl = document.querySelector(".walk-through__bg-imgs");
const walkThroughBgImgEls = document.querySelectorAll(".walk-through__bg-img");

gsap.to(walkThroughBgImgEls, {
  clipPath: (index) => {
    // TODO: 画面の縦横比取得してvwかvhを出し分ける（初期に取得して、リサイズで変更）
    // ⇒というより三角関数できちっとした値だせばいけるか
    const minRad = 70;
    const rad = minRad + 10 * index;
    return `circle(${rad}vw)`;
  },
  scrollTrigger: {
    trigger: walkThroughItem1El,
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
    // markers: true,
  },
});

gsap.to(walkThroughBgImgsEl, {
  opacity: 0,
  scrollTrigger: {
    trigger: walkThroughItem1El,
    start: "bottom bottom",
    end: "bottom top",
    scrub: 1,
    // markers: true,
  },
});

/**
 * canvas描画
 */
const canvasEl = document.querySelector("#js-walk-through-canvas");
const stageWidth = 1600;
const stageHeight = 900;

// レンダラーを作成
const renderer = new THREE.WebGLRenderer({
  canvas: canvasEl,
});
renderer.setSize(stageWidth, stageHeight);

// シーンを作成
const scene = new THREE.Scene();

// カメラを作成
const camera = new THREE.PerspectiveCamera(
  45,
  stageWidth / stageHeight,
  1,
  10000
);
// カメラの初期位置を設定
setCameraPos(0);

// 確認作業用：カメラの位置
// camera.position.set(0, 1000, 2000);
// camera.lookAt(new THREE.Vector3(0, 0, 0));

// 塔を作成
const makeTower = () => {
  const geometry = new THREE.ConeGeometry(100, 1000, 20, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const tower = new THREE.Mesh(geometry, material);
  tower.position.set(0, 500, 0);
  scene.add(tower);
};
makeTower();

// 壁を作成
const makeWall = () => {
  const wallHeight = 200;
  // 壁1
  const wallGeometry1 = new THREE.PlaneGeometry(400, wallHeight);
  const wallMaterial1 = new THREE.MeshBasicMaterial({ color: 0x00dd00 });
  const wall1 = new THREE.Mesh(wallGeometry1, wallMaterial1);
  wall1.rotation.y = -Math.PI / 2;
  wall1.position.set(200, wallHeight / 2, 200);
  scene.add(wall1);
  // 壁2
  const wallGeometry2 = new THREE.PlaneGeometry(800, wallHeight);
  const wallMaterial2 = new THREE.MeshBasicMaterial({ color: 0x00dd00 });
  const wall2 = new THREE.Mesh(wallGeometry2, wallMaterial2);
  wall2.rotation.y = Math.PI / 2;
  wall2.position.set(-200, wallHeight / 2, 400);
  scene.add(wall2);
  // 壁3
  const wallGeometry3 = new THREE.PlaneGeometry(400, wallHeight);
  const wallMaterial3 = new THREE.MeshBasicMaterial({ color: 0x0000dd });
  const wall3 = new THREE.Mesh(wallGeometry3, wallMaterial3);
  wall3.position.set(400, wallHeight / 2, 400);
  scene.add(wall3);
  // 壁4
  const wallGeometry4 = new THREE.PlaneGeometry(400, wallHeight);
  const wallMaterial4 = new THREE.MeshBasicMaterial({ color: 0x0000dd });
  const wall4 = new THREE.Mesh(wallGeometry4, wallMaterial4);
  wall4.rotation.y = Math.PI;
  wall4.position.set(0, wallHeight / 2, 800);
  scene.add(wall4);
  // 壁5
  const wallGeometry5 = new THREE.PlaneGeometry(600, wallHeight);
  const wallMaterial5 = new THREE.MeshBasicMaterial({ color: 0xdd0000 });
  const wall5 = new THREE.Mesh(wallGeometry5, wallMaterial5);
  wall5.rotation.y = -Math.PI / 2;
  wall5.position.set(600, wallHeight / 2, 700);
  scene.add(wall5);
  // 壁6
  const wallGeometry6 = new THREE.PlaneGeometry(200, wallHeight);
  const wallMaterial6 = new THREE.MeshBasicMaterial({ color: 0xdd0000 });
  const wall6 = new THREE.Mesh(wallGeometry6, wallMaterial6);
  wall6.rotation.y = Math.PI / 2;
  wall6.position.set(200, wallHeight / 2, 900);
  scene.add(wall6);
};
makeWall();

// 平行光源
// TODO: 光源設定できるようになる
// const directionalLight = new THREE.DirectionalLight(0xffffff);
// directionalLight.position.set(1, 1, 1);
// scene.add(directionalLight);
// const lightHelper = new THREE.DirectionalLightHelper(directionalLight);
// scene.add(lightHelper);

// ヘルパー
scene.add(new THREE.GridHelper(2000));
scene.add(new THREE.AxesHelper(1000));

renderer.render(scene, camera);

/**
 * canvas回遊
 */
ScrollTrigger.create({
  trigger: walkThroughItem2El,
  start: "top top",
  end: "bottom bottom",
  // scrub: 1,
  // markers: true,
  onUpdate: (self) => {
    walkThroughCanvas(self.progress);
  },
});

function walkThroughCanvas(progress) {
  setCameraPos(progress);
  renderer.render(scene, camera);
}

// カメラの位置設定
function setCameraPos(progress) {
  // 視線の高さ
  const eyeLine = 100;
  if (progress === 0) {
    // 初期位置
    camera.position.set(400, eyeLine, 1000);
    camera.lookAt(new THREE.Vector3(400, eyeLine, 0));
  } else if (progress > 0 && progress <= 0.25) {
    // 回遊1
    const sectionProgress = progress / 0.25;
    const posZ = 1000 - 200 * sectionProgress;
    camera.position.set(400, eyeLine, posZ);
    camera.lookAt(new THREE.Vector3(400, eyeLine, 0));
  } else if (progress > 0.25 && progress <= 0.5) {
    // 回遊2
    const sectionProgress = (progress - 0.25) / 0.25;
    const posY = 400 - 200 * sectionProgress;
    const posZ = 800 - 200 * sectionProgress;
    const eyePointY = 400 - 400 * sectionProgress;
    const eyePointZ = 600 * sectionProgress;
    camera.position.set(posY, eyeLine, posZ);
    camera.lookAt(new THREE.Vector3(eyePointY, eyeLine, eyePointZ));
  } else if (progress > 0.5 && progress <= 0.75) {
    // 回遊3
    const sectionProgress = (progress - 0.5) / 0.25;
    const posY = 200 - 200 * sectionProgress;
    const posZ = 600 - 200 * sectionProgress;
    const eyePointZ = 600 - 400 * sectionProgress;
    camera.position.set(posY, eyeLine, posZ);
    camera.lookAt(new THREE.Vector3(0, eyeLine, eyePointZ));
  } else if (progress > 0.75 && progress <= 1) {
    // 回遊4
    const sectionProgress = (progress - 0.75) / 0.25;
    const eyePointX = 100 + 900 * sectionProgress;
    camera.position.set(0, eyeLine, 400);
    camera.lookAt(new THREE.Vector3(0, eyePointX, 0));
  }
}
