import { FilterState, SortOption } from "../store/filterSlice";
import { Priority, StatusTypes } from "../types/status";

export const parseFiltersFromURL = (
  searchParams: URLSearchParams,
): FilterState => {
  const statusParam = searchParams.get("status");
  const priorityParam = searchParams.get("priority");
  const searchParam = searchParams.get("search");
  const sortParam = searchParams.get("sort");

  const parsedStatus = statusParam
    ? (statusParam
        .split(",")
        .filter((s) =>
          ["backlog", "inProgress", "done"].includes(s),
        ) as StatusTypes[])
    : [];

  const parsedPriority = priorityParam
    ? (priorityParam
        .split(",")
        .filter((p) => ["low", "medium", "high"].includes(p)) as Priority[])
    : [];

  const parsedSortBy =
    sortParam && ["createdAt", "updatedAt", "priority"].includes(sortParam)
      ? (sortParam as SortOption)
      : "createdAt";

  return {
    status: parsedStatus,
    priority: parsedPriority,
    searchText: searchParam || "",
    sortBy: parsedSortBy,
  };
};

export const updateURLFromFilters = (filters: FilterState): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.status.length > 0) {
    params.set("status", filters.status.join(","));
  }

  if (filters.priority.length > 0) {
    params.set("priority", filters.priority.join(","));
  }

  if (filters.searchText.trim()) {
    params.set("search", filters.searchText.trim());
  }

  if (filters.sortBy !== "createdAt") {
    params.set("sort", filters.sortBy);
  }

  return params;
};
