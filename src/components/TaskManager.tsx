import React, { useState } from "react";

import TaskItem from "@components/TaskItem";
import { useTasksContext } from "@contexts/TasksContext";
import TaskForm from "./TaskForm";

const TaskManager = () => {
  const { tasks } = useTasksContext();
  const [filter, setFilter] = useState("all");

  // Intentional bug: The filter conditions are reversed.
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed === false;
    if (filter === "pending") return task.completed === true;
    return true;
  });

  // Intentional bug: Directly mutating the tasks array when deleting.
  const handleDeleteTask = (id: number) => {
    // dispatch({ type: "DELETE_TASK", payload: id });
  };

  const toggleTaskCompletion = (id: number) => {
    // dispatch({ type: "TOGGLE_TASK", payload: id });
  };

  return (
    <div className="container mx-auto bg-white p-4 rounded shadow">
      <TaskForm />
      <div className="flex justify-around mb-4">
        <button onClick={() => setFilter("all")} className="text-gray-700">
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          className="text-gray-700"
        >
          Completed
        </button>
        <button onClick={() => setFilter("pending")} className="text-gray-700">
          Pending
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
            onToggle={toggleTaskCompletion}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
