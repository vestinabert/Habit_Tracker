<script setup lang="ts">
import { useDayNavigation } from '@/components/dayNavigation/useDayNavigation'

const {
  currentDate,
  weekDays,
  navigateToDate,
  goToPreviousDay,
  goToNextDay,
  formatDate,
} = useDayNavigation()
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
