const SourceType = {
  DEFAULT: 'default-source',
  IMAGE: 'image',
  VIDEO: 'video'
}

const ProductType = {
  DEFAULT: 'default-type',
  OUT: 'out',
  IN: 'in'
}

export class Portfolio {
  #items = null;
  #moreBtn = null;
  #sortItems = null;
  #sourceType = SourceType.DEFAULT;
  #productType = ProductType.DEFAULT;
  #step = 4;
  #current = 0;


  constructor(data) {
    this.#items = data.items;
    this.#moreBtn = data.moreBtn;
    this.#sortItems = data.sortItems;
    this.#init();
  }

  #init() {
    this.#moreBtn.addEventListener('click', this.#showMore);
    this.#sortItems.forEach(item => item.addEventListener('click', this.#sort) );
    this.#fillGallery();
    console.log(this.#sourceType, this.#productType)
  }

  #fillGallery = () => {
    console.log(this.#sourceType, this.#productType)
    let count = null;

    if(this.#sourceType !== SourceType.DEFAULT || this.#productType !== ProductType.DEFAULT) {
      console.log('!==');



    }

    if(this.#current + this.#step <= this.#items.length) {
      count = this.#current + this.#step;
    } else {
      count = this.#items.length;
    }

    for(let i = this.#current; i < count; i++) {
      this.#items[i].classList.remove('hidden');
    }

    this.#current = count;
  }

  #sort = (evt) => {
    if(evt.target.dataset.value === 'image') {
      this.#sourceType = SourceType.IMAGE;
    }

    if(evt.target.dataset.value === 'video') {
      this.#sourceType = SourceType.VIDEO;
    }

    if(evt.target.dataset.value === 'default-source') {
      this.#sourceType = SourceType.DEFAULT
    }

    if(evt.target.dataset.value === 'out') {
      this.#productType = ProductType.OUT;
    }

    if(evt.target.dataset.value === 'in') {
      this.#productType = ProductType.IN;
    }

    if(evt.target.dataset.value === 'default-type') {
      this.#productType = ProductType.DEFAULT;
    }

    this.#fillGallery();
  }

  #showMore = () => {
    console.log('more');
  }
}
