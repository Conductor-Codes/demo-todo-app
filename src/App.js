import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import StrideLogo from "./Conductor-Logo.png";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (!input.trim()) return;
    
    const newTodo = {
      id: `todo-${Date.now()}`,
      content: input,
    };
    
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
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
              placeholder="Enter a new todo"
              aria-label="New todo input"
            />

            <button type="submit" className="btn mx-4">
              Add Todo
            </button>
          </form>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="mt-4"
              >
                {todos.map((todo, index) => (
                  <Draggable
                    key={todo.id}
                    draggableId={todo.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`TextColor text-xl text-left mx-auto w-3/5 pt-4 cursor-move
                          ${snapshot.isDragging ? 'bg-gray-100 rounded shadow-lg' : ''}`}
                      >
                        &#x2022; {todo.content}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;