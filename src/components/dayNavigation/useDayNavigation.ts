import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { ComputedRef } from 'vue'
import type { Day } from '@/types'
import {
  getTodayString,
  formatDate,
  cloneDate,
  isFutureDate,
  formatDayLabel,
} from '@/utils/dateUtils'

export function useDayNavigation(): {
  today: string
  currentDate: ComputedRef<string>
  weekDays: ComputedRef<Day[]>
  navigateToDate: (date: string) => void
  goToPreviousDay: () => void
  goToNextDay: () => void
  formatDate: (dateStr: string) => string
  isFutureDate: (dateStr: string) => boolean
} {
  const router = useRouter()
  const route = useRoute()

  const today: string = getTodayString()

  const currentDate = computed<string>(() => {
    const param = route.params.date
    return typeof param === 'string' ? param : today
  })

  function navigateToDate(date: string): void {
    if (!isFutureDate(date)) {
      router.push(`/day/${date}`)
    }
  }

  function goToPreviousDay(): void {
    const date = new Date(currentDate.value)
    date.setDate(date.getDate() - 1)
    const prevDate = date.toISOString().split('T')[0]
    router.push(`/day/${prevDate}`)
  }

  function goToNextDay(): void {
    const date = new Date(currentDate.value)
    date.setDate(date.getDate() + 1)
    const newDate = date.toISOString().split('T')[0]
    if (!isFutureDate(newDate)) {
      router.push(`/day/${newDate}`)
    }
  }

  const weekDays = computed<Day[]>(() => {
    const days: Day[] = []
    const baseDate = new Date(currentDate.value)
    const selectedDate = cloneDate(baseDate)

    for (let i = -2; i <= 4; i++) {
      const date = cloneDate(selectedDate)
      date.setDate(date.getDate() + i)
      const formatted = date.toISOString().split('T')[0]

      days.push({
        date: formatted,
        label: formatDayLabel(formatted),
        isActive: formatted === currentDate.value,
        isToday: formatted === today,
        isFuture: isFutureDate(formatted),
      })
    }

    return days
  })

  return {
    today,
    currentDate,
    weekDays,
    navigateToDate,
    goToPreviousDay,
    goToNextDay,
    formatDate,
    isFutureDate,
  }
}
