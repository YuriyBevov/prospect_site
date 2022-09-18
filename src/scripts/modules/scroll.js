import {gsap} from 'gsap';
import {ScrollToPlugin} from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

const anchors = document.querySelectorAll('.anchor-link');

if(anchors) {

  const onClickScrollToAnchor = (evt) => {
    evt.preventDefault();
    const anchor = evt.currentTarget.dataset.scrollTo;
    const target = document.querySelector('#' + anchor);

    gsap.to(window, {duration: 1.2, scrollTo: {y: target, autoKill: true}, ease: "ease"});
  }

  anchors.forEach(anchor => {
    anchor.addEventListener('click', onClickScrollToAnchor);
  });

}
