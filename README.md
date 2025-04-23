# Habit Tracker

Habit Tracker 2.0 is a modern web application that helps users track and maintain their daily habits. The application is built with Vue 3 and TypeScript, providing a robust and type-safe development experience.

### Key Features

- 📝 Create and manage custom habits
- 🗂️ Organize habits by categories
- ✅ Track daily habit completion
- 📊 View habit completion history
- 💾 Local storage persistence
- 🎯 Onboarding experience for new users

### Technologies Used

- **Frontend Framework:** Vue 3 with Composition API
- **Build Tool:** Vite
- **Language:** TypeScript
- **State Management:** Pinia
- **Testing:**
  - Unit Testing: Vitest
  - E2E Testing: Playwright
- **Code Quality:**
  - ESLint for code linting
  - TypeScript for static type checking

## Features in Detail

### Habit Management

- Create new habits with name, category, and optional description
- Edit existing habits
- Delete habits

### Date Navigation

- View habits for any date
- Navigate between days
- Week view with quick date selection
- Future date prevention

### Data Persistence

- All data is automatically saved to local storage
- Habits and completion records persist between sessions
- Settings and preferences are preserved

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
