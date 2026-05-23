import { createRouter, createWebHistory } from 'vue-router'
import { useLoading } from '@/stores/loadingState'
import { useBasicAuth } from '@/Middlewares/BasicAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/Views/Login.vue'),
      meta: {noAuth: true}
    },
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/Views/Dashboard.vue'),
    },
  ],
})

router.beforeEach(async (to, from) => {
  useLoading().start();
  return await useBasicAuth(to, from);
})

router.afterEach(() => {
  useLoading().stop();
})

export default router;
