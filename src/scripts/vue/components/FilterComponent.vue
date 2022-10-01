<template>
  <div class="filter">

    <button
      type="button"
      class="filter-opener"
      :class="isOpenerActive ? 'active' : null"
      @click="isOpenerActive = !isOpenerActive"
    >
      <span>Тэги:</span>
      <svg width="14" height="7">
        <use :xlink:href="`../assets/sprite.svg#icon-arrow-down`"></use>
      </svg>
    </button>

    <div class="filter-container" v-if="isOpenerActive">

      <div class="filter-control">
        <input
          type="checkbox"
          id="all"
          :checked="this.tagList.length === this.checkedList.length ? true : false"
          :disabled="this.tagList.length === this.checkedList.length ? true : false"
          @click="selectAll"
        />
        <label for="all">Все</label>
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
        <label :for="'tag_' + (i+1)">{{tag}}</label>
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

        this.emitCheckedList();
      }

      /*disable() {
        console.log(this.checkedList, this.checkedList.length)
        if(this.checkedList.length === this.tagList.length) {
          this.isAllBtnDisabled = true
        } else if(this.checkedList.length === 1) {
          this.$emit('disable');
        }
      }*/
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
