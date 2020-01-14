import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import AppHeader from './components/Header.vue';
import AppFooter from './components/Footer.vue';

Vue.component('AppHeader', AppHeader);
Vue.component('AppFooter', AppFooter);

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
