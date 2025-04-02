import { useRouter } from 'vue-router'
import { useCurrentDate } from './useCurrentDate'
import { formatDate } from './useDateFormatter'
import { useWeekDays } from './useWeekDays'

export function useDayNavigation() {
  const router = useRouter()
  const { currentDate, today, isFutureDate } = useCurrentDate()
  const { weekDays } = useWeekDays(currentDate, today)
  const navigateToDate = (date) => {
    if (!isFutureDate.value) {
      router.push(`/day/${date}`)
    }
  }

  const goToPreviousDay = () => {
    const date = new Date(currentDate.value)
    date.setDate(date.getDate() - 1)
    router.push(`/day/${date.toISOString().split('T')[0]}`)
  }

  const goToNextDay = () => {
    if (!isFutureDate.value) {
      const date = new Date(currentDate.value)
      date.setDate(date.getDate() + 1)
      const newDate = date.toISOString().split('T')[0]

      router.push(`/day/${newDate}`)
    }
  }

  return {
    currentDate,
    weekDays,
    formatDate,
    goToNextDay,
    goToPreviousDay,
    navigateToDate,
  }
}
