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
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

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
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const removeTask = (index: number) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
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
    const updated = [...tasks];
    updated[index] = { ...updated[index], text: editText, dueDate: editDueDate };
    setTasks(updated);
    cancelEdit();
  };

  const filteredTasks = tasks.filter((t) =>
    filter === "active" ? !t.done : filter === "completed" ? t.done : true
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8 max-w-md w-full space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-center text-gray-800">📝 Priya's To-Do</h1>
          <p className="text-center text-gray-500">Stay productive!</p>
        </div>

        {/* Input Section */}
        <div className="space-y-2">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={addTask}
            className="w-full px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
          >
            Add Task
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4">
          {["all", "active", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as typeof filter)}
              className={`px-3 py-1 rounded-full font-semibold ${
                filter === f
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-purple-300"
              } transition`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Task List */}
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-400">No tasks to show.</p>
        ) : (
          <ul className="space-y-3">
            {filteredTasks.map((t, i) => {
              const realIndex = tasks.indexOf(t);
              return (
                <li key={realIndex} className="bg-gray-100 p-3 rounded-lg">
                  {editIndex === realIndex ? (
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded"
                        placeholder="Edit task"
                      />
                      <input
                        type="date"
                        value={editDueDate}
                        onChange={(e) => setEditDueDate(e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded"
                      />
                      <div className="flex gap-4 justify-end">
                        <button
                          onClick={() => saveEdit(realIndex)}
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
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={t.done}
                          onChange={() => toggleDone(realIndex)}
                          className="mt-1 accent-purple-600"
                        />
                        <div>
                          <p className={t.done ? "line-through text-gray-400 font-medium" : "font-medium"}>
                            {t.text}
                          </p>
                          {t.dueDate && (
                            <p className="text-xs text-gray-500">
                              Due: {new Date(t.dueDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(realIndex)}
                          className="text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => removeTask(realIndex)}
                          className="text-red-500 hover:text-red-700 font-bold"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {/* Footer */}
        <footer className="text-center text-sm text-gray-400">
          © 2025 Priya Dharshini. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
