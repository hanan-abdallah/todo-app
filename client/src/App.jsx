import './style.css';
import { useEffect, useMemo, useState, useCallback } from "react";

const API_BASE = import.meta.env.VITE_API_BASE

function StatusDot({ online }) {
  return (
    <span
      className={`status-dot ${online ? "online" : "offline"}`}
      aria-label={online ? "API online" : "API offline"}
      title={online ? "API online" : "API offline"}
    />
  );
}

function ErrorBanner({ message, onRetry }) {
  if (!message) return null;
  return (
    <div className="error-banner">
      <p>{message}</p>
      {onRetry && <button onClick={onRetry}>Retry</button>}
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [text, setText] = useState("");
  const [apiOnline, setApiOnline] = useState(false);

  const filtered = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((t) => !t.completed);
      case "completed":
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const remainingCount = useMemo(() => todos.filter((t) => !t.completed).length, [todos]);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/todos`);
      if (!res.ok) throw new Error(`GET /todos failed: ${res.status}`);
      const data = await res.json();
      setTodos(data);
      setApiOnline(true);
    } catch (e) {
      setError(e.message || "Failed to fetch todos");
      setApiOnline(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  async function addTodo(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim() }),
      });
      if (!res.ok) throw new Error(`POST /todos failed: ${res.status}`);
      const created = await res.json();
      setTodos((prev) => [created, ...prev]);
      setText("");
      setApiOnline(true);
    } catch (e) {
      setError(e.message || "Failed to add todo");
      setApiOnline(false);
    } finally {
      setLoading(false);
    }
  }

  async function toggleTodo(todo) {
    const prev = todos;
    const next = todos.map((t) => (t._id === todo._id ? { ...t, completed: !t.completed } : t));
    setTodos(next);
    try {
      const res = await fetch(`${API_BASE}/todos/${todo._id}`, { method: "PUT" });
      if (!res.ok) throw new Error(`PUT /todos/:id failed: ${res.status}`);
      setApiOnline(true);
    } catch (e) {
      setTodos(prev);
      setError(e.message || "Failed to toggle todo");
      setApiOnline(false);
    }
  }

  async function deleteTodo(todo) {
    const prev = todos;
    setTodos((cur) => cur.filter((t) => t._id !== todo._id));
    try {
      const res = await fetch(`${API_BASE}/todos/${todo._id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`DELETE /todos/:id failed: ${res.status}`);
      setApiOnline(true);
    } catch (e) {
      setTodos(prev);
      setError(e.message || "Failed to delete todo");
      setApiOnline(false);
    }
  }

  return (
    <div className="app-container">
      <div className="todo-wrapper">
        <header className="header">
          <h1> My Tasks</h1>
          <div className="status">
            <StatusDot online={apiOnline} />
            <span>{apiOnline ? "Connected" : "Offline"}</span>
          </div>
        </header>

        <ErrorBanner message={error} onRetry={fetchTodos} />

        <form onSubmit={addTodo} className="form">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task..."
            disabled={loading}
          />
          <button type="submit" disabled={loading || !text.trim()}>Add</button>
        </form>

        <div className="filter-section">
          <label htmlFor="filter">Show:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <div className="remaining">
            {remainingCount} item{remainingCount === 1 ? "" : "s"} left
          </div>
        </div>

        <ul className="todo-list">
          {loading && todos.length === 0 ? (
            <li className="todo-item loading">Loading...</li>
          ) : (
            filtered.map((todo) => (
              <li key={todo._id} className={`todo-item ${todo.completed ? "completed" : ""}`}>
                <label>{todo.text}</label>
                <div>
                  <button onClick={() => toggleTodo(todo)}>
                    {todo.completed ? "Undo" : "Complete"}
                  </button>
                  <button onClick={() => deleteTodo(todo)}>Delete</button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
