import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home.vue';
import Index from '@/views/Index.vue';
import Codes from '@/views/Codes.vue';
import System from '@/views/Systems.vue';
import Contact from '@/views/Contacts.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Home, // App View
        // components: {AppHeader: AppHeader, AppFooter: AppFooter},
        children: [
            { path: '/', component: Index },
            { path: '/index', component: Index },
            { path: '/codes/:code', component: Codes },
            { path: '/systems', component: System },
            { path: '/contacts', component: Contact }
        ]
    }
];

const router = new VueRouter({
    routes
});

export default router;
