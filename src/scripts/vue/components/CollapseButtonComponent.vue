<template>
  <button
    class="portfolio__collapse main-btn"
    type="button"
    :disabled="this.disabled"
    @click="collapse"
  >
    <svg width="24" height="24">
      <use :xlink:href="`./assets/sprite.svg#icon-btn-arrow`"></use>
    </svg>
  </button>
</template>

<script>
  import {gsap} from 'gsap'
  import {ScrollToPlugin} from 'gsap/ScrollToPlugin';
  gsap.registerPlugin(ScrollToPlugin);

  export default {

    props: {
      state: Boolean
    },

    data() {
      return {
        disabled: this.$props.state ? !this.$props.state : true
      }
    },

    methods: {
      collapse() {
        gsap.to(window, {
          duration: 1.5,
          scrollTo: {y: '.portfolio', offsetY: 40, autoKill: true},
          ease: "power0.easeNone",
          onComplete: () => this.$emit('collapse')
        });
      },
    },

    watch: {
      state: function() {
        this.disabled = !this.$props.state;
      }
    }
  }
</script>
