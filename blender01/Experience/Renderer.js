import * as THREE from "three";
// Experience 에서 다른 생성자 함수를 가져옴
import Experience from "./Experience.js";

export default class Renderer {
  // 생성자
  constructor() {
    this.experience = new Experience(); // 상속의 개념은 아님
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;

    // 카메라 값을 잘 받아오는지 확인 (이 값을 잘 받아와야 부드러움을 자연스럽게 표현할 수 있음)
    // console.log(this.camera, this.camera.perspectiveCamera);

    this.setRenderer();

    // 값을 받아오는지 확인
    // console.log(this.experience);
    // console.log(this.sizes, this.scene, this.canvas);
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    this.renderer.physicallyCorrectLights = true; // 빛 조명
    this.renderer.outputEncoding = THREE.sRGBEncoding; // 출력시 rgb 모드
    this.renderer.toneMapping = THREE.CineonToneMapping; // 매핑
    this.renderer.toneMappingExposure = 0.85; // 매핑 노출량 ( 방 전체 조명?! 톤 조절 기본 1.75 )
    this.renderer.shadowMap.enabled = true; // 그림자
    this.renderer.shadowMap.type = THREE.PCFShadowMap; // 그림자
    this.renderer.setSize(this.sizes.width, this.sizes.height); // 사이즈
    this.renderer.setPixelRatio(this.sizes.pixelRatio); // 비율
  }

  resize() {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio); // 비율
  }

  update() {
    this.renderer.render(this.scene, this.camera.perspectiveCamera);
  }
}
