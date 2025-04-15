import React, { useState } from "react";

import TaskItem from "@components/TaskItem";
import { useTasksContext } from "@contexts/TasksContext";
import TaskForm from "@components/TaskForm";
import Filter from "@components/Filter";
import { TasksFilters } from "@customTypes/taskTypes";
import { filterTasks } from "@utilities/filterTasks";

const TaskManager: React.FC = () => {
  const { tasks } = useTasksContext();
  const [filter, setFilter] = useState(TasksFilters.ALL);

  return (
    <div className="container mx-auto bg-white p-4 rounded shadow">
      <TaskForm />
      <Filter onFilterSelected={setFilter} currentFilter={filter} />

      <ul>
        {filterTasks(tasks, filter).map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
