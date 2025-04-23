<template>
  <h1 class="heading-1">Add a New Habit</h1>

  <HabitForm @submit="handleSubmit">
    <template #actions>
      <button type="submit" class="btn btn-primary">Create Habit</button>
    </template>
  </HabitForm>
  <CancelButton />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useHabitStore } from '@/stores/habitStore'
import HabitForm from '@/components/HabitForm.vue'
import CancelButton from '@/components/CancelButton.vue'
import type { Habit, HabitFormData } from '@/types'

const router = useRouter()
const habitStore = useHabitStore()

const handleSubmit = (formData: HabitFormData): void => {
  const newHabit: Habit = {
    id: Date.now(),
    name: formData.name,
    category: formData.category,
    description: formData.description,
  }

  habitStore.addHabit(newHabit)
  router.push('/')
}
</script>
