import React from "react";
import { useTasksContext } from "@contexts/TasksContext";
import type { Task } from "@customTypes/taskTypes";

interface TaskProps {
  task: Task;
}

const TaskItem: React.FC<TaskProps> = ({ task }) => {
  const { dispatch } = useTasksContext();

  const handleDeleteTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch({
      type: "DELETE_TASK",
      payload: task,
    });
  };

  const handleToggleTask = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    dispatch({
      type: "TOGGLE_TASK",
      payload: task,
    });
  };

  return (
    <li className="flex items-center justify-between border-b py-2">
      <span
        onClick={handleToggleTask}
        className={`flex-grow cursor-pointer text-lg truncate ${task.completed ? "line-through text-green-500" : "text-black"
          }`}
        title={task.title}
      >
        {task.title}
      </span>

      <button
        onClick={handleDeleteTask}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
