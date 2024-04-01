import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/editor'
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import('../views/editor/index.vue')
    },
    {
      path: '/display',
      name: 'display',
      component: () => import('../views/display/index.vue')
    }
  ]
})

export default router
