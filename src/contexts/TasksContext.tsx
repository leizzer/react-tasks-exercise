import React, { createContext, useEffect, useReducer } from "react";
import { initialStorage, TasksReducer } from "@reducers/tasksReducers";
import type { Tasks, DispatchType } from "@customTypes/taskTypes";

type TasksContextType = {
  tasks: Tasks;
  dispatch: DispatchType;
};

export const TasksContext = createContext<TasksContextType>(initialStorage);

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