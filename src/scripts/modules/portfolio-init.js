
import { Portfolio } from "../classes/Portfolio";

const container = document.querySelector('.portfolio');

if(container) {
  new Portfolio({
    items: container.querySelectorAll('.portfolio__list-item'),
    moreBtn: container.querySelector('.portfolio__more'),
    sortItems: container.querySelectorAll('.custom-select-option')
  })
}
