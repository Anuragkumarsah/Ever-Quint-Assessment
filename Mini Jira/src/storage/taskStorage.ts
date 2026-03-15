import { Task } from "../types/tasks";

const STORAGE_KEY = "mini_jira_tasks";

export const storageStatus = { hasError: false };

/* Load the persisted tasks array from localStorage */

export const loadTasksFromStorage = (): Task[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) return [];

    return JSON.parse(raw) as Task[];
  } catch (error) {
    storageStatus.hasError = true;
    console.warn(
      "[taskStorage] Failed to load tasks from localStorage:",
      error,
    );
    return [];
  }
};

/* Persist the full tasks array to localStorage. */

export const saveTasksToStorage = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    storageStatus.hasError = true;
    console.warn("[taskStorage] Failed to save tasks to localStorage:", error);
  }
};
