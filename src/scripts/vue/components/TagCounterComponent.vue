<template>
  <div class="tag-list">
    <div class="swiper-container tag-swiper-container">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(tag, i) in tags"
          :key="'tag_' + (i+1)"
        >
          <div class="tag-label">
            <span>{{tag}}</span>
            <button
              type="button"
              :data-tag="tag"
              @click="removeTag"
              :disabled="tags.length === 1 ? true : false"
              aria-label="Удалить"
            ></button>
          </div>
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
        this.swiper = new Swiper ('.tag-swiper-container', {
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
    }
  }
  </script>
