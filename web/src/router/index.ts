import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from '@/views/Index.vue';
import Codes from '@/views/Codes.vue';
import Systems from '@/views/Systems.vue';
import Contacts from '@/views/Contacts.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Index
    },
    {
        path: '/index',
        component: Index
    },
    {
        path: '/systems',
        component: Systems
    },
    {
        path: '/contacts',
        component: Contacts
    },
    {
        path: '/codes/:code',
        component: Codes
    }
];

const router = new VueRouter({
    routes
});

export default router;
