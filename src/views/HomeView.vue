<script setup lang="ts">
import DayNavigation from '@/components/dayNavigation/DayNavigation.vue'
import HabitList from '@/components/HabitList.vue'
import BottomNav from '@/components/BottomNav.vue'
import OnboardingCard from '@/components/onboardingCard/OnboardingCard.vue'
import { useHabitStore } from '@/stores/habitStore'

const habitStore = useHabitStore()
</script>

<template>
  <main>
    <!-- Show onboarding if enabled -->
    <OnboardingCard v-if="habitStore.showOnboarding" />
    <!-- Date navigation bar -->
    <DayNavigation />
    <!-- Habit list for current day -->
    <HabitList />
    <!-- Bottom navigation bar -->
    <BottomNav />
  </main>
</template>
