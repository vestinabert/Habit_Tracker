<template>
  <div
    class="habit-item"
    :class="[{ completed: completed }, `category-${habit.category}`]"
    @click="toggleCompletion"
  >
    <div class="habit-top">
      <span class="habit-icon">{{ getCategoryIcon(habit.category) }}</span>

      <span
        v-if="streak >= 3"
        :class="['streak-badge', { highlight: isLongestStreak }]"
      >
        🔥 {{ streak }}
      </span>
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
import { computed } from 'vue'
import { useHabitStore } from '../stores/habitStore'
import { useHabitCategory } from '../composables/useHabitCategory'

const props = defineProps({
  habit: Object,
  date: String,
})

const habitStore = useHabitStore()

const completed = computed(() => {
  const records = habitStore.habitRecords
  return records?.[props.date]?.[props.habit.id] === true
})

const toggleCompletion = () => {
  habitStore.toggleHabitCompletion(props.habit.id, props.date)
}

const { getCategoryIcon } = useHabitCategory()

const streak = computed(() => {
  return habitStore.habitStreak(props.habit.id, props.date)
})

const isLongestStreak = computed(() => {
  return false
})
</script>
