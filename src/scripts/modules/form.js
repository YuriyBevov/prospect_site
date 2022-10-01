import { formValidation } from "./form/formValidation";

const form = document.querySelector('form');

const onClickSendForm = (evt) => {
  evt.preventDefault();
  formValidation(form);
}

if(form) {
  const button = form.querySelector('button[type="submit"]');
  button.addEventListener('click', onClickSendForm);
}
