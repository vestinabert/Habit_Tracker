export function getTodayString(): string {
  return new Date().toISOString().split('T')[0]
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

export function cloneDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function isFutureDate(dateStr: string): boolean {
  return dateStr > getTodayString()
}

export function formatDayLabel(dateStr: string): {
  number: string
  name: string
} {
  const date = new Date(dateStr)
  const options: Intl.DateTimeFormatOptions = { weekday: 'short' }
  return {
    number: dateStr.split('-')[2],
    name: date.toLocaleDateString(undefined, options),
  }
}
