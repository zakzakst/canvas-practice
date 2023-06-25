import * as THREE from "three";

const stageEl = document.getElementById("stage");
const stageWidth = 800;
const stageHeight = 450;

const markersList = [
  {
    id: 1,
    position: [100, 100],
    item: null,
  },
  {
    id: 2,
    position: [500, -100],
    item: null,
  },
  {
    id: 3,
    position: [-500, 500],
    item: null,
  },
  {
    id: 4,
    position: [500, 300],
    item: null,
  },
];
const markerGroupsList = [];

/**
 * レンダラー初期化
 */
const threeRenderer = new THREE.WebGLRenderer({ alpha: true });
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
 * 交差判定初期化
 */
const threeRayCaster = new THREE.Raycaster();
const threeMousePos = new THREE.Vector2();

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
  island.position.set(0, -50, 0);
  threeScene.add(island);
};

/**
 * マーカーを作成
 */
const makeMarker = () => {
  const thickness = 10;
  const material = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
    // transparent: true,
    // opacity: 0.5,
  });
  // ベース部分を作成
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(50, 50, thickness, 32),
    material
  );
  // 矢印部分を作成
  const arrow = new THREE.Mesh(
    new THREE.BoxGeometry(50, thickness, 50),
    material
  );
  arrow.position.set(0, 0, 30);
  arrow.rotation.y = Math.PI / 4;
  // ベースと矢印をまとめて位置を調整
  const group = new THREE.Group();
  group.add(base);
  group.add(arrow);
  group.rotation.x = Math.PI / 2;
  group.position.set(0, 70, 0);
  return group;
};

/**
 * マーカーを配置
 */
const makeMarkers = () => {
  markersList.forEach((marker) => {
    const item = new makeMarker();
    item.position.x = marker.position[0];
    item.position.z = marker.position[1];
    marker.item = item;
    threeScene.add(item);
    markerGroupsList.push(item);
  });
};

/**
 * マウス移動時の処理
 */
const onMouseMoveHandler = () => {
  stageEl.addEventListener("mousemove", (e) => {
    const element = e.currentTarget;
    const x = e.clientX - element.offsetLeft;
    const y = e.clientY - element.offsetTop;
    const w = element.offsetWidth;
    const h = element.offsetHeight;
    threeMousePos.x = (x / w) * 2 - 1;
    threeMousePos.y = -(y / h) * 2 + 1;
    updateIntersects();
  });
};

/**
 * 交差判定更新
 */
function updateIntersects() {
  threeRayCaster.setFromCamera(threeMousePos, threeCamera);
  const intersects = threeRayCaster.intersectObjects(markerGroupsList);

  let isIntersect = false;
  let intersectGroupIndex = null;

  markerGroupsList.forEach((group, groupIndex) => {
    if (intersects.length) {
      // NOTE:グループ自体では交差判定できないため、各子要素を利用して判定する
      group.children.forEach((child) => {
        const intersectChild = intersects.find(
          (intersect) => child === intersect.object
        );
        if (intersectChild) {
          isIntersect = true;
          intersectGroupIndex = groupIndex;
        }
      });
    }
  });

  if (isIntersect && intersectGroupIndex) {
    console.log("交差");
    // 交差している場合
    stageEl.classList.add("--on-marker");
  } else {
    console.log("交差してない");
    // 交差していない場合
    stageEl.classList.remove("--on-marker");
  }
}

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
  // threeCamera.position.set(100, 100, 200);
  // threeCamera.position.set(200, 300, 200);
  threeCamera.position.set(0, 1000, 2000);
  threeCamera.lookAt(new THREE.Vector3(0, 0, 0));
}

makeIsland();
makeMarkers();
setCameraPos();
renderScene();
onMouseMoveHandler();
