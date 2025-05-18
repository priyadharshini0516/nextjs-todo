// src/pages/index.tsx
import { useState } from "react";

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask("");
  };

  const removeTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">📝 Priya's To-Do</h1>
        <p className="text-center text-gray-500 mb-6">Stay productive!</p>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
          >
            Add
          </button>
        </div>

        {tasks.length === 0 ? (
          <p className="text-center text-gray-400">No tasks added yet.</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((t, i) => (
              <li
                key={i}
                className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg"
              >
                <span>{t}</span>
                <button
                  onClick={() => removeTask(i)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        <footer className="mt-6 text-center text-sm text-gray-400">
          © 2025 Priya Dharshini. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
