import { Task } from "@customTypes/taskTypes";
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
          task.completed ? "line-through text-green-500" : "text-black"
        }`}
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
