import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: `/day/${new Date().toISOString().split('T')[0]}`,
    },
    {
      path: '/day/:date',
      name: 'DayView',
      component: HomeView,
    },
    {
      path: '/add-habit',
      name: 'AddHabit',
      component: () => import('../views/AddHabit.vue'),
    },
    {
      path: '/edit-habit',
      name: 'EditHabitList',
      component: () => import('../views/EditHabitList.vue'),
    },
    {
      path: '/edit-habit/:id',
      name: 'EditHabit',
      component: () => import('../views/EditHabit.vue'),
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('../views/SettingsView.vue'),
    },
  ],
})

export default router
