import Swiper from 'swiper';

const filterTagSlider = document.querySelector('.filter-tags-swiper');

if(filterTagSlider) {
  new Swiper(filterTagSlider, {
    slidesPerView: 'auto',
    spaceBetween: 20,
  });
};
