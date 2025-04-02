import { ref, watch, computed } from 'vue'
import { useHabitStore } from '../../stores/habitStore'

export function useHabitCompletion(habit, currentDate) {
  const habitStore = useHabitStore()
  const today = new Date().toISOString().split('T')[0]
  const isFuture = computed(() => currentDate > today)

  const isCompleted = computed(() => {
    const records = habitStore.getRecordsByDate(currentDate)
    return records[habit.id] || false
  })

  const localCompleted = ref(isCompleted.value)

  watch(isCompleted, (newVal) => {
    localCompleted.value = newVal
  })

  const toggleCompletion = async () => {
    if (isFuture.value) return
    habitStore.toggleHabitCompletion(currentDate, habit.id)
  }

  return {
    localCompleted,
    isFuture,
    toggleCompletion,
  }
}
