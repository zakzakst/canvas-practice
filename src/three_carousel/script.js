import * as THREE from "three";

class ThreeCarousel {
  canvasEl;
  width;
  height;
  renderer;
  camera;
  scene;
  breakpoint;
  fov;
  group;
  spheres;

  constructor() {
    this.canvasEl = document.getElementById("canvas");
    this.width = window.innerWidth;
    this.height = 400;
    this.scene = new THREE.Scene();
    this.breakpoint = 768;
    this.fov = {
      sp: 45,
      pc: 60,
    };
    this.spheres = [];
  }

  init() {
    this.setGroup();
    this.setSphere();
    this.setLight();
    this.setCamera();
    this.setRenderer();
    this.setGrid();
    this.renderer.render(this.scene, this.camera);
    // 描画開始
    this.render();
  }

  /**
   * グループ設定
   */
  setGroup() {
    this.group = new THREE.Group();
    this.scene.add(this.group);
  }

  /**
   * 球体設定
   */
  setSphere() {
    const length = 12;
    for (let i = 0; i < length; i++) {
      // const geometry = new THREE.SphereGeometry(30, 30, 30);
      const geometry = new THREE.BoxGeometry(30, 30, 30);
      geometry.scale(-1, 1, 1);
      const loader = new THREE.TextureLoader();
      // const texture = loader.load(
      //   // "https://ics-creative.github.io/161208_panorama/common/images/image.jpg"
      //   "earthmap.jpg"
      // );
      // const material = new THREE.MeshBasicMaterial({
      //   map: texture,
      // });
      const material = new THREE.MeshNormalMaterial();
      const sphere = new THREE.Mesh(geometry, material);
      const radian = (i / length) * Math.PI * 2;
      const radius = 200;
      sphere.position.set(
        radius * Math.cos(radian),
        60,
        radius * Math.sin(radian)
      );
      sphere.rotation.y = Math.cos(radian);
      this.spheres.push(sphere);
      this.group.add(sphere);
    }
  }

  /**
   * カメラ設定
   */
  setCamera() {
    const fov = this.getDeviceType() === "pc" ? this.fov.pc : this.fov.sp;
    this.camera = new THREE.PerspectiveCamera(fov, this.width / this.height);
    this.camera.position.set(0, 90, 300);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.scene.add(this.camera);
  }

  /**
   * 光源設定
   */
  setLight() {
    const ambientLight = new THREE.AmbientLight(0xffffff);
    this.scene.add(ambientLight);
  }

  /**
   * レンダラー設定
   */
  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasEl,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
  }

  /**
   * グリッド設定
   */
  setGrid() {
    this.scene.add(new THREE.GridHelper(600));
    this.scene.add(new THREE.AxesHelper(600));
  }

  /**
   * 画面描画
   */
  render() {
    // this.spheres.forEach((sphere) => {
    //   sphere.rotation.y -= 0.002;
    // });
    this.group.rotation.y += 0.002;
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * デバイス判定
   * @returns string デバイスタイプ
   */
  getDeviceType() {
    return window.innerWidth >= this.breakpoint ? "pc" : "sp";
  }
}

const threeCarousel = new ThreeCarousel();
threeCarousel.init();
