/*import { Pagination } from "../classes/Pagination";

const portfolio = document.querySelector('.portfolio');

if(portfolio) {
  new Pagination({
    items: portfolio.querySelectorAll('.portfolio__list-item'),
    moreBtn: portfolio.querySelector('.portfolio__more'),
    sortItems: portfolio.querySelectorAll('.custom-select-option')
  });
}*/

import { Portfolio } from "../classes/Portfolio";

const container = document.querySelector('.portfolio');

if(container) {
  new Portfolio({
    items: container.querySelectorAll('.portfolio__list-item'),
    moreBtn: container.querySelector('.portfolio__more'),
    sortItems: container.querySelectorAll('.custom-select-option')
  })
}
