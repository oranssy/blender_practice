import { EventEmitter } from "events";

// extends 상속 받기
export default class Time extends EventEmitter {
  // 생성자 함수
  constructor() {
    super();
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;

    this.update();
  }

  // 시간차를 벌어주는 것
  update() {
    const currentTime = Date.now();

    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    // console.log(this.delta);   // 값 나오는지 확인
    this.emit("update");
    window.requestAnimationFrame(() => this.update()); // 재귀함수 -> 같은 숫자가 반복되므로 events npm 을 생성해줌
  }
}
