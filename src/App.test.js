import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  test('renders Stride logo', () => {
    render(<App />);
    const logo = screen.getByAltText('Stride');
    expect(logo).toBeInTheDocument();
  });

  test('renders input field and add button', () => {
    render(<App />);
    const inputField = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', { name: /add todo/i });
    expect(inputField).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test('adds a new todo item when form is submitted', () => {
    render(<App />);
    const inputField = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(inputField, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    const todoItem = screen.getByText(/new todo/i);
    expect(todoItem).toBeInTheDocument();
  });

  test('clears input field after adding a todo', () => {
    render(<App />);
    const inputField = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(inputField, { target: { value: 'Another Todo' } });
    fireEvent.click(addButton);

    expect(inputField).toHaveValue('');
  });

  test('renders multiple todo items', () => {
    render(<App />);
    const inputField = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(inputField, { target: { value: 'First Todo' } });
    fireEvent.click(addButton);

    fireEvent.change(inputField, { target: { value: 'Second Todo' } });
    fireEvent.click(addButton);

    const firstTodo = screen.getByText(/first todo/i);
    const secondTodo = screen.getByText(/second todo/i);

    expect(firstTodo).toBeInTheDocument();
    expect(secondTodo).toBeInTheDocument();
  });
});