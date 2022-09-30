<template>
  <div class="tag-list">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(tag, i) in tags"
          :key="'tag_' + (i+1)"
        >
          <button class="tag-label" type="button" @click="removeTag" :data-tag="tag">{{tag}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Swiper } from 'swiper';

  export default {
    props: {
      tags: Array
    },

    data() {
      return {
        swiper: null
      }
    },

    components: {
      Swiper
    },

    methods: {
      removeTag(evt, el) {
        this.$emit('remove', evt.target.dataset.tag);
      },

      swiperInit() {
        this.swiper = new Swiper ('.swiper-container', {
          slidesPerView: 'auto',
          spaceBetween: 20,
        })
      },

      swiperUpdate() {
        setTimeout(() => {
          this.swiper.updateSlides();
          this.swiper.updateSize();
          this.swiper.update();
        }, 200);
      }
    },

    mounted() {
      this.swiperInit();
    },

    watch: {
      tags: function (val) {
        this.swiperUpdate();
      },

      checked: function(val) {
        console.log('checked')
      }
    }
  }
  </script>
