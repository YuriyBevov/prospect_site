import { burgerLinesAnimationIn, burgerLinesAnimationOut } from "../modules/burger-animation";
import { focusTrap, bodyLocker } from "../utils/functions";
import { debounce, setDebounce } from "../utils/debounce";
import { gsap } from 'gsap';

export class NavMenu {
  #container = null;
  #opener = null;
  #links = null;
  #openNavTl = gsap.timeline({ onComplete: () => { setDebounce(false); } });
  #closeNavTl = gsap.timeline({ onComplete: () => { setDebounce(false); this.#isNavOpened = false; } });
  #isNavOpened = false;

  constructor( container, opener ) {
    this.#container = container;
    this.#opener = opener;
    this.#links = this.#container.querySelectorAll('.anchor-link');

    this.#init();
  }

  #openNav = () => {
    if(!debounce) {
      setDebounce(true);
      this.#isNavOpened = true;

      gsap.set(this.#container, {opacity: 0, display: 'block'});

      burgerLinesAnimationIn();
      bodyLocker(true);
      focusTrap(this.#container);
      this.#addListeners();

      this.#openNavTl
        .to(this.#container, {
          opacity: 1,
          duration: 0.7
        })
        .fromTo('.nav__list', {opacity: 0}, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2'
        }, "-=0.7")
        .fromTo('.nav__list-item', {
          y: 50,
          opacity: 0
        }, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.075,
          ease: 'ease-in'
        }, "-=0.4");
    }
  }

  #closeNav = () => {
    if(!debounce) {
      setDebounce(true);

      burgerLinesAnimationOut();
      bodyLocker(false);

      this.#removeListeners();

      this.#closeNavTl
        .to(this.#container, {
          opacity: 0,
          duration: 0.5
        })
        .to(this.#container, {
          display: 'none',
          delay: .1
        });
    }
  }

  #removeListeners = () => {
    this.#links.forEach(link => {
      link.removeEventListener('click', this.#closeNav)
    });

    document.removeEventListener('keydown', this.#onKeyPressHandler);
    document.removeEventListener('click', this.#onOverlayClickHandler);
  }

  #addListeners = () => {
    this.#links.forEach(link => {
      link.addEventListener('click', this.#closeNav)
    });

    document.addEventListener('keydown', this.#onKeyPressHandler);
    document.addEventListener('click', this.#onOverlayClickHandler);
  }

  #onClickHandler = () => {
    if(!this.#isNavOpened) {
      this.#openNav();
    } else if(this.#isNavOpened){
      this.#closeNav();
    }
  }

  #onOverlayClickHandler = (evt) => {
    if(evt.target === this.#container) {
      this.#closeNav();
    }
  }

  #onKeyPressHandler = (evt) => {
    if(evt.key === 'Esc' || evt.key === 'Escape') {
      this.#closeNav();
    }
  }

  #init() {
    this.#opener.addEventListener('click', this.#onClickHandler);
  }
}
