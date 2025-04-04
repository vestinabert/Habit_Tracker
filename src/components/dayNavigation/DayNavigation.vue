<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Router and current route
const router = useRouter()
const route = useRoute()

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0]

// Computed value for the currently viewed date
const currentDate = computed(() => route.params.date || today)

// Clone a date (to avoid mutation issues)
function cloneDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

// Check if a date is in the future
function isFutureDate(dateStr) {
  return dateStr > today
}

// Navigate to a specific date if it's not in the future
const navigateToDate = (date) => {
  if (!isFutureDate(date)) {
    router.push(`/day/${date}`)
  }
}

// Go to the previous day
const goToPreviousDay = () => {
  const date = new Date(currentDate.value)
  date.setDate(date.getDate() - 1)
  const newDate = date.toISOString().split('T')[0]
  router.push(`/day/${newDate}`)
}

// Go to the next day (if it's not in the future)
const goToNextDay = () => {
  const date = new Date(currentDate.value)
  date.setDate(date.getDate() + 1)
  const newDate = date.toISOString().split('T')[0]

  if (!isFutureDate(newDate)) {
    router.push(`/day/${newDate}`)
  }
}

// Compute the 7-day navigation view (-2 to +4 days from current)
const weekDays = computed(() => {
  const days = []
  const baseDate = new Date(currentDate.value)
  const selectedDate = cloneDate(baseDate)

  for (let i = -2; i <= 4; i++) {
    const date = cloneDate(selectedDate)
    date.setDate(date.getDate() + i)

    const formatted = date.toISOString().split('T')[0]

    days.push({
      date: formatted,
      label: formatDayLabel(formatted, today),
      isActive: formatted === currentDate.value,
      isToday: formatted === today,
      isFuture: isFutureDate(formatted),
    })
  }

  return days
})

// Format function for display (example output: { number: '03', name: 'Wed' })
function formatDayLabel(dateStr) {
  const date = new Date(dateStr)
  const options = { weekday: 'short' }
  return {
    number: dateStr.split('-')[2], // e.g. "03"
    name: date.toLocaleDateString(undefined, options), // e.g. "Wed"
  }
}
function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<template>
  <div class="title">
    <h2 class="heading-2">Habit list for:</h2>
    <h1 class="heading-2">{{ formatDate(currentDate) }}</h1>
  </div>

  <div class="navigation">
    <button @click="goToPreviousDay">←</button>
    <button
      v-for="day in weekDays"
      :key="day.date"
      @click="navigateToDate(day.date)"
      class="day-button"
      :class="{
        active: day.isActive,
        today: day.isToday,
        future: day.isFuture,
      }"
    >
      <span class="day-number">{{ day.label.number }}</span>
      <span class="day-name">{{ day.label.name }}</span>
    </button>
    <button @click="goToNextDay">→</button>
  </div>
</template>
