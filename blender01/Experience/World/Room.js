import * as THREE from "three";
// Experience 에서 다른 생성자 함수를 가져옴
import Experience from "../Experience";

// 방 안의 공간
export default class Room {
  // 생성자
  constructor() {
    this.experience = new Experience(); // 상속의 개념은 아님
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.room = this.resources.items.room;
    // console.log(this.room); // 값이 나오는지 확인
    this.actualRoom = this.room.scene;
    // console.log(this.actualRoom);

    this.setModel();
    this.setAnimation();

    // // 모양이 나오는지 확인
    // // const geometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // // const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    // // const mesh = new THREE.Mesh(geometry, material);
    // const cube = new THREE.Mesh(geometry, material);
    // this.scene.add(cube);
  }
  setModel() {
    this.actualRoom.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;

      // 그림자 만들기 : instanceof 느리기 때문에 추천하지는 않지만 여기서 사용함
      if (child instanceof THREE.Group) {
        child.children.forEach((groupchild) => {
          groupchild.castShadow = true;
          groupchild.receiveShadow = true;
        });
      }
      console.log(child);

      // 곰돌이가 갇혀있는 장식장 -> 유리 재질 바꾸기
      if (child.name === "큐브") {
        child.material = new THREE.MeshPhysicalMaterial();
        child.material.roughness = 0;
        child.material.color.set(0x0000ff);
        child.material.ior = 1;
        child.material.transmission = 1;
        child.material.opacity = 1;
      }

      if (child.name === "screen") {
        child.material = new THREE.MeshPhysicalMaterial({
          map: this.resources.items.screen,
        });
      }
    });
    this.scene.add(this.actualRoom);

    // 방 크기 축소시키기
    this.actualRoom.scale.set(0.11, 0.11, 0.11);
    // 방 회전시키기
    this.actualRoom.rotation.y = Math.PI; // 반 바퀴 돌림
  }

  // 애니메이션 설정
  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.actualRoom);
    // console.log(this.mixer);
    this.swim = this.mixer.clipAction(this.room.animations[0]);
    this.swim.play();
  }
  resize() {}
  update() {
    this.mixer.update(this.time.delta * 0.0009);
  }
}
