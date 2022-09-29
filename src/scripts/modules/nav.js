import {gsap} from 'gsap';

const nav = document.querySelector('.nav');

const tl = gsap.timeline();

export function showNav(nav, burger) {

}

export function hideNav(nav, burger) {

}

if(nav) {
  const burger = document.querySelector('.burger');

  const onClickHandler = (evt) => {
    evt.preventDefault();

    burger.classList.contains('opened') ?
    burger.classList.remove('opened') : burger.classList.add('opened');

    if(burger.classList.contains('opened')) {
      showNav(nav, burger);
    } else {
      hideNav(nav, burger);
    }
  }

  burger.addEventListener('click', onClickHandler);
}
