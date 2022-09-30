<template>
  <div class="filter">
    <button
      type="button"
      class="filter-opener"
      :class="opened ? 'active' : null"
      @click="opened = !opened"
    >
      <span>Тэги:</span>
      <svg width="14" height="7">
        <use :xlink:href="`../assets/sprite.svg#icon-arrow-down`"></use>
      </svg>
    </button>

    <div class="filter-container" v-if="opened">
      <div class="filter-control">
        <input
          type="checkbox"
          id="all"
          :checked="this.isChecked ? true : false"
          :disabled="this.isDisabled ? true : false"
        >
        <label for="all">Все{{isChecked}}</label>
      </div>

      <div class="filter-control"
        v-for="(ctrl, i) in controls"
        :key="'ctrl_' + (i+1)"
      >
        <input
          type="checkbox"
          :id="'ctrl_' + (i+1)"
          :checked="ctrl.checked ? true : false"
          :data-tag="ctrl.tag"
          @change="update"
        >
        <label :for="'ctrl_' + (i+1)">{{ctrl.tag}}</label>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

    props: {
      controls: Array
    },

    data() {
      return {
        opened: false,
        isChecked: true,
        isDisabled: true
      }
    },

    methods: {
      update(evt) {

        this.$emit('update', evt.target.dataset.tag);
      }
    },

    watch: {
      controls: function(ctrls) {
        console.log('WATCH FILTER')
        ctrls.map(ctrl => {
          if(ctrl.checked === false) {
            this.isChecked = false;
          }
        })
      }
    }
  }

</script>
