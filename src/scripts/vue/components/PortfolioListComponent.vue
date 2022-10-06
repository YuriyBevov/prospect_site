<template>
  <ul class="portfolio__list">
    <li class="portfolio__list-item"
      v-for="(item, index) in items"
      :key="index"
    >
      <a href="#" @click="showFancy" data-modal-anchor="gallery" v-if="item.type === 'image'" :data-id="item.id" aria-label="Посмотреть">
        <picture>
          <source :srcset="`./assets/img/${item.source}@1x.webp 1x, ./assets/img/${item.source}@2x.webp 2x`" type="image/webp" />
          <img :src="`./assets/img/${item.source}@1x.jpg`" :srcset="`./assets/img/${item.source}@2x.jpg 2x`" :alt= item.description width="787" height="589"/>
        </picture>
      </a>

      <a href="#" @click="showFancy" data-modal-anchor="gallery" v-if="item.type === 'video'" :data-id="item.id" aria-label="Посмотреть">
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

  export default {
    props: {
      items: Array,
      initialArray: Array
    },

    data() {
      return {
        fancyList: [],
      }
    },

    methods: {
      showFancy(evt) {
        evt.preventDefault();

        const index = evt.currentTarget.dataset.id - 1;
        const prev = this.fancyList.slice(0, index);
        const next = this.fancyList.slice(index, this.fancyList.length);
        const current = [...next, ...prev];

        const modal = document.querySelector('#gallery-modal');
        new Modal(modal).show();

        let swiper = new Swiper(".swiper-thumbs", {
          //loop: true,
          spaceBetween: 15,
          slidesPerView: 'auto',
          freeMode: false,
          watchSlidesProgress: true,
          slideToClickedSlide: true,
        });

        let thumbs = new Swiper(".swiper-main", {
          //loop: true,
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

      },

      fillFancyList() {
        this.$props.initialArray.forEach(item => {
          if(item.type === 'image') {
            this.fancyList.push({
              src: `./assets/img/${item.source}@1x.jpg`,
              type: "image",
              id: item.id
            });
          } else if (item.type === 'video') {
            this.fancyList.push({
              src: `./assets/video/${item.source}.mp4`,
              type: "video",
              id: item.id,
              thumb: item.thumb
            });
          }
        });
      }
    },

    watch: {
      initialArray: function() {
        this.fillFancyList();
      }
    }
  }
</script>
