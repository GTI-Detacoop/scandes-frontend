import { createRouter, createWebHistory, type Router } from 'vue-router'
import { setupAuthGuards } from './authGuard'


const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/LandingView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

setupAuthGuards(router)
export default router
