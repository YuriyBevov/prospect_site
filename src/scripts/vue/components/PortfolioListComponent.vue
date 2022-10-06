<template>
  <ul class="portfolio__list">
    <li class="portfolio__list-item"
      v-for="(item, index) in items"
      :key="index"
    >
      <a href="#" @click="showGalleryModal" data-modal-anchor="gallery" v-if="item.type === 'image'" :data-id="item.id" aria-label="Посмотреть">
        <picture>
          <source :srcset="`./assets/img/${item.source}@1x.webp 1x, ./assets/img/${item.source}@2x.webp 2x`" type="image/webp" />
          <img :src="`./assets/img/${item.source}@1x.jpg`" :srcset="`./assets/img/${item.source}@2x.jpg 2x`" :alt= item.description width="787" height="589"/>
        </picture>
      </a>

      <a href="#" @click="showGalleryModal" data-modal-anchor="gallery" v-if="item.type === 'video'" :data-id="item.id" aria-label="Посмотреть">
        <video muted loop autoplay :poster="`./assets/img/hero-logo.svg`" playsinline>
          <source :src="`./assets/video/${item.source}.mp4`" type='video/mp4'>
          <source :src="`./assets/video/${item.source}.webm`" type='video/webm'>
        </video>

        <img :src="`./assets/img/hero-logo.svg`" alt="Заглушка" width="787" height="589" class="visually-hidden"/>
      </a>
    </li>

    <li v-if="!this.$props.items.length" class="portfolio__list-item portfolio__list-item--empty">
      <img :src="`./assets/img/hero-logo.svg`" width="100%" height="400"/>
      <p>Кажется, вы не выбрали ни одного праметра фильтрации...</p>
    </li>
  </ul>
</template>

<script>
  import { Modal } from "../../classes/Modal";
  import Swiper from 'swiper'
  import SwiperCore, { Autoplay, Scrollbar, Navigation, Pagination, Thumbs } from 'swiper/core';
  SwiperCore.use([Autoplay, Scrollbar, Navigation, Pagination, Thumbs]);

  let swiper, thumbs = null;

  export default {
    props: {
      items: Array,
      initialArray: Array
    },

    data() {
      return {
        galleryList: [],
      }
    },

    methods: {
      showGalleryModal(evt) {
        evt.preventDefault();

        swiper.slideTo(evt.currentTarget.dataset.id - 1);
        thumbs.slideTo(evt.currentTarget.dataset.id - 1);

        const modal = document.querySelector('#gallery-modal');
        new Modal(modal).show();
      },

      fillSwiper() {
        const swiperMainNode = document.querySelector('.swiper-main > .swiper-wrapper');
        const swiperThumbsNode = document.querySelector('.swiper-thumbs > .swiper-wrapper');

        let swiperMainLayout = '';
        let swiperThubsLayout = '';

        this.galleryList.forEach(slide => {
          if(slide.type === 'image') {
            swiperMainLayout += `
              <div class="swiper-slide
                <picture>
                  <source srcset="./assets/img/${slide.source}@1x.webp 1x, ./assets/img/${slide.source}@2x.webp 2x" type="image/webp" />
                  <img src="./assets/img/${slide.source}@1x.jpg" srcset="./assets/img/${slide.source}@2x.jpg 2x" alt="item" width="787" height="589"/>
                </picture>
              </div>
            `;

            swiperThubsLayout += `
              <div class="swiper-slide
                <picture>
                  <source srcset="./assets/img/${slide.source}@1x.webp 1x, ./assets/img/${slide.source}@2x.webp 2x" type="image/webp" />
                  <img src="./assets/img/${slide.source}@1x.jpg" srcset="./assets/img/${slide.source}@2x.jpg 2x" alt="item" width="787" height="589"/>
                </picture>
              </div>
            `;
          }

          if(slide.type === 'video') {
            swiperMainLayout += `
              <div class="swiper-slide">
                <video muted loop controls poster="./assets/img/hero-logo.svg" playsinline>
                  <source src="./assets/video/${slide.source}.mp4" type='video/mp4'>
                  <source src="./assets/video/${slide.source}.webm" type='video/webm'>
                </video>
              </div>
            `;

            swiperThubsLayout += `
              <div class="swiper-slide">
                <video muted loop poster="./assets/img/hero-logo.svg" playsinline>
                  <source src="./assets/video/${slide.source}.mp4" type='video/mp4'>
                  <source src="./assets/video/${slide.source}.webm" type='video/webm'>
                </video>
              </div>
            `;
          }

          swiperMainNode.innerHTML = swiperMainLayout;
          swiperThumbsNode.innerHTML = swiperThubsLayout;
        });

        this.initSwiper();
      },

      initSwiper() {
        swiper = new Swiper(".swiper-thumbs", {
          spaceBetween: 15,
          slidesPerView: 'auto',
          freeMode: false,
          watchSlidesProgress: true,
          slideToClickedSlide: true,
        });

        thumbs = new Swiper(".swiper-main", {
          spaceBetween: 15,

          centeredSlides: true,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },

          thumbs: {
            swiper: swiper,
          },
        });

        const videos = document.querySelectorAll('.swiper-main video');
        videos.forEach(video => {
          let observer = new IntersectionObserver(entries => {
            entries.forEach( entry => {
              if(entry.isIntersecting) {
                video.play('muted');
              } else {
                video.pause();
              }
            });
          });

          observer.observe(video);
        });
      },
    },

    watch: {
      initialArray: function() {
        this.galleryList = this.$props.initialArray;
        this.fillSwiper();
      }
    }
  }
</script>
