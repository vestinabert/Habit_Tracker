import { describe, it, expect, vi } from 'vitest'
import { useDayNavigation } from './useDayNavigation'

// Declare mocked router outside for reuse
const mockPush = vi.fn()

// Mock vue-router correctly
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useRoute: () => ({
    params: {
      date: '2025-07-20',
    },
  }),
}))

describe('useDayNavigation', () => {
  it('should correctly generate weekDays array with 7 days around current date', () => {
    const { weekDays } = useDayNavigation()
    const days = weekDays.value

    expect(days).toHaveLength(7)
    expect(days[3].date).toBe('2025-07-20') // Center date
    expect(days[3].isActive).toBe(true)
    expect(days[1].date).toBe('2025-07-18') // 2 days before
    expect(days[6].date).toBe('2025-07-23') // 3 days after
  })

  it('should navigate to the previous day when goToPreviousDay is called', () => {
    const { goToPreviousDay } = useDayNavigation()
    goToPreviousDay()
    expect(mockPush).toHaveBeenCalledWith('/day/2025-07-19')
  })
})
