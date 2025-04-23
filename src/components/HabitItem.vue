<template>
  <div
    class="habit-item"
    :class="[{ completed: completed }, `category-${habit.category}`]"
    @click="toggleCompletion"
  >
    <div class="habit-top">
      <span class="habit-icon">{{ getCategoryIcon(habit.category) }}</span>

      <span v-if="streak >= 3" class="streak-badge"> 🔥 {{ streak }} </span>
    </div>

    <div class="habit-info">
      <div class="habit-header">
        <span class="habit-name">{{ habit.name }}</span>
      </div>
      <p v-if="habit.description" class="habit-description">
        {{ habit.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHabitStore } from '@/stores/habitStore'
import { useHabitCategory } from '@/composables/useHabitCategory'
import { useHabitStreak } from '@/composables/useHabitStreak'
import type { Habit } from '@/types'

const props = defineProps<{
  habit: Habit
  date: string
}>()

const habitStore = useHabitStore()
const { getCategoryIcon } = useHabitCategory()
const { calculateStreak } = useHabitStreak()

const completed = computed<boolean>(() => {
  const records = habitStore.habitRecords
  return records?.[props.date]?.[props.habit.id] === true
})

const toggleCompletion = (): void => {
  habitStore.toggleHabitCompletion(props.habit.id, props.date)
}

const streak = computed<number>(() => {
  return calculateStreak(props.habit.id, props.date)
})
</script>
