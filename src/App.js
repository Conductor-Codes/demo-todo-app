import React, { useState } from "react";
import "./App.css";
import StrideLogo from "./stride-logo-white.svg";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, input]);
    setInput("");
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
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
                &#x2022; {todo}
                <button onClick={() => handleDeleteTodo(index)} className="btn btn-error btn-xs">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
