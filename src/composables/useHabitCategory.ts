import { useHabitStore } from '@/stores/habitStore'

export function useHabitCategory(): {
  getCategoryIcon: (name: string) => string
} {
  const habitStore = useHabitStore()

  const getCategoryIcon = (name: string): string => {
    const category = habitStore.categories.find((c) => c.name === name)
    return category?.icon || '❓'
  }

  return { getCategoryIcon }
}
