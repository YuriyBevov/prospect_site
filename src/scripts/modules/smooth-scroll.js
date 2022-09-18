import {gsap} from "gsap";
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {ScrollSmoother} from 'gsap/ScrollSmoother';
import {ScrollToPlugin} from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

ScrollTrigger.config({ ignoreMobileResize: true });



const anchors = document.querySelectorAll('.anchor-link');

if(anchors) {
  const onClickScrollToAnchor = (evt) => {
    evt.preventDefault();
    const anchor = evt.currentTarget.dataset.scrollTo;
    const target = document.querySelector('#' + anchor);

    gsap.to(window, {duration: 1.5, scrollTo: {y: target, /*offset: 60,*/ autoKill: true}, ease: "power2"});
  }

  anchors.forEach(anchor => {
    anchor.addEventListener('click', onClickScrollToAnchor);
  });
}

/*const header = document.querySelector('.main-header');

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
      backgroundColor: 'var(--primary)',
    })
    /*.to('.portfolio', {
      paddingTop: '100px'
    }, "-=0.5")*/
//}*/

ScrollSmoother.create({
  smooth: 2.4
});
