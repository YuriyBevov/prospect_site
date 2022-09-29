import { NavMenu } from '../classes/NavMenu';

const nav = document.querySelector('.nav');
const burger = document.querySelector('.burger');

if(nav && burger) {
  new NavMenu(nav, burger);
}
