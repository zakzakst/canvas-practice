import * as THREE from "three";

class MakeCanvas {
  canvasEl: HTMLCanvasElement;
  width: number;
  height: number;
  scene: any;
  renderer: any;
  camera: any;
  spotLight: any;
  texture: any;

  constructor(id: string, width: number, height: number) {
    this.canvasEl = document.getElementById(id) as HTMLCanvasElement;
    this.width = width;
    this.height = height;
    this.scene = new THREE.Scene();
  }

  // 初期化
  init() {}

  // レンダラー初期化
  renderInit() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasEl,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.shadowMap.enabled = true;
  }

  // カメラ初期化
  cameraInit() {
    this.camera = new THREE.PerspectiveCamera(30, this.width / this.height);
  }

  // 光源初期化
  lightInit() {
    this.spotLight = new THREE.SpotLight(
      0xffffff,
      4,
      2000,
      Math.PI / 5,
      0.2,
      1.5
    );
    this.spotLight.position.set(500, 300, 500);
    this.spotLight.castShadow = true;
    this.spotLight.shadow.mapSize.width = 2048;
    this.spotLight.shadow.mapSize.height = 2048;
    this.scene.add(this.spotLight);
  }

  // 地面初期化
}

const canvas = new MakeCanvas("canvas", 1600, 900);
canvas.init();
