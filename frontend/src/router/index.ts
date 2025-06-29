import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/add-product', // your desired route
      name: 'add-product',
      component: () => import('../views/ProductForm.vue'), // lazy-loaded
      meta: { requiresAuth: true },
    },
    {
      path: '/view-product', // your desired route
      name: 'view-product',
      component: () => import('../views/ProductList.vue'), // lazy-loaded
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    }
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const isTokenValid = token && token !== 'undefined' && token !== 'expired';

  if (to.meta.requiresAuth && !isTokenValid) {
    next({ path: '/login' });
  } else {
    next();
  }
});


export default router
