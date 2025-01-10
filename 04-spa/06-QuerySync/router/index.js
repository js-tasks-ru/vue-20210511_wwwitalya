import Vue from 'vue';
import VueRouter from 'vue-router';
import QuerySync from '../views/QuerySync';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  base: '/04-spa/06-QuerySync',
  routes: [
    {
      path: '/',
      component: QuerySync,
    },
  ],
});
