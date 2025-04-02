export function formatDayLabel(dateString, todayString) {
  const date = new Date(dateString)
  const isToday = dateString === todayString

  return {
    number: date.getDate(),
    name: isToday
      ? 'Today'
      : date.toLocaleDateString('en-US', { weekday: 'short' }),
  }
}

export function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}
