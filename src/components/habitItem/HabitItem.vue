<template>
  <div
    class="habit-item"
    :class="[{ completed: localCompleted }, `category-${habit.category}`]"
    @click="toggleCompletion"
  >
    <div class="habit-top">
      <span class="habit-icon">{{ getCategoryIcon(habit.category) }}</span>
      <span v-if="localCompleted" class="habit-check">✔</span>
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

<script setup>
import { useHabitCompletion } from './useHabitCompletion'
import { useHabitCategory } from '../../composables/useHabitCategory'

const props = defineProps({
  habit: {
    type: Object,
    required: true,
  },
  currentDate: {
    type: String,
    required: true,
  },
})

const { localCompleted, toggleCompletion } = useHabitCompletion(
  props.habit,
  props.currentDate
)
const { getCategoryIcon } = useHabitCategory()
</script>
