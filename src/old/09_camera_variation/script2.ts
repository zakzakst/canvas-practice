import * as THREE from "three";

class MakeCanvas {
  canvasEl: HTMLCanvasElement;
  width: number;
  height: number;
  scene: any;
  renderer: any;
  camera: any;
  spotLight: any;
  floor: any;

  constructor(id: string, width: number, height: number) {
    this.canvasEl = document.getElementById(id) as HTMLCanvasElement;
    this.width = width;
    this.height = height;
    this.scene = new THREE.Scene();
  }

  // 初期化
  init() {
    this.renderInit();
    this.cameraInit();
    this.lightInit();
    this.floorInit();
    this.boxInit();
    this.tick();
  }

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
    this.camera = new THREE.OrthographicCamera(-480, +480, 270, -270);
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
  floorInit() {
    const texture = new THREE.TextureLoader().load(
      "https://ics-creative.github.io/tutorial-three/samples/imgs/floor.png"
    );
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10);
    texture.magFilter = THREE.NearestFilter;

    this.floor = new THREE.Mesh(
      new THREE.PlaneGeometry(1000, 1000),
      new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.0,
        metalness: 0.6,
      })
    );
    this.floor.rotation.x = -Math.PI / 2;
    this.floor.receiveShadow = true;
    this.scene.add(this.floor);
  }

  // ボックス作成
  boxInit() {
    const material = new THREE.MeshStandardMaterial({
      color: 0x2299ff,
      roughness: 0.1,
      metalness: 0.2,
    });
    const geometry = new THREE.BoxGeometry(45, 45, 45);

    for (let i = 0; i < 60; i++) {
      const box = new THREE.Mesh(geometry, material);
      box.position.x = Math.round((Math.random() - 0.5) * 19) * 50 + 25;
      box.position.y = 25;
      box.position.z = Math.round((Math.random() - 0.5) * 19) * 50 + 25;
      box.receiveShadow = true;
      box.castShadow = true;
      this.scene.add(box);
    }
  }

  // 描画
  tick() {
    this.camera.position.x = 500 * Math.sin(Date.now() / 2000);
    this.camera.position.y = 250;
    this.camera.position.z = 500 * Math.cos(Date.now() / 2000);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => {
      this.tick();
    });
  }
}

const canvas = new MakeCanvas("canvas", 1600, 900);
canvas.init();
