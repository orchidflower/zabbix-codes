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
        {path: '/codes/:code', component: Codes}
      ]
    }
  ]
});

// Root View
var template = `
  <div id="app">
    <app-header/>
    <p>
      <router-link to="/index">Index</router-link>
      <router-link to="/codes/SYS101">Codes SYS101</router-link>
      <router-link to="/codes/SYS102">Codes SYS102</router-link>
    </p>
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