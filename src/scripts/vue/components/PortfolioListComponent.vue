<template>
  <ul class="portfolio__list">
    <li class="portfolio__list-item"
      v-for="(item, index) in items"
      :key="index"
    >
      <a :href="`./assets/img/${item.source}@1x.jpg`" :data-index="index" aria-label="Посмотреть" data-fancybox="gallery" v-if="item.type === 'image'">
        <picture>
          <source :srcset="`./assets/img/${item.source}@1x.webp 1x, ./assets/img/${item.source}@2x.webp 2x`" type="image/webp" />
          <img :src="`./assets/img/${item.source}@1x.jpg`" :srcset="`./assets/img/${item.source}@2x.jpg 2x`" :alt= item.description width="787" height="589"/>
        </picture>
      </a>

      <a :href="`./assets/video/${item.source}.mp4`" :data-index="index" aria-label="Посмотреть" data-fancybox="gallery" v-if="item.type === 'video'">
        <video muted loop autoplay>
          <source :src="`./assets/video/${item.source}.mp4`" type='video/mp4'>
          <source :src="`./assets/video/${item.source}.webm`" type='video/webm'>
        </video>

        <img :src="`./assets/img/hero-logo.svg`" alt="Заглушка" width="787" height="589" class="visually-hidden"/>
      </a>
    </li>
  </ul>
</template>

<script>
  import { Fancybox } from "@fancyapps/ui";
  export default {
    props: {
      items: Array
    },

    methods: {
      initFancy() {

        Fancybox.bind('[data-fancybox="gallery"]', {
          Toolbar: {
            display: [
              "counter",
              "close",
            ],
          },

          l10n: {
            CLOSE: "Закрыть",
            NEXT: "Вперед",
            PREV: "Назад",
            MODAL: "Вы можете закрыть это модальное окно, с помощью кнопки ESC",
            ERROR: "Что то пошло не так... Попробуйте снова.",
            IMAGE_ERROR: "Изображение не найдено",
            ELEMENT_NOT_FOUND: "HTML-элемент не найден",
          }
        });
      }
    },

    watch: {
      items: function() {
        this.initFancy();
      }
    }
  }
</script>
