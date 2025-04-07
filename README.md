# Habit Tracker

A modern, user-friendly habit tracking application built with Vue 3 and Pinia. Track your daily habits, build consistency, and achieve your goals with a clean and intuitive interface.

## Features

- 📱 Clean, modern UI with responsive design
- 📅 Daily habit tracking with date navigation
- 🎯 Habit categories (Personal, Health, Work, Learning)
- 🔥 Streaks tracking
- 💾 Local storage persistence
- 🎨 Customizable habit categories with icons
- 🔄 Edit and delete habits
- ⚙️ User settings and onboarding experience

## Screenshots

#### Onboarding & Welcome Screen
<img width="543" alt="Onboarding   Welcome" src="https://github.com/user-attachments/assets/b9f5cefb-74dc-4048-a9d4-0ff39c8c3646" />


#### Habit List and Tracking Progress
<img width="547" alt="Habit List and Tracking Progress" src="https://github.com/user-attachments/assets/60d0ec7a-643c-4261-9005-224cda40a748" />


#### Creating and Editing Habits
<img width="538" alt="Creating and Editing Habits" src="https://github.com/user-attachments/assets/c9b8d52e-5466-4f9a-91d9-f1332f07400e" />


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
git clone https://github.com/vestinabert/Habit_Tracker.git
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
