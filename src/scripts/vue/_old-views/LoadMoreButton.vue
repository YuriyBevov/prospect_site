<template>
  <button type="button" class="main-btn portfolio__more" v-on:click="$emit('load-more')">
    <span>Показать еще</span>
    <svg width="24" height="24">
      <use :xlink:href="`./assets/sprite.svg#icon-btn-arrow`"></use>
    </svg>
  </button>
</template>

<script>

  export default {
    name: 'load-more-button-component',
    methods: {
      clickHandler: () => {
        console.log('click');
        this.$emit('load');
      }
    }
  }

</script>
