<template>
  <ul class="portfolio__list">
    <li class="portfolio__list-item"
      v-for="(item, index) in items"
      :key="index"
    >

      <a href="#" aria-label="Посмотреть">
        <picture v-if="item.type === 'image'">
          <source :srcset="`../assets/img/${item.source}@1x.webp 1x, ../assets/img/${item.source}@2x.webp 2x`" type="image/webp" />
          <img :src="`../assets/img/${item.source}@1x.jpg`" :srcset="`../assets/img/${item.source}@2x.jpg 2x`" :alt= item.description width="789" height="589"/>
        </picture>

        <video muted loop autoplay v-if="item.type === 'video'">
          <source :src="`../assets/video/${item.source}.mp4`" type='video/mp4'>
          <source :src="`../assets/video/${item.source}.webm`" type='video/webm'>
        </video>
      </a>

    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      items: Array,
    },

    methods: {

    }
  }
</script>
