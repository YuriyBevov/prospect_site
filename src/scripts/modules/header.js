import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const header = document.querySelector('.main-header');

if(header) {
  const headerInTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".portfolio__list",
      start: "top top",
      onLeaveBack: () => headerInTimeline.reverse() }
  });

  headerInTimeline
    .to(header, {
      y: '-105%',
      position: 'fixed',
      opacity: 0,
      duration: 0,
      padding: '15px 0',
      backgroundColor: 'transparent',
    })
    .to('.main-header-logo', {
      display: 'block'
    })
    .to(header, {
      duration: .3,
      ease: 'linear',
      y: '0',
      opacity: 1,
      backgroundColor: 'rgba(56,181,188,.7)',
    });
}
