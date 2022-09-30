import {gsap} from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export class Portfolio {
  #container = null;
  #items = null;
  #loadBtn = null;
  #step = 2;
  #current = this.#step;

  constructor(container) {
    this.#container = container;
    this.#items = this.#container.querySelectorAll('li');
    this.#loadBtn = document.querySelector('.load-more-btn');

    this.#init();
  }

  #init() {
    // отрисовка эл-в
    this.#fillPortfolioList();
    // вешаем обработчик на кнопку с проверкой нужна ли она
    if(this.#items.length > this.#current + this.#step) {
      this.#loadBtn.addEventListener('click', this.#onClickLoadMoreItems);
    } else {
      this.#loadMoreBtnDisabling();
    }
    // вешаем обработчик на фильтр
    //this.#filterInit();
    // вешаем обработчик на сортировку по тэгам

  }

  #fillPortfolioList() {
    this.#items.forEach((item,index) => {
      if(index > this.#current - 1) {
        item.classList.add('hidden');
      } else {
        item.classList.contains('hidden') ?
        item.classList.remove('hidden') : null;
      }
    });
  }

  #onClickLoadMoreItems = () => {
    if(this.#items.length > this.#current + this.#step) {
      this.#current += this.#step;
    } else {
      this.#current = this.#items.length;
      this.#loadMoreBtnDisabling();
    }

    this.#fillPortfolioList();
    ScrollTrigger.refresh();
  }

  #loadMoreBtnDisabling = () => {
    this.#loadBtn.setAttribute('disabled', true);
  }
}
