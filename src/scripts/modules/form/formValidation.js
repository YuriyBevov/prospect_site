import { setControlState } from "./setControlState";
import { sendForm } from "./sendForm";
import { loader } from "../../utils/nodesHelper";
import { modalOverlay } from "../../utils/nodesHelper";
import { bodyLocker } from "../../utils/functions";
import { gsap } from 'gsap';

export function formValidation(form) {

  let invalidControls = []
  let controls = form.querySelectorAll('input');

  controls.forEach(control => {
    setControlState(control, 'valid');
  })

  controls.forEach(control => {
    if(control.type === 'text') {
      if(control.value.trim() === '') {
        invalidControls.push(control)
      }
    }

    if(control.type === 'tel') {
      if(control.value.length !== 18) {
        invalidControls.push(control)
      }
    }

    if(control.type === 'checkbox') {
      if(!control.checked) {
        invalidControls.push(control)
      }
    }
  })

  if(!invalidControls.length) {
    loader.style.display = 'block';
    modalOverlay.style.display = 'block';
    loader.style.color = 'var(--white)';

    gsap.to('.modal-overlay', {
      opacity: 1,
      duration: 1,
      ease: 'ease-in'
    })

    bodyLocker(true);
    sendForm(form);
  } else {
    invalidControls.forEach(control => {
      setControlState(control, 'invalid');
    })
  }
}
