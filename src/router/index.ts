import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type NavigationGuardNext,
} from 'vue-router'
import HomeView from '@/views/HomeView.vue'

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
      component: () => import('@/views/AddHabit.vue'),
    },
    {
      path: '/edit-habit',
      name: 'EditHabitList',
      component: () => import('@/views/EditHabitList.vue'),
    },
    {
      path: '/edit-habit/:id',
      name: 'EditHabit',
      component: () => import('@/views/EditHabit.vue'),
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('@/views/SettingsView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

router.beforeEach(
  (
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    if (to.name === 'DayView') {
      const today = new Date().toISOString().split('T')[0]
      const requestedDate =
        typeof to.params.date === 'string' ? to.params.date : ''

      if (requestedDate > today) {
        return next(`/day/${today}`)
      }
    }

    next()
  }
)

export default router
