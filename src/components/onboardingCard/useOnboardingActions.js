import { useHabitStore } from '../../stores/habitStore'

export function useOnboardingActions() {
  const habitStore = useHabitStore()

  const skipOnboarding = () => {
    habitStore.toggleOnboarding()
  }

  return {
    skipOnboarding,
  }
}
