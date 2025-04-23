import { useHabitStore } from '@/stores/habitStore'

export function useOnboardingActions(): {
  skipOnboarding: () => void
} {
  const habitStore = useHabitStore()

  const skipOnboarding = (): void => {
    habitStore.toggleOnboarding()
  }

  return {
    skipOnboarding,
  }
}
