/*import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {root} from "../utils/nodesHelper";

gsap.registerPlugin(ScrollTrigger);

function setCssProperty(name, value) {
  root.style.setProperty(name, value);
}

function setVieportHeight() {
  let vh = window.innerHeight * 0.01;
  setCssProperty('--vh', `${vh}px`);
  ScrollTrigger.refresh();

  window.addEventListener('resize', () => {
    vh = window.innerHeight * 0.01;
    setCssProperty('--vh', `${vh}px`);
    ScrollTrigger.refresh();
  });
}

setVieportHeight();*/
