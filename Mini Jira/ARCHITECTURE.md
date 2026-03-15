# System Architecture

This document outlines the architecture, data management, and optimization strategies for the Mini Jira application.

## Component Hierarchy

The application component tree is designed for separation of concerns and minimal prop-drilling.

```text
App (Provides Redux Store, Router, and Toast Context)
 ├── Layout / Main Container
 │    ├── Header (Title & Filter Toggle Button)
 │    ├── FilterPanel (Search, Sort, Status/Priority MultiSelects)
 │    │    └── MultiSelect, Select, Input
 │    └── Board (Manages columns and grid layout)
 │         ├── BoardColumn (Backlog)
 │         │    └── TaskCard (Memoized)
 │         │         ├── Task Badges (Priority, Status, Tags)
 │         │         └── Status Dropdown (Direct update)
 │         ├── BoardColumn (In Progress)
 │         └── BoardColumn (Done)
 └── TaskModal (Portal)
      └── TaskForm (Creates or Edits Tasks)
```

## Storage Versioning Approach

Since `localStorage` is persistent and sits on the client's machine, pushing updates to the application's data structure can break existing clients. To solve this, a **Storage Schema Versioning** system was implemented.

### How it works:
1. **Version Tracking:** The data is saved under a single key (`mini_jira_tasks`) but wrapped in an envelope containing a `schemaVersion`.
   ```json
   {
     "schemaVersion": 2,
     "tasks": [ ... ]
   }
   ```
2. **Read Pipeline:** On initialization, `taskStorage.ts` reads the payload. If the version is older than the `CURRENT_SCHEMA_VERSION`, it routes the data through sequential migration functions.
3. **V1 to V2 Migration:** For example, when moving from V1 (flat task array) to V2 (schema versioning wrapper), the system detects the old format (an array), wraps it in the V2 schema, and writes it back to storage.
4. **Resiliency:** If `localStorage` contains corrupted JSON, the system catches the error and gracefully falls back to an empty state, preventing app crashes.

## Refactor Example

During development, the implementation of Filters evolved significantly.

**Initial State:** Filters were local state within the `Board` component. This proved unscalable when URL parameter synchronization was introduced, as the `Board` component became bloated with routing logic.

**Refactor:**
1. Created `filterSlice.ts` to push filter state into Redux.
2. Created a dedicated `taskSelectors.ts` to house the complex filtering and sorting logic out of the UI components.
3. Decoupled the URL synchronization logic into a specialized hook/effect in `App.tsx`.
**Result:** The `Board` component is now purely presentational regarding tasks, simply receiving `filteredTasks` from the Redux store.

## Performance Optimization

To handle potentially large numbers of tasks smoothly, several React optimization techniques were utilized:

1. **React.memo on TaskCard:** 
   `TaskCard` is wrapped in `React.memo`. When typing in the Filter Panel's search bar, or when dragging/updating a single task, completely unrelated `TaskCard`s do not re-render, saving significant processing time.
   
2. **Memoized Selectors (Reselect):**
   The mapping of `tasks` to categorized arrays (Backlog, In Progress, Done) is performed using RTK's `createSelector`.
   ```typescript
   export const selectFilteredAndSortedTasks = createSelector(
     [selectAllTasks, selectFilterState],
     (tasks, filters) => { ... } // Complex logic runs only if tasks or filters change
   );
   ```
   This prevents the expensive sorting and string-matching algorithms from running on every React render cycle.
