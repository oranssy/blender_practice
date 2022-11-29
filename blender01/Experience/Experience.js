// 총괄하는 사령부라고 생각하면 됨

// node_modules > three > src 에서 가져와서 사용하는 것이기 때문에 import 시켜줌
import * as THREE from "three";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Resources from "./Utils/Resources.js";
import assets from "./Utils/assets.js";

import Camera from "./Camera.js";
import Renderer from "./Renderer.js";

import World from "./World/World.js";

// 실행할 것을 모아둠 : 페이지를 세분화할 것이기 때문에 export 와 import 를 적절하게 사용해야 함
export default class Experience {
  // 메모리를 많이 차지하기 때문에 제한을 걸어두는 것 (1)
  static instance;

  constructor(canvas) {
    // canvas = ".experience-canvas"

    // 메모리를 많이 차지하기 때문에 제한을 걸어두는 것 (2)
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;

    // console.log("hello world");      // 연결 확인

    // three.js 라이브러리에서 가져옴 -> 모양 나오는지 확인
    // const scene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera(
    //   75,
    //   window.innerWidth / window.innerHeight,
    //   0.1,
    //   1000
    // );

    // const renderer = new THREE.WebGLRenderer();
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);

    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    // camera.position.z = 5;

    // function animate() {
    //   requestAnimationFrame(animate);

    //   cube.rotation.x += 0.01;
    //   cube.rotation.y += 0.01;

    //   renderer.render(scene, camera);
    // }

    // animate();

    // 인스턴스 실행문
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.sizes = new Sizes();
    this.time = new Time();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(assets);
    this.world = new World();

    // 업데이트가 발생했을 때 공간을 만듦
    this.time.on("resize", () => {
      this.resize();
    });

    this.time.on("update", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.world.update();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }
}
