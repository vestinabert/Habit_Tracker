<script setup lang="ts">
import { useHabitStore } from '@/stores/habitStore'
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import HabitItem from '@/components/HabitItem.vue'
import type { Habit } from '@/types'

const habitStore = useHabitStore()
const route = useRoute()

const currentDate = ref<string>(route.params.date as string)

const habits = computed<Habit[]>(() => {
  return habitStore.habits || []
})

watch(
  () => route.params.date,
  (newDate) => {
    if (typeof newDate === 'string') {
      currentDate.value = newDate
    }
  }
)
</script>

<template>
  <div class="habit-list">
    <div v-if="habits.length === 0" class="empty-state">
      <p>
        No habits added yet. Click the button below to add your first habit!
      </p>

      <router-link to="/add-habit" class="add-habit-button">
        Add your first habit
      </router-link>
    </div>
    <ul v-else>
      <li v-for="habit in habits" :key="habit.id">
        <HabitItem :habit="habit" :date="currentDate" />
      </li>
    </ul>
  </div>
</template>
