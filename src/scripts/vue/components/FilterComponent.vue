<template>
  <div class="filter">
    <button
      type="button"
      class="filter-opener"
      @click.stop="openFilter"
    >
      <span>Фильтры</span>
      <svg width="24" height="24">
        <use :xlink:href="`./assets/sprite.svg#icon-filter`"></use>
      </svg>
      <small v-if="isFilterCounterActive">{{this.checkedList.length}}</small>
    </button>

    <div class="filter-container" v-show="isOpenerActive">

      <div class="filter-control">
        <input
          type="checkbox"
          id="all"
          v-model="isAllBtnChecked"
          @click="selectAll"
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
        isAllBtnChecked: true,
        isFilterCounterActive: false
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
        !this.isAllBtnChecked ?
        this.checkedList = this.tagList :
        this.checkedList = [];

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

        if(this.tagList.length === this.checkedList.length) {
          this.isAllBtnChecked = true;
          this.isFilterCounterActive = false;
        } else {
          this.isAllBtnChecked = false;
          this.isFilterCounterActive = true;
        }
      }
    }
  }

</script>
