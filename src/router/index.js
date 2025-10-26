import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../pages/Dashboard.vue'),
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: () => import('../pages/Inventory.vue'),
    },
    {
      path: '/point-of-sale',
      name: 'point-of-sale',
      component: () => import('../pages/PointOfSale.vue'),
    },
    {
      path: '/reports',
      name: 'reports',
      component: () => import('../pages/ReportsDashboard.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../pages/Settings.vue'),
    },
    {
      path: '/help-center',
      name: 'help-center',
      component: () => import('../pages/HelpCenter.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../pages/errors/404-NotFound.vue')
    },
  ]
});

export default router
