import { Task } from "../types/tasks";
import { FilterState } from "../store/filterSlice";

// Custom internal sort weight map for priority
const priorityWeights: Record<string, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export const getFilteredAndSortedTasks = (
  tasks: Task[],
  filters: FilterState,
): Task[] => {
  let result = tasks.filter((task) => {
    if (!filters.searchText) return true;

    const searchLower = filters.searchText.toLowerCase();
    const titleMatch = task.title.toLowerCase().includes(searchLower);
    const descMatch =
      task.description?.toLowerCase().includes(searchLower) ?? false;

    return titleMatch || descMatch;
  });

  result = result.filter((task) => {
    if (filters.status.length === 0) return true;
    return filters.status.includes(task.status);
  });

  result = result.filter((task) => {
    if (filters.priority.length === 0) return true;
    return filters.priority.includes(task.priority);
  });

  result.sort((a, b) => {
    if (filters.sortBy === "createdAt") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }

    if (filters.sortBy === "updatedAt") {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }

    if (filters.sortBy === "priority") {
      const weightA = priorityWeights[a.priority as string] || 0;
      const weightB = priorityWeights[b.priority as string] || 0;

      if (weightA !== weightB) {
        return weightB - weightA;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }

    return 0;
  });

  return result;
};
