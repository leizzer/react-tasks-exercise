import React, { createContext, useContext, useState } from "react";
import { Tasks } from "@/types/TaskTypes";
import type { TasksContext } from "@/types/TaskTypes";

// TODO: It's better if I use an object so I can do O(1) operations
const initialTasks: TasksContext = {tasks: []}
const TasksContext = createContext<TasksContext>(initialTasks);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks] = useState<Tasks>([
  ]);

  return (
    <TasksContext.Provider value={{ tasks }}>
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