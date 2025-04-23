import { createRouter, createWebHistory, type Router } from 'vue-router'
import { setupAuthGuards } from './authGuard'

// import HomeView from '../views/HomeView.vue'

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/LandingView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/AuthView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

setupAuthGuards(router)
export default router
