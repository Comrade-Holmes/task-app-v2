import { useEffect, useState } from "react";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();

    if (task.trim() === "") {
      setError("Task cannot be empty");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false
    };

    setTasks([newTask, ...tasks]);
    setTask("");
    setError("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Task Manager</h1>
        <p className="subtitle">
          Responsive React task app using Hooks, validation and dynamic rendering
        </p>

        <form onSubmit={addTask} className="task-form">
          <input
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button type="submit">Add Task</button>
        </form>

        {error && <p className="error">{error}</p>}

        <div className="stats">
          <span>Total: {tasks.length}</span>
          <span>
            Completed: {tasks.filter((t) => t.completed).length}
          </span>
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="empty">
              No tasks added yet
            </div>
          ) : (
            tasks.map((item) => (
              <div className="task-item" key={item.id}>
                <div className="task-left">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleComplete(item.id)}
                  />

                  <p className={item.completed ? "completed" : ""}>
                    {item.text}
                  </p>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(item.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}