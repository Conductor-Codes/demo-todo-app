import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Todo App', () => {
  test('renders main heading', () => {
    render(<App />);
    const heading = screen.getByText(/what would you like to do\?/i);
    expect(heading).toBeInTheDocument();
  });

  test('can add a new todo', () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    const addButton = screen.getByText(/add todo/i);

    fireEvent.change(input, { target: { value: 'New Todo Item' } });
    fireEvent.click(addButton);

    const todoItem = screen.getByText(/New Todo Item/);
    expect(todoItem).toBeInTheDocument();
  });

  test('does not add empty todos', () => {
    render(<App />);
    const addButton = screen.getByText(/add todo/i);
    
    fireEvent.click(addButton);
    const todoItems = screen.queryByRole('listitem');
    expect(todoItems).not.toBeInTheDocument();
  });

  test('can delete a todo', () => {
    render(<App />);
    
    // Add a todo first
    const input = screen.getByRole('textbox');
    const addButton = screen.getByText(/add todo/i);
    fireEvent.change(input, { target: { value: 'Todo to delete' } });
    fireEvent.click(addButton);
    
    // Verify todo was added
    const todoItem = screen.getByText(/Todo to delete/);
    expect(todoItem).toBeInTheDocument();
    
    // Delete the todo
    const deleteButton = screen.getByRole('button', { name: /delete todo/i });
    fireEvent.click(deleteButton);
    
    // Verify todo was removed
    expect(screen.queryByText(/Todo to delete/)).not.toBeInTheDocument();
  });
});