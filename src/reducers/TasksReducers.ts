import { Task, Tasks, TaskAction, StorageAction } from "@customTypes/taskTypes";

export const initilizeStorage = (): Tasks => {
  let tasks = readTasksFromStorage();

  if (!tasks) {
    tasks = [];

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  return tasks;
};

export const readTasksFromStorage = (): Tasks | null => {
  const localStorageTasks = localStorage.getItem("tasks");
  return localStorageTasks ? JSON.parse(localStorageTasks) : null;
};

export const initialStorage = {
  tasks: initilizeStorage(),
  dispatch: () => {},
};

export const TasksReducer = (
  state: Tasks,
  action: TaskAction | StorageAction,
): Tasks => {
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
        },
      ];
      break;

    case "DELETE_TASK":
      newState = state.filter(
        (task) => task.id !== (action.payload as Task).id,
      );
      break;

    case "TOGGLE_TASK":
      const task = action.payload as Task;

      newState = state.map((t) => {
        if (t.id !== task.id) return t;
        return {
          ...t,
          completed: !t.completed,
        };
      });

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
};
