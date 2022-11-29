// Experience 에서 다른 생성자 함수를 가져옴
import Experience from "../Experience.js";

import Room from "./Room.js";
import Environment from "./Environment.js";

// 방 밖의 공간
export default class world {
  // 생성자
  constructor() {
    this.experience = new Experience(); // 상속의 개념은 아님
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;

    // 시작하자마자 로딩 후 Room 이 실행되도록
    this.resources.on("ready", () => {
      this.environment = new Environment();
      this.room = new Room();

      console.log("create room 방 보여주기"); // 순서 확인 (3) : resources (1)(2) -> (3)
    });
    // this.room = new Room();
  }

  resize() {}

  update() {
    if (this.room) {
      this.room.update();
    }
  }
}
