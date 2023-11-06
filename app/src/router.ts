import { createRouter, createWebHistory, RouteRecordRaw, RouterView } from 'vue-router';
import Index from '~/page/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:locale?',
    component: RouterView,
    // beforeEnter: Tr.routeMiddleware,
    children: [
      {
        path: '',
        name: 'index',
        component: Index,
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
