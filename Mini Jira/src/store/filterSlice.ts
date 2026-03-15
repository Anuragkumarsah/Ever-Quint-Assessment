import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusTypes, Priority } from "../types/status";

export type SortOption = "createdAt" | "updatedAt" | "priority";

export interface FilterState {
  status: StatusTypes[];
  priority: Priority[];
  searchText: string;
  sortBy: SortOption;
}

const initialState: FilterState = {
  status: [],
  priority: [],
  searchText: "",
  sortBy: "createdAt",
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setStatusFilter: (state, action: PayloadAction<StatusTypes[]>) => {
      state.status = action.payload;
    },
    setPriorityFilter: (state, action: PayloadAction<Priority[]>) => {
      state.priority = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
    },
    clearFilters: (state) => {
      state.status = [];
      state.priority = [];
      state.searchText = "";
      state.sortBy = "createdAt";
    },
  },
});

export const {
  setStatusFilter,
  setPriorityFilter,
  setSearchText,
  setSortBy,
  clearFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
