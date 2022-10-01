import { setControlState } from "./setControlState";
import { sendForm } from "./sendForm";

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

    setTimeout(() => {// убрать, это для проверки лоадера
      sendForm(form);
    }, 1000);

  } else {
    invalidControls.forEach(control => {
      setControlState(control, 'invalid');
    })
  }
}
