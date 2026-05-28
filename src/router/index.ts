import { createRouter, createWebHistory } from 'vue-router'
import { useLoading } from '@/stores/loadingState'
import type { Exception } from '@/Utilities/helpers'
import Authentication from '@/Middlewares/Authentication';

// Middleware groups
const middlewares = {
  auth: await Authentication,
  log: () => console.log("middleware success")
};

// Route List
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/Views/Login.vue'),
    },
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/Views/Dashboard.vue'),
      meta: {auth: true, log: true}
    },

    // user
    {
      path: '/user',
      name: 'user.list',
      component: () => import('@/Views/User/Index.vue'),
      meta: {auth: true}
    },
    {
      path: '/user/create',
      name: 'user.create',
      component: () => import('@/Views/User/Form.vue'),
      meta: {auth: true}
    },
    {
      path: '/profile/:username/edit',
      name: 'profile.edit',
      component: () => import('@/Views/User/Form.vue'),
      meta: {auth: true}
    },

    // product
    {
      path: '/product',
      name: 'product.list',
      component: () => import('@/Views/Product/Index.vue'),
      meta: {auth: true}
    },
    {
      path: '/product/create',
      name: 'product.create',
      component: () => import('@/Views/Product/Form.vue'),
      meta: {auth: true}
    },
    {
      path: '/product/:id/edit',
      name: 'product.edit',
      component: () => import('@/Views/Product/Form.vue'),
      meta: {auth: true}
    },
    {
      path: '/product/:id',
      name: 'product.detail',
      component: () => import('@/Views/Product/Detail.vue'),
      meta: {auth: true}
    },
  ],
})

router.beforeEach(async (to, from) => {
  useLoading().start();

  for (const [alias, module] of Object.entries(middlewares)) {
    try {
      if (to.meta[alias]) {
        await module();
      }
    } catch(error) {
      const err = error as Exception;
      if (err.code) return { name: "login" }
      break;
    }
  }
})

router.afterEach(() => {
  useLoading().stop();
})

export default router;
