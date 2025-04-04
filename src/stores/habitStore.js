import { defineStore } from 'pinia'
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage'

export const useHabitStore = defineStore('habitStore', {
  state: () => ({
    habits: loadFromLocalStorage('habits', []),
    habitRecords: loadFromLocalStorage('habitRecords', {}) || {},
    categories: loadFromLocalStorage('categories', [
      { name: 'personal', icon: '🏠' },
      { name: 'health', icon: '💪' },
      { name: 'work', icon: '💼' },
      { name: 'learning', icon: '📚' },
    ]),
    showOnboarding: loadFromLocalStorage('showOnboarding', true),
    darkMode: loadFromLocalStorage('darkMode', false),
  }),
  getters: {
    habitStreak: (state) => {
      return (habitId, currentDate) => {
        let streak = 0
        const todayStr = new Date().toISOString().split('T')[0]
        let cursor = new Date(currentDate)

        // If currentDate is in the future, return 0
        if (currentDate > todayStr) return 0

        // If habit is not completed on currentDate, step one day back
        const currentDateStr = cursor.toISOString().split('T')[0]
        const isCompletedToday =
          state.habitRecords?.[currentDateStr]?.[habitId] === true
        if (!isCompletedToday) {
          cursor.setDate(cursor.getDate() - 1)
        }

        // Count streak going backwards
        while (true) {
          const dateStr = cursor.toISOString().split('T')[0]
          const completed = state.habitRecords?.[dateStr]?.[habitId] === true

          if (completed) {
            streak++
            cursor.setDate(cursor.getDate() - 1)
          } else {
            break
          }
        }

        return streak
      }
    },
  },
  actions: {
    getHabit(id) {
      return this.habits.find((habit) => habit.id === id)
    },
    getHabitsByDate(date) {
      const records = this.habitRecords[date] || {}
      return this.habits.filter((habit) => records[habit.id])
    },
    persistData() {
      saveToLocalStorage('habits', this.habits)
      saveToLocalStorage('habitRecords', this.habitRecords)
      saveToLocalStorage('categories', this.categories)
      saveToLocalStorage('darkMode', this.darkMode)
      saveToLocalStorage('showOnboarding', this.showOnboarding)
    },
    deleteHabit(id) {
      this.habits = this.habits.filter((h) => h.id !== id)
      for (const date in this.habitRecords) {
        if (this.habitRecords[date][id] !== undefined) {
          delete this.habitRecords[date][id]
        }
      }
      this.persistData()
    },
    addHabit(habit) {
      this.habits.push(habit)
      this.persistData()
    },
    updateHabit(id, { name, category, description }) {
      const habit = this.habits.find((h) => h.id === id)
      if (habit) {
        habit.name = name
        habit.category = category
        habit.description = description
        this.persistData()
      }
    },
    toggleHabitCompletion(habitId, date) {
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
    toggleOnboarding() {
      this.showOnboarding = !this.showOnboarding
      this.persistData()
    },
  },
})
