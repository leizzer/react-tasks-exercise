import React, { createContext, useContext, useReducer } from "react";
import { TasksReducer } from "@/reducers/TasksReducers";
import type { TasksContext } from "@/types/TaskTypes";

// TODO: It's better if I use an object so I can do O(1) operations
const initialTasks: TasksContext = { tasks: [] };
const TasksContext = createContext<TasksContext>(initialTasks);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, dispatch] = useReducer(TasksReducer, [
    { id: 1, title: "Buy groceries", completed: false },
    { id: 2, title: "Clean the house", completed: true },
  ]);

  return (
    <TasksContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
