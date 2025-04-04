import { useHabitStore } from '../stores/habitStore'

export function useHabitCategory() {
  const habitStore = useHabitStore()

  const getCategoryIcon = (name) => {
    const category = habitStore.categories.find((c) => c.name === name)
    return category?.icon || '?'
  }

  return { getCategoryIcon }
}
