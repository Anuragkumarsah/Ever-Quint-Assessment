import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import filterReducer from "./filterSlice";
import { saveTasksToStorage } from "../storage/taskStorage";

/*-----Store-----*/

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    filters: filterReducer,
  },
});

/* Persist tasks to localStorage whenever the store changes. */

store.subscribe(() => {
  const { tasks } = store.getState().tasks;
  saveTasksToStorage(tasks);
});

/*-----Exported types-----*/

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
