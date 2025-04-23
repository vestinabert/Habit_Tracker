<template>
  <div class="habit-list">
    <h1 class="heading-1">Select a Habit to Edit:</h1>
    <ul v-if="habits.length">
      <li
        v-for="habit in habits"
        :key="habit.id"
        @click="goToEdit(habit.id)"
        :class="['habit-item', `category-${habit.category}`]"
      >
        <div class="habit-top">
          <span class="habit-icon">{{ getCategoryIcon(habit.category) }}</span>
        </div>
        <div class="habit-info">
          <div class="habit-header">
            <span class="habit-name">{{ habit.name }}</span>
          </div>
          <p v-if="habit.description" class="habit-description">
            {{ habit.description }}
          </p>
        </div>
      </li>
    </ul>

    <p v-else class="no-habits">No habits found. Add one first!</p>
  </div>
  <CancelButton />
</template>

<script setup lang="ts">
import CancelButton from '@/components/CancelButton.vue'
import { useHabitStore } from '@/stores/habitStore'
import { useHabitCategory } from '@/composables/useHabitCategory'
import { useRouter } from 'vue-router'
import type { Habit } from '@/types'

const router = useRouter()
const habitStore = useHabitStore()

const habits: Habit[] = habitStore.habits

const { getCategoryIcon } = useHabitCategory()

const goToEdit = (habitId: number): void => {
  router.push(`/edit-habit/${habitId}`)
}
</script>
