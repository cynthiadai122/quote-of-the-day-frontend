// src/router/index.js
import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/HomePage.vue';
import About from '@/components/AboutPage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
  ],
});
