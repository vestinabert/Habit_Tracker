import { defineStore } from 'pinia'
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage'
import { reactive } from 'vue'

export const useHabitStore = defineStore('habitStore', {
  state: () => ({
    habits: loadFromLocalStorage('habits', []),
    habitRecords: reactive(loadFromLocalStorage('habitRecords', {})),
    showOnboarding: loadFromLocalStorage('showOnboarding', true),
  }),
  getters: {
    getRecordsByDate: (state) => (date) => {
      try {
        const records = state.habitRecords[date] || {}
        return records
      } catch (error) {
        console.error('Error in getRecordsByDate:', error)
        return {}
      }
    },
  },
  actions: {
    getHabit(id) {
      return this.habits.find((habit) => habit.id === id)
    },
    persistData() {
      saveToLocalStorage('habits', this.habits)
      saveToLocalStorage('habitRecords', this.habitRecords)
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
    addHabit({ name, category = 'personal', description = '' }) {
      const newHabit = {
        id: Date.now().toString(),
        name,
        category,
        description,
      }
      this.habits.push(newHabit)
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
    toggleHabitCompletion(date, habitId) {
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
