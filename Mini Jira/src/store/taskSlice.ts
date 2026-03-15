import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../types/tasks";
import { StatusTypes } from "../types/status";
import { loadTasksFromStorage } from "../storage/taskStorage";

/*-----State Shape-----*/

interface TaskState {
  tasks: Task[];
}

/*
 * We hydrate the initial state from localStorage so that tasks survive
 * page refreshes. If nothing is stored yet the helper returns [].
 */
const initialState: TaskState = {
  tasks: loadTasksFromStorage(),
};

/*-----Slice-----*/

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    /* addTask — appends a new task to the list. */
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },

    /* updateTask — replaces a task entirely by matching on `id`. */
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },

    /* deleteTask — removes a task by id. */
    deleteTask(state, action: PayloadAction<number>) {
      const index = state.tasks.findIndex((t) => t.id === action.payload);
      if (index !== -1) {
        state.tasks.splice(index, 1);
      }
    },

    /*
     * updateTaskStatus — a targeted reducer for the most common operation
     * on a Kanban board: moving a card between columns.
     */
    updateTaskStatus(
      state,
      action: PayloadAction<{ id: number; status: StatusTypes }>,
    ) {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
      }
    },
  },
});

export const { addTask, updateTask, deleteTask, updateTaskStatus } =
  taskSlice.actions;

export default taskSlice.reducer;
