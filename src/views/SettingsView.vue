<template>
  <h2 class="heading-2">Settings</h2>

  <div class="form-container">
    <label class="settings-label">
      <input
        type="checkbox"
        v-model="showOnboarding"
        @change="toggleOnboarding"
      />
      <span>Show Onboarding</span>
    </label>
  </div>
  <CancelButton />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { loadFromLocalStorage } from '@/utils/localStorage'
import { useHabitStore } from '@/stores/habitStore'
import CancelButton from '@/components/CancelButton.vue'

const habitStore = useHabitStore()

const showOnboarding = ref<boolean>(
  loadFromLocalStorage<boolean>('showOnboarding', true)
)

const toggleOnboarding = (): void => {
  habitStore.toggleOnboarding()
}
</script>
