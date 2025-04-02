<template>
  <h2 class="heading-2">Settings</h2>

  <div>
    <label class="form-label">
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
<script setup>
import { ref } from 'vue'
import { loadFromLocalStorage } from '../utils/localStorage'
import { useHabitStore } from '../stores/habitStore'
import CancelButton from '../components/CancelButton.vue'
const habitStore = useHabitStore()

const showOnboarding = ref(loadFromLocalStorage('showOnboarding'))
const toggleOnboarding = () => {
  habitStore.toggleOnboarding()
}
</script>
