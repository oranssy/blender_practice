import * as THREE from "three";
// Experience 에서 다른 생성자 함수를 가져옴
import Experience from "../Experience";

// 방 안의 공간
export default class Environment {
  // 생성자
  constructor() {
    this.experience = new Experience(); // 상속의 개념은 아님
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // 조명 설정
    this.setSunlight();
  }
  setSunlight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 3);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(1024, 1024); // 메모리를 많이 차지하기 때문에 컴퓨터 사양에 따라 조절해야 함
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(1.5, 7, 3);
    this.scene.add(this.sunLight); // 화면에 추가시켜줌

    // 너무 정면에 있어서 안 보이므로 추가시켜줌
    this.ambientLight = new THREE.AmbientLight("#ffffff", 1);
    this.scene.add(this.ambientLight);
  }
  resize() {}
  update() {}
}
