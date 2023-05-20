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

  constructor() {
    this.canvasEl = document.getElementById("canvas");
    this.width = window.innerWidth;
    this.height = 400;
    this.scene = new THREE.Scene();
    this.breakpoint = 768;
    this.fov = {
      sp: 55,
      pc: 75,
    };
  }

  init() {
    this.setSphere();
    this.setLight();
    this.setCamera();
    this.setRenderer();
    this.renderer.render(this.scene, this.camera);
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
      10,
      2000
    );
    this.camera.position.set(0, 0, +7500);
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
   * 球体設定
   */
  setSphere() {
    const length = 90;
    for (let i = 0; i < length; i++) {
      const geometry = new THREE.SphereGeometry(200, 30, 30);
      geometry.scale(-1, 1, 1);
      const loader = new THREE.TextureLoader();
      const texture = loader.load(
        "https://ics-creative.github.io/161208_panorama/common/images/image.jpg"
        // "./panorama.jpg"
      );
      const material = new THREE.MeshBasicMaterial({
        map: texture,
      });
      const sphere = new THREE.Mesh(geometry, material);
      const radian = (i / length) * Math.PI * 2;
      const radius = 6500;
      sphere.position.set(
        radius * Math.cos(radian),
        0,
        radius * Math.sin(radian)
      );
      this.scene.add(sphere);
    }
  }

  /**
   * 画面描画
   */
  render() {
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
