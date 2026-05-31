import { createRouter, createWebHistory } from 'vue-router'
import { useLoading } from '@/stores/loadingState'
import type { Exception } from '@/Utilities/helpers'

// middlewares
import Authentication from '@/Middlewares/Authentication';

// Middleware groups
const middlewares: Record<string, Function> = {
  auth: await Authentication
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
      meta: {
        middlewares: ['auth']
      }
    },

    // user
    {
      path: '/user',
      name: 'user.list',
      component: () => import('@/Views/User/Index.vue'),
      meta: {
        middlewares: ['auth']
      }
    },
    {
      path: '/user/create',
      name: 'user.create',
      component: () => import('@/Views/User/Form.vue'),
      meta: {
        middlewares: ['auth']
      }
    },
    {
      path: '/profile/edit',
      name: 'profile.edit',
      component: () => import('@/Views/User/Form.vue'),
      meta: {
        middlewares: ['auth']
      }
    },

    // product
    {
      path: '/product',
      name: 'product.list',
      component: () => import('@/Views/Product/Index.vue'),
      meta: {
        middlewares: ['auth']
      }
    },
    {
      path: '/product/create',
      name: 'product.create',
      component: () => import('@/Views/Product/Form.vue'),
      meta: {
        middlewares: ['auth']
      }
    },
    {
      path: '/product/:id/edit',
      name: 'product.edit',
      component: () => import('@/Views/Product/Form.vue'),
      meta: {
        middlewares: ['auth']
      }
    },
    {
      path: '/product/:id',
      name: 'product.detail',
      component: () => import('@/Views/Product/Detail.vue'),
      meta: {
        middlewares: ['auth']
      }
    },
  ],
})

router.beforeEach(async (to, from) => {
  useLoading().start();

  for (const alias of (to.meta.middlewares as string[] | undefined) ?? []) {
    try {
      await middlewares[alias]?.call(this);
    } catch (error) {
      const err = error as Exception | undefined;

      if (err?.code === 401) {
        return { name: "login" };
      }

      break;
    }
  }
});

router.afterEach(() => {
  useLoading().stop();
});

export default router;
