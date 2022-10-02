<template>
  <button
    class="portfolio__more main-btn"
    type="button"
    :disabled="this.$props.disabled ? true : false"
    @click="showMore"
  >
    <span>Больше работ</span>
    <svg width="24" height="24">
      <use :xlink:href="`./assets/sprite.svg#icon-btn-arrow`"></use>
    </svg>
  </button>
</template>

<script>
  export default {
    props: {
      disabled: Boolean
    },

    methods: {
      showMore() {
        this.$emit('load');
      }
    }
  }
</script>
