import React, { useState } from "react";
import "./App.css";
import StrideLogo from "./Conductor-Logo.png";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput("");
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleDelete = (indexToDelete) => {
    setTodos(todos.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="App">
      <header className="App-Logo flex justify-center">
        <img src={StrideLogo} alt="Stride" />
      </header>
      <p className="TextColor text-5xl">What would you like to do?</p>

      <div className="mx-auto w-1/2">
        <div>
          <form onSubmit={handleAddTodo} className="space-y-4">
            <input
              value={input}
              onChange={handleInputChange}
              className="input input-bordered w-full max-w-xs mx-4"
              placeholder="Enter a todo"
            />

            <button type="submit" className="btn mx-4">
              Add Todo
            </button>
          </form>
        </div>

        <div>
          <ul>
            {todos.map((todo, index) => (
              <li
                className="TextColor text-xl text-left mx-auto w-3/5 pt-4 flex justify-between items-center"
                key={index}
              >
                <span>&#x2022; {todo}</span>
                <button
                  onClick={() => handleDelete(index)}
                  className="btn btn-sm btn-error"
                  aria-label="Delete todo"
                >
                  Delete
                </button>
              </li>
            ))}>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;