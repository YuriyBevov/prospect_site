import {gsap} from 'gsap';

gsap.fromTo('.hero__arrow-down', {
  opacity: 0
}, {
  opacity: 1,
  delay: 1,
  duration: 1,
  ease: 'power0.easeNone'
});
