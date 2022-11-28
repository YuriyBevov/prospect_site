import {gsap} from 'gsap';
import {ScrollToPlugin} from 'gsap/ScrollToPlugin';
import { debounce } from "../utils/debounce";
gsap.registerPlugin(ScrollToPlugin);

const anchors = document.querySelectorAll('.anchor-link');

if(anchors) {

  const onClickScrollToAnchor = (evt) => {
    evt.preventDefault();
    if(!debounce) {
      const anchor = evt.currentTarget.dataset.scrollTo;
      const target = document.querySelector('#' + anchor);

      gsap.to(window, {duration: 1.5, delay: .05, scrollTo: {y: target.offsetTop, autoKill: true}, ease: "power0.easeNone"});

    }
  }

  anchors.forEach(anchor => {
    anchor.addEventListener('click', onClickScrollToAnchor);
  });
}
