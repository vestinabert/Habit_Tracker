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

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHabitStore } from '@/stores/habitStore'
import { useRoute, useRouter } from 'vue-router'
import CancelButton from '@/components/CancelButton.vue'
import HabitForm from '@/components/HabitForm.vue'
import type { Habit, HabitFormData } from '@/types'

const habitStore = useHabitStore()
const router = useRouter()
const route = useRoute()

const habit = ref<Habit | null>(null)

onMounted(async () => {
  try {
    const id = Number(route.params.id)
    if (isNaN(id)) {
      router.push('/')
      return
    }

    const loadedHabit = habitStore.getHabit(id)
    if (!loadedHabit) {
      router.push('/')
    } else {
      habit.value = loadedHabit
    }
  } catch (error) {
    console.error('Failed to load habit:', error)
    router.push('/')
  }
})

const confirmDelete = async (): Promise<void> => {
  if (window.confirm('Are you sure you want to delete this habit?')) {
    try {
      const id = Number(route.params.id)
      if (!isNaN(id)) {
        habitStore.deleteHabit(id)
        router.push('/')
      }
    } catch (error) {
      console.error('Failed to delete habit:', error)
    }
  }
}

const handleSubmit = async (formData: HabitFormData): Promise<void> => {
  try {
    const id = Number(route.params.id)
    if (!isNaN(id)) {
      habitStore.updateHabit(id, formData)
      router.push('/')
    }
  } catch (error) {
    console.error('Failed to update habit:', error)
  }
}
</script>
