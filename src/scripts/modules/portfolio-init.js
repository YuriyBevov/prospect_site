
import { Portfolio } from "../classes/Portfolio";

const container = document.querySelector('.portfolio__list');

if(container) {
  new Portfolio(container);
}
