<template>
  <div class="onboarding-card">
    <h2>👋 Welcome to Habit Tracker!</h2>

    <p class="intro">
      Build consistent habits and stay motivated with a simple, beautiful
      tracker.
    </p>

    <div class="benefits">
      <h3>🚀 Features you'll love:</h3>
      <ul>
        <li>✅ Track habits daily with one tap</li>
        <li>🎯 Focus with a clean, clutter-free view</li>
        <li>🎨 Customize categories</li>
      </ul>
    </div>

    <div class="suggested-section">
      <p>✨ Start with one of these:</p>
      <ul class="suggested">
        <li>🏃 Exercise</li>
        <li>📖 Read</li>
        <li>🧘 Meditate</li>
        <li>💧 Drink Water</li>
      </ul>
    </div>

    <button class="skip-button" @click="skipOnboarding">Skip Onboarding</button>
  </div>
</template>

<script setup>
import { useOnboardingActions } from './useOnboardingActions'
import './OnboardingCard.css'
const { skipOnboarding } = useOnboardingActions()
</script>
