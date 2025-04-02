<template>
  <h1 class="heading-1">Add a New Habit</h1>

  <HabitForm @submit="handleSubmit">
    <template #actions>
      <button type="submit" class="btn btn-primary">Create Habit</button>
    </template>
  </HabitForm>
  <CancelButton />
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useHabitStore } from '../stores/habitStore'
import CancelButton from '../components/CancelButton.vue'
import HabitForm from '../components/HabitForm.vue'

const router = useRouter()
const habitStore = useHabitStore()

const handleSubmit = async (formData) => {
  try {
    await habitStore.addHabit(formData)
    router.push('/')
  } catch (error) {
    console.error('Failed to add habit:', error)
  }
}
</script>
