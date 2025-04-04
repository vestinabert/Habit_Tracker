import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useDayNavigation() {
  const router = useRouter()
  const route = useRoute()

  const today = new Date().toISOString().split('T')[0]

  const currentDate = computed(() => route.params.date || today)

  function cloneDate(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
  }

  function isFutureDate(dateStr) {
    return dateStr > today
  }

  const navigateToDate = (date) => {
    if (!isFutureDate(date)) {
      router.push(`/day/${date}`)
    }
  }

  const goToPreviousDay = () => {
    const date = new Date(currentDate.value)
    date.setDate(date.getDate() - 1)
    router.push(`/day/${date.toISOString().split('T')[0]}`)
  }

  const goToNextDay = () => {
    const date = new Date(currentDate.value)
    date.setDate(date.getDate() + 1)
    const newDate = date.toISOString().split('T')[0]
    if (!isFutureDate(newDate)) {
      router.push(`/day/${newDate}`)
    }
  }

  const weekDays = computed(() => {
    const days = []
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

  function formatDayLabel(dateStr) {
    const date = new Date(dateStr)
    const options = { weekday: 'short' }
    return {
      number: dateStr.split('-')[2],
      name: date.toLocaleDateString(undefined, options),
    }
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
  }

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
