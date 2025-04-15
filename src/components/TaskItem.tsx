import { Task } from "@/types/TaskTypes";
import { useTasksContext } from '@contexts/TasksContext';

const TaskItem = ({ task }: { task: Task }) => {
  const { dispatch } = useTasksContext();

  const handleDeleteTask = ( e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch({
      type: "DELETE_TASK",
      payload: task,
    }); 
  };

  const handleToggleTask = ( e: React.MouseEvent<HTMLSpanElement>) => {
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
        className={`flex-grow cursor-pointer ${
          task.completed ? "text-black" : "line-through text-green-500"
        }`}
      >
        {task.title}
      </span>

      <button
        onClick={handleDeleteTask}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "4px 8px",
          borderRadius: "4px",
        }}
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
