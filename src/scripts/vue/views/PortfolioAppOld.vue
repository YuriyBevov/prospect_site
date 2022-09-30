<template>
    <div>
      <div class="portfolio__header">
        <filter-component :controls="this.controls" @update="update"></filter-component>
        <tag-list-component :tags="this.tags" @update="update"></tag-list-component>
      </div>
      <portfolio-list-component :list="items"></portfolio-list-component>
      <load-more-button-component></load-more-button-component>
    </div>
</template>

<script>
  import * as data from "./data/PortfolioData"
  import Filter from "./views/Filter.vue"
  import TagList from "./views/TagList.vue"
  import PortfolioList from "./views/PortfolioList.vue"
  import LoadMoreButton from "./views/LoadMoreButton.vue"

  export default {
    components: {
      'filter-component': Filter,
      'tag-list-component': TagList,
      'portfolio-list-component': PortfolioList,
      'load-more-button-component': LoadMoreButton,
    },

    data() {
      return {
        _initial: [],
        items: [],
        tags: [],
        controls: []
      }
    },

    methods: {
      fillPortfolioItems() {

      },

      initData(except = null) {
        let temp = [];

        // инит тегов
        this.items.forEach(item => {
          if(item.type === 'image') {
            temp.push('Фото')
          } else if (item.type === 'video') {
            temp.push('Видео')
          } else {
            temp.push('Другое')
          }

          temp = [...temp, ...item.tags];
        });

        this.tags = [...new Set(temp)];

        // инит чекбоксов
        temp = [];

        this.tags.forEach(tag => {
          temp.push({
            checked: true,
            tag: tag
          });
        });

        this.controls = [...temp];
      },

      updateActiveTagList(except) {
        if(this.tags.length > 1) {
          this.tags = this.tags.filter(item => item !== except);
        }
      },

      updateTagControls(except) {
        let index;
        let tag;

        this.controls.map((ctrl,i) => {
          if(ctrl.tag === except) {
            index = i;
            tag = ctrl.tag;
          }
        })

        if(this.controls[index].checked) {
          if(this.tags.length > 1) {
            this.controls[index].checked = false;
            this.tags = this.tags.filter(item => item !== except);
          }
        } else {
          this.controls[index].checked = true;
          this.tags.push(tag);
        }
      },

      update(except) {
        this.updateActiveTagList(except);
        this.updateTagControls(except);
      }
    },

    mounted() {
      this.count = this.step;
      this._initial = [...data.PortfolioItems];
      this.items = [...this._initial];

      this.initData();
    },

  }
</script>
