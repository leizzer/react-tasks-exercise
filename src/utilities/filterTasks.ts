import { Task, TasksFilters } from "@customTypes/taskTypes";

export const filterTasks = (tasks: Task[], filter: TasksFilters): Task[] => {
  switch (filter) {
    case TasksFilters.COMPLETED:
      return tasks.filter((task) => task.completed);
    case TasksFilters.PENDING:
      return tasks.filter((task) => !task.completed);
    default:
      return tasks;
  }
};