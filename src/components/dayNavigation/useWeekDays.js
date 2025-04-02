import { computed } from 'vue'
import { formatDayLabel } from './useDateFormatter'

function cloneDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function useWeekDays(currentDate, today) {
  const weekDays = computed(() => {
    const days = []
    const baseDate = new Date(currentDate.value)
    const selectedDate = cloneDate(baseDate) // clean clone

    for (let i = -2; i <= 4; i++) {
      const date = cloneDate(selectedDate)
      date.setDate(date.getDate() + i)

      const formatted = date.toISOString().split('T')[0]

      days.push({
        date: formatted,
        label: formatDayLabel(formatted, today),
        isActive: formatted === currentDate.value,
        isToday: formatted === today,
        isFuture: formatted > today,
      })
    }

    return days
  })

  return { weekDays }
}
