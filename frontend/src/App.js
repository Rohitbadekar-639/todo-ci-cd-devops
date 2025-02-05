import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./components/TodoList";
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const fetchTodos = async () => {
    const { data } = await axios.get("http://localhost:5000/api/todos");
    setTodos(data);
  };

  const addTodo = async () => {
    if (!task) return;
    const { data } = await axios.post("http://localhost:5000/api/todos", { task });
    setTodos([...todos, data]);
    setTask("");
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div>
      <h1>To-Do App</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add Task</button>
      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
