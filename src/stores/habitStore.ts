import { defineStore } from 'pinia'
import { saveToLocalStorage, loadFromLocalStorage } from '@/utils/localStorage'
import type { Habit, HabitRecordMap, Category } from '@/types'

interface State {
  habits: Habit[]
  habitRecords: HabitRecordMap
  categories: Category[]
  showOnboarding: boolean
  darkMode: boolean
}

export const useHabitStore = defineStore('habitStore', {
  state: (): State => ({
    habits: loadFromLocalStorage<Habit[]>('habits', []),
    habitRecords: loadFromLocalStorage<HabitRecordMap>('habitRecords', {}),
    categories: loadFromLocalStorage<Category[]>('categories', [
      { name: 'personal', icon: '🏠' },
      { name: 'health', icon: '💪' },
      { name: 'work', icon: '💼' },
      { name: 'learning', icon: '📚' },
    ]),
    showOnboarding: loadFromLocalStorage<boolean>('showOnboarding', true),
    darkMode: loadFromLocalStorage<boolean>('darkMode', false),
  }),

  actions: {
    getHabit(id: number): Habit | undefined {
      return this.habits.find((habit) => habit.id === id)
    },

    getHabitsByDate(date: string): Habit[] {
      const records = this.habitRecords[date] || {}
      return this.habits.filter((habit) => records[habit.id])
    },

    persistData(): void {
      saveToLocalStorage('habits', this.habits)
      saveToLocalStorage('habitRecords', this.habitRecords)
      saveToLocalStorage('categories', this.categories)
      saveToLocalStorage('darkMode', this.darkMode)
      saveToLocalStorage('showOnboarding', this.showOnboarding)
    },

    deleteHabit(id: number): void {
      this.habits = this.habits.filter((h) => h.id !== id)
      for (const date in this.habitRecords) {
        if (this.habitRecords[date][id] !== undefined) {
          delete this.habitRecords[date][id]
        }
      }
      this.persistData()
    },

    addHabit(habit: Habit): void {
      this.habits.push(habit)
      this.persistData()
    },

    updateHabit(
      id: number,
      {
        name,
        category,
        description,
      }: { name: string; category: string; description?: string }
    ): void {
      const habit = this.habits.find((h) => h.id === id)
      if (habit) {
        habit.name = name
        habit.category = category
        habit.description = description
        this.persistData()
      }
    },

    toggleHabitCompletion(habitId: number, date: string): boolean {
      try {
        if (!this.habitRecords[date]) {
          this.habitRecords[date] = {}
        }

        const newValue = !this.habitRecords[date][habitId]
        this.habitRecords[date][habitId] = newValue

        this.persistData()
        return true
      } catch (error) {
        console.error('Error toggling habit completion:', error)
        return false
      }
    },

    toggleOnboarding(): void {
      this.showOnboarding = !this.showOnboarding
      this.persistData()
    },
  },
})
