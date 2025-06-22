import { useState, useEffect } from "react";
import api from "../api";
import {
  Sun,
  Moon,
  X,
  Circle,
  CheckCircle,
  PlusCircle,
  ListChecks,
  CalendarDays,
  FileText,
  Trash2,
} from "lucide-react";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks/");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/tasks/", { title, description, deadline });
      setTitle("");
      setDescription("");
      setDeadline("");
      fetchTasks();
    } catch (err) {
      alert("Failed to create task.");
    }
  };

  const toggleComplete = async (task) => {
    try {
      await api.put(`/tasks/${task.id}/`, {
        ...task,
        completed: !task.completed,
      });
      fetchTasks();
    } catch (err) {
      alert("Failed to update task.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}/`);
      fetchTasks();
    } catch (err) {
      alert("Failed to delete task.");
    }
  };

  const clearCompleted = async () => {
    const completedTasks = tasks.filter((task) => task.completed);
    await Promise.all(
      completedTasks.map((task) => api.delete(`/tasks/${task.id}/`))
    );
    fetchTasks();
  };

  const getFilteredTasks = () => {
    if (filter === "active") return tasks.filter((t) => !t.completed);
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
      style={{
        backgroundImage: `url(${darkMode ? "/dark-bg.jpg" : "/light-bg.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 mt-8">
          <h1 className="text-4xl font-bold tracking-widest">TODO</h1>
          <button onClick={() => setDarkMode(!darkMode)} className="text-2xl">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleCreate}
          className={`mb-6 p-4 rounded shadow ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <label
            className={`block mb-1 font-semibold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Task Title
          </label>
          <input
            type="text"
            placeholder="Currently typing"
            className={`w-full p-3 rounded mb-3 outline-none placeholder-gray-400 ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
            }`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label
            className={`block mb-1 font-semibold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Description
          </label>
          <textarea
            placeholder="Description"
            className={`w-full p-3 rounded mb-3 outline-none placeholder-gray-400 ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
            }`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label
            className={`block mb-1 font-semibold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Deadline
          </label>
          <input
            type="date"
            className={`w-full p-3 rounded mb-3 outline-none ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
            }`}
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />

          <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 flex items-center justify-center gap-2">
            <PlusCircle size={18} />
            Add Task
          </button>
        </form>

        {/* Task List */}
        <div
          className={`rounded shadow ${
            darkMode ? "bg-gray-800" : "bg-white"
          } p-4 transition-colors`}
        >
          {filteredTasks.length === 0 ? (
            <p className="text-center text-gray-400">No tasks available</p>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`flex justify-between items-start border-b py-4 gap-4 ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <div className="flex items-start gap-3 w-full">
                  {task.completed ? (
                    <CheckCircle
                      onClick={() => toggleComplete(task)}
                      className="text-green-500 mt-1 cursor-pointer"
                      size={22}
                    />
                  ) : (
                    <Circle
                      onClick={() => toggleComplete(task)}
                      className="text-gray-400 mt-1 cursor-pointer"
                      size={22}
                    />
                  )}

                  <div className="flex-1">
                    <p
                      className={`font-semibold text-lg break-words ${
                        task.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {task.title}
                    </p>

                    <div className="flex items-center text-sm mt-1 gap-2 text-gray-600 dark:text-gray-400">
                      <CalendarDays size={16} />
                      <span className="font-medium">Deadline:</span>
                      <span>{task.deadline}</span>
                    </div>

                    {task.description && (
                      <div className="flex items-start text-sm mt-2 gap-2 text-gray-600 dark:text-gray-400">
                        <FileText size={16} className="mt-0.5" />
                        <span>{task.description}</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 rounded-full transition hover:bg-red-100 dark:hover:bg-red-900 group"
                  title="Delete task"
                >
                  <Trash2
                    size={20}
                    className="text-red-500 group-hover:text-red-700 dark:group-hover:text-red-400 transition"
                  />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4 text-sm">
          <span>{tasks.filter((t) => !t.completed).length} items left</span>
          <div className="flex gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`flex items-center gap-1 ${
                filter === "all" ? "text-blue-600 font-bold" : ""
              }`}
            >
              <ListChecks size={16} /> All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`flex items-center gap-1 ${
                filter === "active" ? "text-blue-600 font-bold" : ""
              }`}
            >
              <Circle size={14} /> Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`flex items-center gap-1 ${
                filter === "completed" ? "text-blue-600 font-bold" : ""
              }`}
            >
              <CheckCircle size={14} /> Completed
            </button>
          </div>
          <button
            onClick={clearCompleted}
            className="text-blue-500 hover:underline"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
