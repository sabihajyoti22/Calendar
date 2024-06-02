import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/Auth.vue'),
  },
  {
    path: '/testVuetify',
    name: 'testVuetify',
    component: () => import('../views/TestVuetify.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'errorPage',
    component: () => import('../views/404.vue'),
  }
]

const routerHistory = createWebHistory()
const router = new (createRouter as any)({
  routes,
  history: routerHistory,
  scrollBehavior(to: any, from: any, savedPosition: any) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router