import { Modal } from "../../classes/Modal";
import { gsap } from 'gsap';
import { loader } from "../../utils/nodesHelper";

export function sendForm(form) {

  const thanksModal = document.getElementById('thanks-modal');
  const errorModal = document.getElementById('error-modal');

  function loaderFadeOut() {
    return gsap.to('.loader', {
      opacity: 0,
      duration: 1,
      ease: 'ease-in',
      onComplete: () => {
        loader.style.display = 'none';
      }
    });
  }

  function success() {
    loaderFadeOut();
    form.reset();

    new Modal(thanksModal).show();

    const footer = form.querySelector('.form__footer');

    footer.innerHTML = `
      <div class="status-message">
        <svg width="60" height="60">
          <use xlink:href="./assets/sprite.svg#icon-success"></use>
        </svg><span>Ваша заявка успешно отправлена.</span>
      </div>
    `
    const controls = form.querySelectorAll('input');

    controls.forEach(ctrl => {
      ctrl.disabled = true;
    })
  }

  function error() {
    loaderFadeOut();
    new Modal(errorModal).show();
  }

  // handle the form submission event

  var data = new FormData(form);
  ajax(form.method, form.action, data, success, error);

  // helper function for sending an AJAX request

  function ajax(method, url, data, success, error) {
    console.log(method, url, data, success, error);
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  };
}
