export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export type Tasks = Task[];

export type TasksContext = {
  tasks: Tasks;
  dispatch?: React.Dispatch<TaskAction>;
};

export type TaskAction = {
  type: "ADD_TASK";
  payload: Task;
};
