import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

import PictureDetection from '@/views/pictureDetection/Main.vue';

Vue.use(Router);

export const routes = [{
  path: '/',
  name: 'home',
  component: Home,
  redirect: '/picture',
  children: [
    {
      path: '/picture',
      name: 'picture',
      component: PictureDetection,
      meta: {
        name: '视频分析',
        icon: 'el-icon-setting',
      },
    },
  ]
}];

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
