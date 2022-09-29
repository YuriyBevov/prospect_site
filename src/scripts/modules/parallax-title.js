import {gsap} from "gsap";
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {ScrollSmoother} from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const textElems = document.querySelectorAll('.section-title span');

if(textElems) {

  function timeline(el) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        //markers: true,
        //onLeaveBack: () => tl.reverse()
      }
    });

    tl
      .fromTo(el,{ x: '100vw', opacity: 0 }, {
        x: '-100vw',
        opacity: 1,
        duration: 3,
        delay: 0.3,
        ease: 'linear'
      });
  }

  textElems.forEach(el => {
    timeline(el);
  });
}
