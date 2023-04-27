import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class Panorama {
  width: number;
  height: number;
  element: any;
  scene: any;
  camera: any;
  renderer: any;
  controls: any;
  stageEl: HTMLDivElement;
  meshList: any[];
  raycaster: any;
  mouse: any;

  constructor(stageId: string) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.scene = new THREE.Scene();
    this.stageEl = document.getElementById(stageId) as HTMLDivElement;
    this.meshList = [];
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
  }

  /**
   * 初期化
   */
  init() {
    this.setCamera();
    this.setSphere();
    this.setThumbnails();
    this.setLight();
    this.setRenderer();
    this.renderer.render(this.scene, this.camera);
    this.setOrbitControls();
    window.addEventListener("resize", this.handleResize.bind(this), false);
    this.stageEl.addEventListener("mousemove", this.handleMouseMove.bind(this));
    this.render();
  }

  /**
   * カメラ設定
   */
  setCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      1,
      1000
    );
    this.camera.position.set(0, 0, 0);
    this.scene.add(this.camera);
  }

  /**
   * 球体設定
   */
  setSphere() {
    const geometry = new THREE.SphereGeometry(100, 60, 40);
    geometry.scale(-1, 1, 1);
    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      "https://ics-creative.github.io/161208_panorama/common/images/image.jpg"
    );
    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });
    const sphere = new THREE.Mesh(geometry, material);
    this.scene.add(sphere);
  }

  /**
   * サムネイル設定
   */
  setThumbnails() {
    const thumbnails = [
      "https://picsum.photos/id/237/300/300",
      "https://picsum.photos/id/238/300/300",
      "https://picsum.photos/id/239/300/300",
      "https://picsum.photos/id/240/300/300",
      "https://picsum.photos/id/241/300/300",
      "https://picsum.photos/id/242/300/300",
      "https://picsum.photos/id/243/300/300",
      "https://picsum.photos/id/244/300/300",
      "https://picsum.photos/id/247/300/300",
      "https://picsum.photos/id/248/300/300",
      "https://picsum.photos/id/249/300/300",
      "https://picsum.photos/id/250/300/300",
    ];
    const geometry = new THREE.PlaneGeometry(30, 30);
    for (let i = 0; i < thumbnails.length; i++) {
      const loader = new THREE.TextureLoader();
      const texture = loader.load(thumbnails[i]);
      const material = new THREE.MeshStandardMaterial({
        map: texture,
      });
      const mesh = new THREE.Mesh(geometry, material);
      this.scene.add(mesh);
      const radian = (i / thumbnails.length) * Math.PI * 2;
      mesh.position.set(
        80 * Math.cos(radian),
        20 * (Math.random() - 0.5) * 2,
        80 * Math.sin(radian)
      );
      mesh.rotation.y = -(Math.PI / 2 + radian);
      this.meshList.push(mesh);
    }
    // クリック時にモーダル開いて回転止まる
    // モーダル閉じた時に回転再開
    // ホバー時に回転止まる
    // ホバー解除時に回転再開
  }

  /**
   * 光源設定
   */
  setLight() {
    const ambientLight = new THREE.AmbientLight(0xffffff);
    this.scene.add(ambientLight);
    // TODO: 正面だけスポットライト当たるようなのやりたい
  }

  /**
   * レンダラー設定
   */
  setRenderer() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor({
      color: 0x000000,
    });
    this.element = this.renderer.domElement;
    this.stageEl.appendChild(this.element);
  }

  /**
   * コントロール設定
   */
  setOrbitControls() {
    this.controls = new OrbitControls(this.camera, this.element);
    this.controls.target.set(
      this.camera.position.x + 0.15,
      this.camera.position.y,
      this.camera.position.z
    );
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.2;
    this.controls.rotateSpeed = 0.1;
    // this.controls.enableZoom = false;
    // this.controls.autoRotate = true;
    // this.controls.autoRotateSpeed = 1;
    // this.controls.maxPolarAngle = Math.PI / 2;
    // this.controls.minPolarAngle = Math.PI / 2;
  }

  /**
   * 交差判定
   */
  updateIntersects() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.meshList);
    this.meshList.forEach((mesh) => {
      // TODO: ホバー時のカーソル変更が上手くいかない
      if (intersects.length > 0 && mesh === intersects[0].object) {
        mesh.material.color.setHex(0x999999);
      } else {
        mesh.material.color.setHex(0xffffff);
      }
    });
  }

  /**
   * 画面描画
   */
  render() {
    this.updateIntersects();
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
  }

  /**
   * リサイズ処理
   */
  handleResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  /**
   * マウス移動処理
   */
  handleMouseMove(e) {
    const element = e.currentTarget;
    const x = e.clientX - element.offsetLeft;
    const y = e.clientY - element.offsetTop;
    const w = element.offsetWidth;
    const h = element.offsetHeight;
    this.mouse.x = (x / w) * 2 - 1;
    this.mouse.y = -(y / h) * 2 + 1;
  }
}

const panorama = new Panorama("stage");
panorama.init();
