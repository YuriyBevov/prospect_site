import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export class Accordeon {
  #container = null;
  #fields = null;
  #offset = null;

  constructor(container) {
    this.#container = container;
    this.#fields = this.#container.querySelectorAll('.accordeon__field');

    this.#init();
  }

  #init() {
    this.#calcPos(window.innerWidth);
    window.addEventListener('resize', this.#onResizeHandler);
  }

  #onResizeHandler = () => {
    this.#calcPos(window.innerWidth);
  }

  #calcPos(width) {
    if (width > 960 && width < 1441) {
      this.#offset = 70;
    } else if ( width > 1440 ) {
      this.#offset = 100;
    } else {
      this.#offset = 0;
    }

    this.#fields.forEach((field,i) => {
      if(field.classList.contains('transitioned') && this.#offset !== null) {
        field.style.left = 'calc(100% - ' + this.#offset * (this.#fields.length - i) + 'px)';
      } else {
        field.style.left = this.#offset * i + 'px';
      }
    })
  }
}
