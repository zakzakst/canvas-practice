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
  classNames: any;
  hoverThumbnailId: string | null;
  thumbnails: any[];
  isMouseDown: boolean;
  fov: any;
  breakpoint: number;

  constructor(stageId: string) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.scene = new THREE.Scene();
    this.stageEl = document.getElementById(stageId) as HTMLDivElement;
    this.meshList = [];
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.classNames = {
      onThumbnail: "--on-thumbnail",
      mouseDown: "--mouse-down",
    };
    this.hoverThumbnailId = null;
    this.thumbnails = [
      {
        id: "1",
        img: "https://picsum.photos/id/237/300/300",
      },
      {
        id: "2",
        img: "https://picsum.photos/id/238/300/300",
      },
      {
        id: "3",
        img: "https://picsum.photos/id/239/300/300",
      },
      {
        id: "4",
        img: "https://picsum.photos/id/240/300/300",
      },
      {
        id: "5",
        img: "https://picsum.photos/id/241/300/300",
      },
      {
        id: "6",
        img: "https://picsum.photos/id/242/300/300",
      },
      {
        id: "7",
        img: "https://picsum.photos/id/243/300/300",
      },
      {
        id: "8",
        img: "https://picsum.photos/id/244/300/300",
      },
      {
        id: "9",
        img: "https://picsum.photos/id/247/300/300",
      },
      {
        id: "10",
        img: "https://picsum.photos/id/248/300/300",
      },
      {
        id: "11",
        img: "https://picsum.photos/id/249/300/300",
      },
      {
        id: "12",
        img: "https://picsum.photos/id/250/300/300",
      },
    ];
    this.isMouseDown = false;
    this.fov = {
      sp: 55,
      pc: 75,
    };
    this.breakpoint = 768;
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
    this.setControlAngle();
    // 各種イベント設定
    window.addEventListener("resize", this.handleResize.bind(this), false);
    this.stageEl.addEventListener("mousemove", this.handleMouseMove.bind(this));
    this.stageEl.addEventListener("click", this.handleClick.bind(this));
    this.stageEl.addEventListener("mousedown", this.handleMouseDown.bind(this));
    this.stageEl.addEventListener("mouseup", this.handleMouseUp.bind(this));
    // 描画開始
    this.render();
  }

  /**
   * カメラ設定
   */
  setCamera() {
    const fov = this.getDeviceType() === "pc" ? this.fov.pc : this.fov.sp;
    this.camera = new THREE.PerspectiveCamera(
      fov,
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
    const geometry = new THREE.PlaneGeometry(30, 30);
    for (let i = 0; i < this.thumbnails.length; i++) {
      const loader = new THREE.TextureLoader();
      const texture = loader.load(this.thumbnails[i].img);
      const material = new THREE.MeshStandardMaterial({
        map: texture,
      });
      const mesh = new THREE.Mesh(geometry, material);
      this.scene.add(mesh);
      const radian = (i / this.thumbnails.length) * Math.PI * 2;
      mesh.position.set(
        80 * Math.cos(radian),
        20 * (Math.random() - 0.5) * 2,
        80 * Math.sin(radian)
      );
      mesh.rotation.y = -(Math.PI / 2 + radian);
      this.meshList.push(mesh);
    }
    // サムネイルタイトルも追加したい（下にプレートをずらして配置してその上にテキスト載せるとか？）
    // ちょっと手間そう。対応しない ※文字入れるのは別でやってみたい
    // https://zenn.dev/raihara3/articles/20220529_threejs_japanese_text
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
      this.camera.position.x + Math.cos(0),
      this.camera.position.y,
      this.camera.position.z + Math.sin(0)
    );
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.2;
    this.controls.rotateSpeed = 0.1;
    this.controls.enableZoom = false;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 1;
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.minPolarAngle = Math.PI / 2;
  }

  /**
   * 向いている方向の変更
   * @param id サムネイルID
   */
  setControlAngle(id: string | null = null) {
    // idから指定サムネイルのindexを取得
    const targetThumbnail = this.thumbnails.find(
      (thumbnail) => thumbnail.id === id
    );
    const targetIndex = this.thumbnails.indexOf(targetThumbnail);
    // ランダムなサムネイルのindexを取得
    const randomIndex = Math.floor(Math.random() * this.thumbnails.length);
    // 指定サムネイルの有無から角度設定に適用するindexを取得
    const index = targetIndex !== -1 ? targetIndex : randomIndex;
    const radian = (index / this.thumbnails.length) * Math.PI * 2;
    this.controls.target.set(
      this.camera.position.x + Math.cos(radian),
      this.camera.position.y,
      this.camera.position.z + Math.sin(radian)
    );
  }

  /**
   * 交差判定
   */
  updateIntersects() {
    // ドラッグ中は処理をしない
    if (this.isMouseDown) return;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.meshList);

    for (let i = 0; i < this.meshList.length; i++) {
      const mesh = this.meshList[i];
      if (intersects.length > 0 && mesh === intersects[0].object) {
        this.stageEl.classList.add(this.classNames.onThumbnail);
        this.meshMouseOn(mesh);
        this.hoverThumbnailId = this.thumbnails[i].id;
        break;
      } else {
        this.stageEl.classList.remove(this.classNames.onThumbnail);
        this.meshMouseOut(mesh);
        this.hoverThumbnailId = null;
      }
    }
  }

  /**
   * マウスが入った際のメッシュ操作
   * @param mesh 操作するメッシュ
   */
  meshMouseOn(mesh) {
    // 色変えでなくシェーダーで何かしらの変化付けたい
    mesh.material.color.setHex(0x999999);
  }

  /**
   * マウスが出た際のメッシュ操作
   * @param mesh 操作するメッシュ
   */
  meshMouseOut(mesh) {
    mesh.material.color.setHex(0xffffff);
  }

  /**
   * 画面描画
   */
  render() {
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
  }

  /**
   * デバイス判定
   * @returns string デバイスタイプ
   */
  getDeviceType(): "pc" | "sp" {
    return window.innerWidth >= this.breakpoint ? "pc" : "sp";
  }

  /**
   * リサイズ処理
   */
  handleResize() {
    const fov = this.getDeviceType() === "pc" ? this.fov.pc : this.fov.sp;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.fov = fov;
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
    this.updateIntersects();
  }

  /**
   * マウスダウン処理
   */
  handleMouseDown() {
    this.stageEl.classList.add(this.classNames.mouseDown);
    this.isMouseDown = true;
  }

  /**
   * マウスアップ処理
   */
  handleMouseUp() {
    this.stageEl.classList.remove(this.classNames.mouseDown);
    this.isMouseDown = false;
  }

  /**
   * マウスクリック処理
   */
  handleClick() {
    if (this.hoverThumbnailId) {
      const targetThumbnail = this.thumbnails.find(
        (thumbnail) => thumbnail.id === this.hoverThumbnailId
      );
      console.log(targetThumbnail);
      // TODO: モーダル表示
      this.controls.autoRotate = false;
    } else {
      // TODO: モーダル表示がない状態での暫定対応、モーダルを閉じる時の処理に組み込んだら記述削除
      this.controls.autoRotate = true;
    }
    // クリック時にモーダル開いて回転止まる
    // モーダル閉じた時に回転再開
  }
}

const panorama = new Panorama("stage");
panorama.init();
