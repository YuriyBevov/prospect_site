import Vue from 'vue'
import portfolio from './views/portfolio-view.vue'

Vue.config.productionTip = false

window.addEventListener('load', () => {
  new Vue({
    render: h => h(portfolio)
  }).$mount('#portfolio-app')
}, false);
