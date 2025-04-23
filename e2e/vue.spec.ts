import { test, expect } from '@playwright/test'

test('create and verify multiple habits', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.habit-item')).toHaveCount(0)
  await expect(page.locator('.empty-state')).toBeVisible()

  // Add "Drinking Water" habit
  await page.click('a[href="/add-habit"]')
  await expect(page.locator('h1')).toHaveText('Add a New Habit')
  await page.fill('#habitName', 'Drinking Water')
  await page.click('.category-button.category-health')
  await expect(page.locator('.category-button.category-health')).toHaveClass(
    /active/
  )
  await page.fill('#habitDescription', 'drink five glasses of water')
  await page.click('button.btn.btn-primary')

  await expect(page.locator('.habit-item')).toHaveCount(1)
  await expect(
    page.locator('.habit-item', { hasText: 'Drinking Water' })
  ).toBeVisible()
  await expect(page.locator('.habit-item', { hasText: '💪' })).toBeVisible()

  // Add "Reading" habit
  await page.click('a[href="/add-habit"]')
  await expect(page.locator('h1')).toHaveText('Add a New Habit')
  await page.fill('#habitName', 'Reading')
  await page.click('.category-button.category-learning')
  await expect(page.locator('.category-button.category-learning')).toHaveClass(
    /active/
  )
  await page.click('button.btn.btn-primary')

  await expect(page.locator('.habit-item')).toHaveCount(2)
  await expect(
    page.locator('.habit-item', { hasText: 'Reading' })
  ).toBeVisible()
  await expect(page.locator('.habit-item', { hasText: '📚' })).toBeVisible()
})

test('edit habit', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.habit-item')).toHaveCount(0)

  // Create "Exercise" habit
  await page.click('a[href="/add-habit"]')
  await page.fill('#habitName', 'Exercise')
  await page.click('.category-button.category-health')
  await page.fill('#habitDescription', 'exercise for an hour')
  await page.click('button.btn.btn-primary')
  await expect(
    page.locator('.habit-item', { hasText: 'Exercise' })
  ).toBeVisible()

  // Navigate to Edit Habit page and select the habit
  await page.click('a[href="/edit-habit"]')
  await expect(page.locator('h1')).toHaveText('Select a Habit to Edit:')
  await page.locator('.habit-item', { hasText: 'Exercise' }).click()
  await expect(page.locator('h1')).toHaveText('Edit Habit')

  // Edit and save
  await page.fill('#habitName', 'Morning Yoga')
  await page.fill('#habitDescription', 'yoga for flexibility')
  await page.getByRole('button', { name: 'Save Changes' }).click()
  await expect(
    page.locator('.habit-item', { hasText: 'Morning Yoga' })
  ).toBeVisible()
})

test('delete a habit', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.habit-item')).toHaveCount(0)

  // Add "Meditation" habit
  await page.click('a[href="/add-habit"]')
  await page.fill('#habitName', 'Meditation')
  await page.click('.category-button.category-health')
  await page.fill('#habitDescription', 'meditate for peace of mind')
  await page.click('button.btn.btn-primary')
  await expect(
    page.locator('.habit-item', { hasText: 'Meditation' })
  ).toBeVisible()

  // Edit -> Delete flow
  await page.click('a[href="/edit-habit"]')
  await page.locator('.habit-item', { hasText: 'Meditation' }).click()
  await page.getByRole('button', { name: 'Delete Habit' }).click()

  // Confirm native alert
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe('Are you sure you want to delete this habit?')
    await dialog.accept()
  })

  await expect(page.locator('.habit-item')).toHaveCount(0)
})

test('onboarding view', async ({ page }) => {
  await page.goto('/')

  // Initial onboarding check
  await expect(page.locator('.onboarding-card')).toBeVisible()
  await expect(
    page.getByRole('heading', { name: '👋 Welcome to Habit Tracker!' })
  ).toBeVisible()
  await page.getByRole('button', { name: 'Skip Onboarding' }).click()
  await expect(page.locator('.onboarding-card')).toBeHidden()

  // Enable onboarding via settings
  await page.click('a[href="/settings"]')
  const onboardingCheckbox = page.getByLabel('Show Onboarding')
  await onboardingCheckbox.check()
  await page.click('a[href="/"]')
  await expect(page.locator('.onboarding-card')).toBeVisible()

  // Disable onboarding again
  await page.click('a[href="/settings"]')
  await onboardingCheckbox.uncheck()
  await page.click('a[href="/"]')
  await expect(page.locator('.onboarding-card')).toBeHidden()
})

test('habit streak count', async ({ page }) => {
  await page.goto('/')

  // Add habit
  await page.click('a[href="/add-habit"]')
  await expect(page.locator('h1')).toHaveText('Add a New Habit')
  await page.fill('#habitName', 'Drinking Water')
  await page.click('.category-button.category-health')
  await page.fill('#habitDescription', 'drink five glasses of water')
  await page.click('button.btn.btn-primary')

  // Set streak to 4 days ago
  const fourDaysAgo = new Date()
  fourDaysAgo.setDate(fourDaysAgo.getDate() - 4)
  const streakStart = fourDaysAgo.toISOString().split('T')[0]
  await page.evaluate((date) => {
    localStorage.setItem('streak', JSON.stringify({ date }))
  }, streakStart)
  await page.reload()

  // Day 1: mark habit, verify streak not visible
  for (let i = 0; i < 3; i++) {
    await page.locator('button', { hasText: '←' }).click()
  }
  await page.locator('.habit-item', { hasText: 'Drinking Water' }).click()
  await expect(page.locator('.streak-badge')).toHaveCount(0)

  // Day 2
  await page.locator('button', { hasText: '→' }).click()
  await page.locator('.habit-item', { hasText: 'Drinking Water' }).click()
  await expect(page.locator('.streak-badge')).toHaveCount(0)

  // Day 3
  await page.locator('button', { hasText: '→' }).click()
  await expect(page.locator('.streak-badge')).toHaveCount(0)
  await page.locator('.habit-item', { hasText: 'Drinking Water' }).click()
  await expect(page.locator('.streak-badge')).toHaveText(/🔥\s*3/)

  // Day 4
  await page.locator('button', { hasText: '→' }).click()
  await expect(page.locator('.streak-badge')).toHaveText(/🔥\s*3/)
  await page.locator('.habit-item', { hasText: 'Drinking Water' }).click()
  await expect(page.locator('.streak-badge')).toHaveText(/🔥\s*4/)
})
