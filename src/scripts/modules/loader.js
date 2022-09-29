import {gsap} from 'gsap';

const tl = gsap.timeline();

window.addEventListener('load', () => {
  tl
    .to('.loader', {
      display: 'none'
    })
    .to('.page-overlay', {
      opacity: 0,
      ease: 'linear',
      duration: .8,
      delay: .2
    })
    .fromTo('body', {opacity: 0},{
      opacity: 1,
      ease: 'linear',
      duration: .8,
      delay: .2
    }, "-=800")
    .to('.page-overlay', {
      display: 'none'
    })
})
