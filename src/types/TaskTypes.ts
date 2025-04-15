export type Task = {
  id: number;
  title: string;
  completed: boolean;
}

export type NewTask = {
  title: string;
}

export type Tasks = Task[];

export type TasksContext = {
  tasks: Tasks;
  dispatch: DispatchType
};

export type DispatchType = React.Dispatch<TaskAction | StorageAction>;

export type TaskAction = {
  type: "ADD_TASK" | "DELETE_TASK" | "TOGGLE_TASK";
  payload: Task | NewTask;
};

export type StorageAction = {
  type: "SYNC_TASKS";
}

export enum TasksFilters {
  ALL = "all",
  COMPLETED = "completed",
  PENDING = "pending",
}