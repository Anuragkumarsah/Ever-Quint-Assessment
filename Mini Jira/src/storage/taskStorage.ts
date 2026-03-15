import { Task } from "../types/tasks";

const STORAGE_KEY = "mini_jira_tasks";

export const CURRENT_SCHEMA_VERSION = 2;

export interface StorageSchema {
  schemaVersion: number;
  tasks: Task[];
}

export const storageStatus = { hasError: false, migrated: false };

/* Load the persisted tasks array from localStorage */

export const loadTasksFromStorage = (): Task[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    let parsed = JSON.parse(raw);

    if (!parsed) return [];

    // Migration logic:
    // Older versions saved just an Array of tasks.
    // We detect this by checking if it's an array OR if schemaVersion is missing/lower it's an older format.
    if (
      Array.isArray(parsed) ||
      (parsed.schemaVersion && parsed.schemaVersion < CURRENT_SCHEMA_VERSION)
    ) {
      parsed = migrateToCurrent(parsed);
      storageStatus.migrated = true;
      saveTasksToStorage(parsed.tasks);
    }

    return Array.isArray(parsed.tasks) ? parsed.tasks : [];
  } catch (error) {
    storageStatus.hasError = true;
    console.warn(
      "[taskStorage] Failed to parse or load tasks from localStorage. Data corrupted. Resetting to empty list.",
      error,
    );
    return [];
  }
};

const migrateToCurrent = (oldData: any): StorageSchema => {
  let tasks: Task[] = [];

  if (Array.isArray(oldData)) {
    tasks = oldData;
  } else if (oldData && Array.isArray(oldData.tasks)) {
    tasks = oldData.tasks;
  }

  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    tasks,
  };
};

/* Persist the full tasks array to localStorage. */

export const saveTasksToStorage = (tasks: Task[]): void => {
  try {
    const payload: StorageSchema = {
      schemaVersion: CURRENT_SCHEMA_VERSION,
      tasks,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    storageStatus.hasError = true;
    console.warn("[taskStorage] Failed to save tasks to localStorage:", error);
  }
};
