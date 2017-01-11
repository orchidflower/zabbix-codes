import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import AppHeader from './header.vue'
import AppFooter from './footer.vue'
import Index from './index.vue'
import Codes from './codes.vue'
import App from './app.vue'
import System from './system.vue'
import Contact from './contact.vue'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)

Vue.component('AppHeader', AppHeader);
Vue.component('AppFooter', AppFooter);


const router = new VueRouter({
  routes: [
    {
      path: '/', 
      component: App,   // App View
      // components: {AppHeader: AppHeader, AppFooter: AppFooter},
      children: [
        {path: '', component: Index},
        {path: '/index', component: Index},
        {path: '/codes/:code', component: Codes},
        {path: '/system', component: System},
        {path: '/contact', component: Contact}
      ]
    }
  ]
});

// Root View
var template = `
  <div id="app">
    <app-header/>
    <router-view></router-view>
    <app-footer/>
  </div>`;

const app = new Vue({
  router: router,
  // el: '#app',
  // template: '<App/>',
  template: template,
  // render: h => h(App),
  // components: {App}
  // components: {Codes, App, AppHeader, AppFooter}
}).$mount("#app");

// router.replace('/index');