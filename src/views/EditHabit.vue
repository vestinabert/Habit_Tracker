<template>
  <h1 class="heading-1">Edit Habit</h1>
  <HabitForm v-if="habit" :initial-data="habit" @submit="handleSubmit">
    <template #actions>
      <button type="button" class="btn btn-primary" @click="confirmDelete">
        Delete Habit
      </button>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </template>
  </HabitForm>
  <CancelButton />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useHabitStore } from '../stores/habitStore'
import { useRoute, useRouter } from 'vue-router'
import CancelButton from '../components/CancelButton.vue'
import HabitForm from '../components/HabitForm.vue'

const habitStore = useHabitStore()
const router = useRouter()
const route = useRoute()
const habit = ref(null)

onMounted(async () => {
  try {
    habit.value = await habitStore.getHabit(route.params.id)
    if (!habit.value) {
      router.push('/')
    }
  } catch (error) {
    console.error('Failed to load habit:', error)
    router.push('/')
  }
})

const confirmDelete = async () => {
  if (window.confirm('Are you sure you want to delete this habit?')) {
    try {
      await habitStore.deleteHabit(route.params.id)
      router.push('/')
    } catch (error) {
      console.error('Failed to delete habit:', error)
    }
  }
}

const handleSubmit = async (formData) => {
  try {
    await habitStore.updateHabit(route.params.id, formData)
    router.push('/')
  } catch (error) {
    console.error('Failed to update habit:', error)
  }
}
</script>
