import { Tasks, TaskAction } from "@/types/TaskTypes";

export const TasksReducer = (state: Tasks, action: TaskAction): Tasks => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];

    default:
      return state;
  }
};
