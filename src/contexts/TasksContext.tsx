import React, { createContext, useEffect, useContext, useReducer } from "react";
import { initilizeStorage, TasksReducer } from "@reducers/tasksReducers";
import type { TasksContext } from "@customTypes/taskTypes";

const initialStorage = {
  tasks: initilizeStorage(),
  dispatch: () => {
    throw new Error("Dispatch function not initialized");
  },
};

const TasksContext = createContext<TasksContext>(initialStorage);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, dispatch] = useReducer(TasksReducer, initialStorage.tasks);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "tasks") {
        dispatch({ type: "SYNC_TASKS" });
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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
