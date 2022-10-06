import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const header = document.querySelector('.main-header');

if(header) {

  const headerInTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero",
      start: "bottom top",
      onLeaveBack: () => headerInTimeline.reverse()
    }
  });

  headerInTimeline
    .to(header, {
      y: '-110%',
      position: 'fixed',
      opacity: 0,
      duration: 0,
      padding: '15px 0',
      backgroundColor: 'transparent',
    })
    .to('.main-header-logo', {
      display: 'block',
      opacity: 1,
    })
    .to('.main-header .contacts', {
      display: 'flex'
    })
    .to(header, {
      duration: .3,
      ease: 'linear',
      y: '0',
      opacity: 1,
      backgroundColor: 'rgba(56,181,188,.7)',
    });
}

