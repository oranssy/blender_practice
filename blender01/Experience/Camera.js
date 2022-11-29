import * as THREE from "three";
// Experience 에서 다른 생성자 함수를 가져옴
import Experience from "./Experience.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class Camera {
  // 생성자
  constructor() {
    this.experience = new Experience(); // 상속의 개념은 아님
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    // 값을 받아오는지 확인
    // console.log(this.experience);
    // console.log(this.sizes, this.scene, this.canvas);

    // 카메라 실행
    this.createPerspectiveCamera();
    this.createOrthographicCamera();
    this.setOrbitControls();
  }

  // 첫번째 전체뷰 카메라 만들기
  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      1000
    );
  }

  // 두번째 근접뷰 카메라 만들기
  createOrthographicCamera() {
    // 기본 셋팅
    this.frustrum = 5;
    this.orthographicCamera = new THREE.PerspectiveCamera(
      (-this.sizes.aspect * this.sizes.frustrum) / 2, // 좌
      (this.sizes.aspect * this.sizes.frustrum) / 2, // 우
      this.sizes.frustrum / 2, // 상
      -this.sizes.frustrum / 2, // 하
      -100, // z값
      100
    );
    this.scene.add(this.orthographicCamera);
    this.perspectiveCamera.position.z = 5; // 5미터 정도 뒤로 뺌

    // 위치 기준선 좌표 만들기
    const size = 10;
    const divisions = 10;
    const gridHelper = new THREE.GridHelper(size, divisions);
    this.scene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(10);
    this.scene.add(axesHelper);
  }

  // OrbitControls
  setOrbitControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = true;
  }

  // 화면이 바뀔 때마다 카메라 비율 업데이트
  resize() {
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();

    this.orthographicCamera.left =
      (-this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.right =
      (this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.top = this.sizes.frustrum / 2;
    this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
