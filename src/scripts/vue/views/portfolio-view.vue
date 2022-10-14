<template>
  <div style="position: relative;">
    <!--<div class="portfolio__header">-->
      <filter-component :tags="this.tags" :checked="this.checked" @tags="updateCheckedList"></filter-component>
      <!--<tag-list-component :tags="this.checked" @remove="removeTag"></tag-list-component>-->
    <!--</div>-->
    <portfolio-list-component :items="this.items" :initial="this.initialArray"></portfolio-list-component>
    <div class="portfolio__footer">
      <load-more-button-component @load="loadMoreItems" :disabled="this.isLoadMoreButtonDisabled"></load-more-button-component>
      <collapse-button-component :state="this.isCollapseButtonDisabled" @collapse="collapsePortfolioList"></collapse-button-component>
    </div>
  </div>
</template>

<script>
  import {gsap} from 'gsap';
  import json from "../../../assets/content/portfolio.json";
  import FilterComponent from "../components/FilterComponent.vue";
  //import TagListComponent from "../components/TagListComponent.vue";
  import PortfolioListComponent from "../components/PortfolioListComponent.vue";
  import LoadMoreButtonComponent from "../components/LoadMoreButtonComponent.vue";
  import CollapseButtonComponent from "../components/CollapseButtonComponent.vue";

  export default {
    components: {
      'filter-component': FilterComponent,
      //'tag-list-component': TagListComponent,
      'portfolio-list-component': PortfolioListComponent,
      'load-more-button-component': LoadMoreButtonComponent,
      'collapse-button-component': CollapseButtonComponent,
    },

    data() {
      return {
        initialArray: [],

        items: [],
        tags: [],
        checked: [],

        STEP: 4,
        count: 0,
        isLoadMoreButtonDisabled: false,
        isCollapseButtonDisabled: false,
      }
    },

    methods: {
      init() {
        let tags = [];

        this.initialArray.forEach(item => {
          tags = [...tags, ...item.tags];
        });

        this.tags = [...new Set(tags)];
        this.checked = this.tags;
        this.count += this.STEP;

        this.fillPortfolioItems();

        setTimeout(() => {
          this.hideLoader();
        }, 1500);
      },

      fillPortfolioItems() {
        this.items = [];
        let currentCount = 0;

        this.initialArray.forEach(item => {
          let isExist = item.tags.filter(it => this.checked.indexOf(it) !== -1);

          if(currentCount < this.count && isExist.length) {
            this.items.push(item)
            currentCount++;
          }
        })

        this.setLoadMoreButtonStatus();
        this.setCollapseButtonStatus();
      },

      hideLoader() {
        const tl = gsap.timeline();

        tl
          .to('.loader', {
            display: 'none',
            duration: 0
          })
          .fromTo('body', {opacity: 0}, {
            opacity: 1,
            ease: 'linear',
            duration: .5,
            delay: 0.5
          })
          .to('.page-overlay', {
            display: 'none',
            duration: 0
          }, "-=400")
      },

      setLoadMoreButtonStatus() {
        this.items.length < this.count || this.initialArray.length === this.items.length ?
        this.isLoadMoreButtonDisabled = true :
        this.isLoadMoreButtonDisabled = false
      },

      setCollapseButtonStatus() {
        this.count > this.STEP ?
        this.isCollapseButtonDisabled = true :
        this.isCollapseButtonDisabled = false;
      },

      collapsePortfolioList() {
        this.count = this.STEP;
        this.fillPortfolioItems();
      },

      loadMoreItems() {
        if(this.initialArray.length > (this.count + this.STEP) ) {
          this.count += this.STEP;
        } else {
          this.count = this.initialArray.length;
        }

        this.fillPortfolioItems();
      },

      updateCheckedList(list) {
        this.count = this.STEP;
        this.checked = list;
        this.fillPortfolioItems();
      },

      removeTag(except) {
        this.count = this.STEP;
        this.checked = this.checked.filter(item => item !== except);
        this.fillPortfolioItems();
      },
    },

    mounted() {
      this.initialArray = [...json.data];
      this.init();
    }
  }
</script>
