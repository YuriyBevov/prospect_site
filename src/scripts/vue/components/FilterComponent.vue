<template>
  <div class="filter">

    <button
      type="button"
      class="filter-opener"
      :class="isOpenerActive ? 'active' : null"
      @click.stop="openFilter"
    >
      <span>Тэги:</span>
      <svg width="14" height="7">
        <use :xlink:href="`./assets/sprite.svg#icon-arrow-down`"></use>
      </svg>
    </button>

    <div class="filter-container" v-show="isOpenerActive">

      <div class="filter-control">
        <input
          type="checkbox"
          id="all"
          :checked="this.tagList.length === this.checkedList.length ? true : false"
          @click="selectAll"
          v-model="isChecked"
        />
        <label for="all" tabindex="0">Все</label>
      </div>

      <div
        class="filter-control"
        v-for="(tag, i) in this.tagList"
        :key="'tag_' + (i+1)"
      >
        <input
          type="checkbox"

          :id="'tag_' + (i+1)"
          :data-tag="tag"

          :value="tag"
          v-model="checkedList"
          :disabled="checkedList[0] === tag && checkedList.length === 1 ? true : false"
          @change="emitCheckedList"
        />
        <label :for="'tag_' + (i+1)" tabindex="0">{{tag}}</label>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

    props: {
      tags: Array,
      checked: Array
    },

    data() {
      return {
        isOpenerActive: false,
        checkedList: [],
        tagList: [],
        isChecked: true,
      }
    },

    methods: {
      init() {
        this.tagList = this.$props.tags;
        this.checkedList= this.$props.checked;

        this.emitCheckedList();
      },

      emitCheckedList() {
        this.$emit('tags', this.checkedList);
      },

      selectAll() {
        this.checkedList = this.tagList;
        console.log(this.isChecked)
        this.emitCheckedList();
      },

      openFilter() {
        const FilterContainer = document.querySelector('.filter-container');
        this.isOpenerActive = !this.isOpenerActive;

        if(this.isOpenerActive) {
          document.addEventListener('click', this.onOverlayClickHandler);
          document.addEventListener('keydown', this.onEscPressHandler);
        } else {
          document.removeEventListener('click', this.onOverlayClickHandler);
          document.removeEventListener('keydown', this.onEscPressHandler);
        }
      },

      onOverlayClickHandler(evt) {
        const FilterContainer = document.querySelector('.filter-container');

        if(!FilterContainer.contains(evt.target)) {
          this.isOpenerActive = false;
          document.removeEventListener('click', this.onOverlayClickHandler);
          document.removeEventListener('keydown', this.onEscPressHandler);
        }
      },

      onEscPressHandler(evt) {
        if(evt.key === 'Esc' || evt.key === 'Escape') {
          this.isOpenerActive = false;
          document.removeEventListener('click', this.onOverlayClickHandler);
          document.removeEventListener('keydown', this.onEscPressHandler);
        }
      }
    },

    watch: {
      tags: function() {
        this.init();
      },

      checked: function() {
        this.checkedList = this.$props.checked;
      }
    }
  }

</script>
