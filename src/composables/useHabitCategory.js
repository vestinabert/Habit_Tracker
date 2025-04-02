export function useHabitCategory() {
  const categories = [
    { name: 'personal', icon: '👤' },
    { name: 'health', icon: '💪' },
    { name: 'work', icon: '💼' },
    { name: 'learning', icon: '📚' },
  ]

  const getCategoryIcon = (categoryName) => {
    const found = categories.find((cat) => cat.name === categoryName)
    return found?.icon || '❓'
  }

  return {
    categories,
    getCategoryIcon,
  }
}
