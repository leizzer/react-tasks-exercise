import { Tasks, TaskAction, StorageAction } from "@/types/TaskTypes";

export const initilizeStorage = (): Tasks => {
  let tasks = readTasksFromStorage();
  
  if (!tasks) {
    tasks = [];

    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }

  return tasks;
};

export const readTasksFromStorage = (): Tasks | null => {
  const localStorageTasks = localStorage.getItem("tasks");
  return localStorageTasks ? JSON.parse(localStorageTasks) : null;
};

export const TasksReducer = (state: Tasks, action: TaskAction | StorageAction): Tasks => {
  let newState: Tasks = [];

  switch (action.type) {
    case "SYNC_TASKS":
      newState = readTasksFromStorage() ?? state;
      break;

    case "ADD_TASK":
      newState = [
        ...state,
        {
          ...action.payload,
          completed: false,
          id: increaseId(state),
        }
      ]
      break;

    default:
      newState = state;
  }
  
  if (action.type !== "SYNC_TASKS") {
    localStorage.setItem("tasks", JSON.stringify(newState));
  }

  return newState;
};

//TODO: This is not optimal, possible collisions with multitab
const increaseId = (tasks: Tasks) => {
  const lastTask = tasks[tasks.length - 1];
  return lastTask ? (lastTask.id ?? 0) + 1 : 1;
}