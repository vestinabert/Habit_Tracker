import { useRouter } from 'vue-router'
import { useHabitStore } from '@/stores/habitStore'
import type { Habit, HabitFormData } from '@/types'

export function useHabitForm() {
  const router = useRouter()
  const habitStore = useHabitStore()

  const createHabit = (formData: HabitFormData): void => {
    const newHabit: Habit = {
      id: Date.now(),
      ...formData,
    }

    habitStore.addHabit(newHabit)
    router.push('/')
  }

  const updateHabit = async (
    id: number,
    formData: HabitFormData
  ): Promise<void> => {
    try {
      habitStore.updateHabit(id, formData)
      router.push('/')
    } catch (error) {
      console.error('Failed to update habit:', error)
    }
  }

  const deleteHabit = async (id: number): Promise<void> => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      try {
        habitStore.deleteHabit(id)
        router.push('/')
      } catch (error) {
        console.error('Failed to delete habit:', error)
      }
    }
  }

  return {
    createHabit,
    updateHabit,
    deleteHabit,
  }
}
