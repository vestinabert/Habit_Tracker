export function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromLocalStorage(key, defaultValue = null) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : defaultValue
}
