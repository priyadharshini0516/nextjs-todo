import { useState, useEffect } from "react";

type Task = {
  text: string;
  done: boolean;
  isEditing?: boolean; // flag to track editing state
};

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, done: false }]);
    setTask("");
  };

  const toggleDone = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  };

  const removeTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  // Start editing mode for a task
  const startEditing = (index: number) => {
    const updatedTasks = tasks.map((t, i) => ({
      ...t,
      isEditing: i === index,
    }));
    setTasks(updatedTasks);
  };

  // Save edited task text and exit editing mode
  const saveEdit = (index: number, newText: string) => {
    if (newText.trim() === "") {
      // if empty, don't update
      return;
    }
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newText;
    updatedTasks[index].isEditing = false;
    setTasks(updatedTasks);
  };

  // Cancel editing mode without saving
  const cancelEdit = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isEditing = false;
    setTasks(updatedTasks);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          📝 Priya's To-Do
        </h1>
        <p className="text-center text-gray-500 mb-6">Stay productive!</p>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
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
                className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg"
              >
                <div className="flex items-center gap-3 flex-grow">
                  <input
                    type="checkbox"
                    checked={t.done}
                    onChange={() => toggleDone(i)}
                    className="w-4 h-4 accent-purple-600"
                  />
                  {t.isEditing ? (
                    <input
                      type="text"
                      defaultValue={t.text}
                      autoFocus
                      onBlur={(e) => saveEdit(i, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          saveEdit(i, (e.target as HTMLInputElement).value);
                        } else if (e.key === "Escape") {
                          cancelEdit(i);
                        }
                      }}
                      className="flex-grow px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <span
                      onDoubleClick={() => startEditing(i)}
                      className={`flex-grow cursor-pointer ${
                        t.done ? "line-through text-gray-400" : ""
                      }`}
                      title="Double-click to edit"
                    >
                      {t.text}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => removeTask(i)}
                  className="text-red-500 hover:text-red-700 font-bold ml-3"
                  aria-label={`Remove task: ${t.text}`}
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
