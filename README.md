# Habit Tracker 2.0

A modern, user-friendly habit tracking application built with Vue 3 and Pinia. Track your daily habits, build consistency, and achieve your goals with a clean and intuitive interface.

## Features

- 📱 Clean, modern UI with responsive design
- 📅 Daily habit tracking with date navigation
- 🎯 Habit categories (Personal, Health, Work, Learning)
- 💾 Local storage persistence
- 🎨 Customizable habit categories with icons
- 📊 Track habit completion status
- 🔄 Edit and delete habits
- ⚙️ User settings and onboarding experience

## Tech Stack

- Vue 3 - Progressive JavaScript Framework
- Pinia - State Management
- Vue Router - Navigation
- Vite - Build Tool
- Local Storage - Data Persistence

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd habit-tracker
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
```

## Project Structure

```
habit-tracker/
├── src/
│   ├── assets/         # Static assets
│   ├── components/     # Vue components
│   ├── composables/    # Reusable composition functions
│   ├── router/         # Vue Router configuration
│   ├── stores/         # Pinia stores
│   ├── utils/          # Utility functions
│   ├── views/          # Page components
│   ├── App.vue         # Root component
│   └── main.js         # Application entry point
├── public/             # Public static files
└── package.json        # Project dependencies and scripts
```

## Features in Detail

### Habit Management

- Create new habits with name, category, and optional description
- Edit existing habits
- Delete habits
- Track daily completion status

### Date Navigation

- View habits for any date
- Navigate between days
- Week view with quick date selection
- Future date prevention

### Categories

- Personal
- Health
- Work
- Learning

### Data Persistence

- All data is automatically saved to local storage
- Habits and completion records persist between sessions
- Settings and preferences are preserved
