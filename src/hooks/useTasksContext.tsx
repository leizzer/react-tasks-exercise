import { TasksContext } from "@contexts/TasksContext";
import { useContext } from "react";

const useTasksContext = () => {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

export default useTasksContext;