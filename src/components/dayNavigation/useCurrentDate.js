import { computed } from 'vue'
import { useRoute } from 'vue-router'

export function useCurrentDate() {
  const route = useRoute()
  const today = new Date().toISOString().split('T')[0]

  const currentDate = computed(() => route.params.date || today)

  const isFutureDate = computed(() => currentDate.value >= today)

  return { currentDate, today, isFutureDate }
}
