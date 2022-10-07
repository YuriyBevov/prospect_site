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
        <video autoplay muted loop playsinline :poster="`./assets/img/hero-logo.svg`" class="portfolio-video">
          <source :src="`./assets/video/${item.source}.mp4`" type='video/mp4'>
          <source :src="`./assets/video/${item.source}.webm`" type='video/webm'>
        </video>
      </a>
    </li>

    <li v-if="!this.$props.items.length" class="portfolio__list-item portfolio__list-item--empty">
      <img :src="`./assets/img/hero-logo.svg`" width="100%" height="400"/>
      <p>Кажется, вы не выбрали ни одного параметра фильтрации...</p>
    </li>
  </ul>
</template>

<script>
  import { Modal } from "../../classes/Modal";
  import Swiper from 'swiper'
  import SwiperCore, { Navigation, Thumbs } from 'swiper/core';
  SwiperCore.use([ Navigation, Thumbs]);

  let swiper, thumbs = null;

  export default {
    props: {
      items: Array,
      initial: Array
    },

    data() {
      return {
        galleryList: [],
      }
    },

    methods: {
      showGalleryModal(evt) {
        evt.preventDefault();

        const modal = document.querySelector('#gallery-modal');
        new Modal(modal).show();

        this.initSwiper(evt.currentTarget.dataset.id - 1);
      },

      fillSwiper() {
        const swiperMainNode = document.querySelector('.swiper-main > .swiper-wrapper');
        const swiperThumbsNode = document.querySelector('.swiper-thumbs > .swiper-wrapper');

        let swiperMainLayout = '';

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
          }

          if(slide.type === 'video') {
            swiperMainLayout += `
              <div class="swiper-slide">
                <video muted playsinline loop poster="./assets/img/hero-logo.svg" >
                  <source src="./assets/video/${slide.source}.mp4" type='video/mp4'>
                  <source src="./assets/video/${slide.source}.webm" type='video/webm'>
                </video>
              </div>
            `;
          }

          swiperMainNode.innerHTML = swiperMainLayout;
          swiperThumbsNode.innerHTML = swiperMainLayout;
        });
      },

      initSwiper(currentSlide) {
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

        swiper.slideTo(currentSlide);
        thumbs.slideTo(currentSlide);

        let mainVideo, thumbVideo = null;

        setTimeout(() => {
          mainVideo = document.querySelector('.swiper-main .swiper-slide-active > video');
          thumbVideo = document.querySelector('.swiper-thumbs .swiper-slide-thumb-active > video');

          if(mainVideo && thumbVideo) {
            video('play');
          }
        }, 100);

        thumbs.on('slideChangeTransitionEnd', function () {
          if(mainVideo && thumbVideo) {
            video('pause');
          }

          mainVideo = document.querySelector('.swiper-main .swiper-slide-active > video');
          thumbVideo = document.querySelector('.swiper-thumbs .swiper-slide-thumb-active > video');

          if(mainVideo && thumbVideo) {
            video('play');
          }
        });

        function video(state) {
          if(state == 'play') {
            if(mainVideo) {
              mainVideo.play();
            }

            if(thumbVideo) {
              thumbVideo.play();
            }
          }

          if(state == 'pause') {
            if(mainVideo) {
              mainVideo.pause();
            }

            if(thumbVideo) {
              thumbVideo.pause();
            }
          }
        }

      },
    },

    watch: {
      initial: function() {
        this.galleryList = this.$props.initial;
        this.fillSwiper();
      },

      items: function() {
        /*const videos = document.querySelectorAll('video');

        videos.forEach(video => {
          video.play();
        })*/
      }
    }
  }
</script>
