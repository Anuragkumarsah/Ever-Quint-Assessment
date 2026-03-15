# Mini Jira

A lightweight, client-side project management board built with **React**, **TypeScript**, **Redux Toolkit**, and **Vite**.

## Features

- **Kanban Board:** Organize tasks into Backlog, In Progress, and Done.
- **Task Management:** Create, edit, and move tasks across statuses.
- **Advanced Filtering & Sorting:** Filter by status and priority, sort by date or priority, with URL synchronization.
- **Client-Side Persistence:** Data is stored in `localStorage` with a robust **schema versioning and migration** system.
- **Optimized UI:** Built with custom Vanilla CSS featuring responsive design, dark mode aesthetics, and micro-animations.

## How to Run

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- `npm` or `yarn`

### Installation & Setup

1. **Clone or Download the Repository:**

   ```bash
   cd "Mini Jira"
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Start the Development Server:**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.

4. **Build for Production:**

   ```bash
   npm run build
   ```

5. **Lint the Code:**
   ```bash
   npm run lint
   ```

## Architecture Overview

For an in-depth look at the component hierarchy, storage versioning, and performance optimizations, see [ARCHITECTURE.md](./ARCHITECTURE.md).

The application follows a standard React feature-based directory structure:

- **`src/components`**: Reusable generic UI elements (`Button`, `Modal`, `Select`, `MultiSelect`).
- **`src/features`**: Domain-specific logic, specifically the `board` and `task` components.
- **`src/store`**: Redux logic broken into specific slices (`taskSlice`, `filterSlice`).
- **`src/storage`**: Local Storage interaction logic, including schema migrations.
- **`src/types`**: Shared TypeScript definitions.

## State Management Decision (Redux Toolkit)

**Redux Toolkit (RTK)** was chosen as the state management solution for this project from the proposed options (i.e., Redux and Zustand).

### Why Redux Toolkit?

1. **Predictability & Centralization:** As the application scales (filters, board columns, search, multiple task properties), having a single source of truth prevents prop-drilling and scattered state.
2. **Derived Data:** The `createSelector` utility (Reselect) allows us to efficiently compute derived state (e.g., heavily filtering and sorting tasks) without unnecessary re-renders.
3. **Immutability out-of-the-box:** RTK uses Immer under the hood, making deeply nested state updates (like updating a specific task's property) clean and robust.
4. **Previous Experience:** I have previous experience with Redux Toolkit and have found it to be a robust and reliable state management solution, and keeping in mind of the project deadline, I chose Redux Toolkit as I am very familiar with it and could complete the setup in a short time.

## Trade-offs

1. **Vanilla CSS vs. Tailwind/CSS-in-JS:**
   - _Decision:_ Used Vanilla CSS with CSS Variables.
   - _Trade-off:_ While Tailwind could have provided faster iterations, Vanilla CSS was explicitly chosen to maintain a custom aesthetic system while having very low bundle size.
2. **Local Storage vs. IndexedDB:**
   - _Decision:_ Data is persisted synchronously to `localStorage`.
   - _Trade-off:_ The time line of the project was very short, so I chose `localStorage` over `IndexedDB` to avoid the complexity of `IndexedDB` while making the integration very simple and fast. However, I have implemented a schema versioning system to handle schema changes gracefully.
