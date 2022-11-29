// node.js 를 기반으로 하기 때문에 react 와 같은 방식으로 입력함
import "./style.css";
import Experience from "./Experience/Experience.js";

// 클래스를 만들어서 실행시켜준 것 ->  three03.html 의 const stage = new Stage(); 와 동일
const experience = new Experience(document.querySelector(".experience-canvas"));
