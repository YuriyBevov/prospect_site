<template>
  <div>
    <div class="portfolio__header">
      <filter-component :tags="this.tags" :checked="this.checked" @tags="updateCheckedList"></filter-component>
      <tag-list-component :tags="this.checked" @remove="removeTag"></tag-list-component>
    </div>
    <portfolio-list-component :items="this.items"></portfolio-list-component>
    <!--<load-more-button-component></load-more-button-component>-->
  </div>
</template>

<script>
  import * as data from "../data/PortfolioData"
  import FilterComponent from "../components/FilterComponent.vue"
  import TagListComponent from "../components/TagListComponent.vue"
  import PortfolioListComponent from "../components/PortfolioListComponent.vue"
  //import LoadMoreButton from "./views/LoadMoreButton.vue"

  export default {
    components: {
      'filter-component': FilterComponent,
      'tag-list-component': TagListComponent,
      'portfolio-list-component': PortfolioListComponent,
      //'load-more-button-component': LoadMoreButton,
    },

    data() {
      return {
        items: [],
        tags: [],
        checked: []
      }
    },

    methods: {
      init() {
        let tags = [];

        this.items.forEach(item => {
          if(item.type === 'image') {
            tags.push('Фото')
          } else if (item.type === 'video') {
            tags.push('Видео')
          } else {
            tags.push('Другое')
          }

          tags = [...tags, ...item.tags];
        });

        this.tags = [...new Set(tags)];
        this.checked = this.tags;
      },

      updateCheckedList(list) {
        this.checked = list;
      },

      removeTag(except) {
        this.checked = this.checked.filter(item => item !== except);
      }
    },

    mounted() {
      this.items = [...data.PortfolioItems]
      this.init();
    }
  }
</script>
