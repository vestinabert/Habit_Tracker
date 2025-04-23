import { useHabitStore } from '@/stores/habitStore'
import { getTodayString } from '@/utils/dateUtils'

export function useHabitStreak() {
  const habitStore = useHabitStore()

  const calculateStreak = (habitId: number, currentDate: string): number => {
    let streak = 0
    const todayStr = getTodayString()
    const cursor = new Date(currentDate)

    if (currentDate > todayStr) return 0

    const currentDateStr = cursor.toISOString().split('T')[0]
    const isCompletedToday =
      habitStore.habitRecords?.[currentDateStr]?.[habitId] === true

    if (!isCompletedToday) {
      cursor.setDate(cursor.getDate() - 1)
    }

    while (true) {
      const dateStr = cursor.toISOString().split('T')[0]
      const completed = habitStore.habitRecords?.[dateStr]?.[habitId] === true

      if (completed) {
        streak++
        cursor.setDate(cursor.getDate() - 1)
      } else {
        break
      }
    }

    return streak
  }

  return {
    calculateStreak,
  }
}
