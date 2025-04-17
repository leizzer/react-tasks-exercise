import React from "react";
import TaskManager from "./components/TaskManager";
import { TasksProvider } from "./contexts/TasksContext";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="text-center mb-4">
        <h1 className="text-3xl font-bold">Task Manager</h1>
      </header>

      <TasksProvider>
        <TaskManager />
      </TasksProvider>
    </div>
  );
}

export default App;
