import { useState, useEffect } from "react";

type Task = {
  text: string;
  dueDate: string;
  done: boolean;
};

export default function Home() {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [editDueDate, setEditDueDate] = useState("");

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
    setTasks([...tasks, { text: task, dueDate, done: false }]);
    setTask("");
    setDueDate("");
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

  const startEdit = (index: number) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
    setEditDueDate(tasks[index].dueDate);
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditText("");
    setEditDueDate("");
  };

  const saveEdit = (index: number) => {
    if (editText.trim() === "") return;
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], text: editText, dueDate: editDueDate };
    setTasks(updatedTasks);
    cancelEdit();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full">
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
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={t.done}
                    onChange={() => toggleDone(i)}
                    className="w-4 h-4 accent-purple-600"
                  />
                  {editIndex === i ? (
                    <div className="flex flex-col w-full">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded mb-1"
                      />
                      <input
                        type="date"
                        value={editDueDate}
                        onChange={(e) => setEditDueDate(e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded"
                      />
                    </div>
                  ) : (
                    <div>
                      <span className={t.done ? "line-through text-gray-400 font-medium" : "font-medium"}>
                        {t.text}
                      </span>
                      {t.dueDate && (
                        <p className="text-xs text-gray-500">
                          Due: {new Date(t.dueDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  {editIndex === i ? (
                    <>
                      <button
                        onClick={() => saveEdit(i)}
                        className="text-green-600 hover:text-green-800 font-semibold"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-gray-600 hover:text-gray-800 font-semibold"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(i)}
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => removeTask(i)}
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        ✕
                      </button>
                    </>
                  )}
                </div>
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
