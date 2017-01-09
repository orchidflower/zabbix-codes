import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import Codes from './codes.vue'
import App from './app.vue'
import AppHeader from './header.vue'
import AppFooter from './footer.vue'
import Index from './index.vue'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
  routes: [
    {path: '/', component: App, components: {header: AppHeader, footer: AppFooter}},
    {path: '/index', component: Index},
    {path: '/codes/:code', component: Codes}
  ]
});

Vue.component('AppHeader', AppHeader);
Vue.component('AppFooter', AppFooter);

var app = new Vue({
  router: router,
  el: '#app',
  template: '<App/>',
  // render: h => h(App),
  components: {App}
  // components: {Codes, App, AppHeader, AppFooter}
}); //.mount("#app");

// router.replace('/index');