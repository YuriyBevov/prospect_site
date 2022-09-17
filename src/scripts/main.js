import "./modules/video";
import "./modules/accordeon";
import "./modules/yandexMap";
import "./modules/select";
import "./modules/form-mask";

document.addEventListener('DOMContentLoaded', () => {
  console.log('LOADED');
  document.querySelector('.hero video').play();
});
