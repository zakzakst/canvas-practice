import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";

function init() {
  const cities: any = [];
  const citiesPoints = [
    [35, 139],
    [51.2838, 0],
    [39, -116],
    [34, 118],
    [-33, 151],
    [-23, -46],
    [1, 103],
    [90, 0],
    [-90, 0],
  ];

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    innerWidth / innerHeight,
    1,
    2000
  );
  camera.position.set(-250, 0, -250);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(devicePixelRatio);
  renderer.setSize(innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);

  const controller = new TrackballControls(camera, renderer.domElement);
  controller.noPan = true;
  controller.minDistance = 200;
  controller.maxDistance = 1000;

  const earth = createEarth();
  scene.add(earth);

  for (let i = 0; i < citiesPoints.length; i++) {
    const latitude = citiesPoints[i][0];
    const longitude = citiesPoints[i][1];
    const point = createPoint(
      i === 0 ? 0xff0000 : latitude === 90 ? 0x0000ff : 0x00ff00,
      latitude,
      longitude
    );
    scene.add(point);
    cities.push(point);
  }

  const tick = () => {
    requestAnimationFrame(tick);
    controller.update();
    renderer.render(scene, camera);
  };

  tick();
}

const createEarth = () => {
  const texture = new THREE.TextureLoader().load(
    "https://ics-creative.github.io/tutorial-three/samples/imgs/earthmap1k.jpg"
  );
  return new THREE.Mesh(
    new THREE.SphereGeometry(100, 40, 40),
    new THREE.MeshBasicMaterial({ map: texture })
  );
};

const createPoint = (color, latitude = 0, longitude = 0) => {
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(2),
    new THREE.MeshBasicMaterial({ color: color })
  );
  sphere.position.copy(translateGeoCoords(latitude, longitude, 100));
  return sphere;
};

const translateGeoCoords = (latitude, longitude, radius) => {
  const phi = (latitude * Math.PI) / 180;
  const theta = ((longitude - 180) * Math.PI) / 180;
  const x = -1 * radius * Math.cos(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi);
  const z = radius * Math.cos(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
};

init();
