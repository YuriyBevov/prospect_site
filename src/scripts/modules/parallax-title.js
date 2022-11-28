import { body } from "../utils/nodesHelper";
import {gsap} from "gsap";
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const textElems = document.querySelectorAll('.section-title span');

if(textElems) {
  let pageHeight = body.getBoundingClientRect().height;

  function timeline(el) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    tl
      .fromTo(el,{ x: '100vw', opacity: 0 }, {
        x: '-100vw',
        opacity: 1,
        ease: 'linear'
      });
  }

  textElems.forEach(el => {
    timeline(el);
  });

  document.addEventListener('scroll', () => {
    const currentPageHeight = body.getBoundingClientRect().height;
    if(currentPageHeight !== pageHeight) {
      pageHeight = currentPageHeight;
      ScrollTrigger.refresh();
    }
  })
}
