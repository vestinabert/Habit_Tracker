export interface DayLabel {
  name: string
  number: string
}

export interface Day {
  date: string
  isActive: boolean
  isToday: boolean
  isFuture: boolean
  label: DayLabel
}

export interface HabitFormData {
  name: string
  category: string
  description?: string
}

export interface Habit {
  id: number
  name: string
  category: string
  description?: string
}

export interface HabitRecordMap {
  [date: string]: {
    [habitId: number]: boolean
  }
}

export interface Category {
  name: string
  icon: string
}
