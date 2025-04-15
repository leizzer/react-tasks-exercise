import React, { useState } from 'react';
import { useTasksContext } from '@contexts/TasksContext';

const TaskForm: React.FC = () => {
    const { dispatch } = useTasksContext();
    const [task, setTask] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const title = task.trim();

        if (title === "") return;

        dispatch({ type: "ADD_TASK", payload: { title, completed: false } });

        setTask('');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 flex">
            <input
                type="text"
                name="taskTitle"
                value={task}
                onChange={handleChange}
                placeholder="New task..."
                className="flex-grow border rounded-l py-2 px-3"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 rounded-r">
                Add
            </button>
        </form>
    );
};

export default TaskForm;