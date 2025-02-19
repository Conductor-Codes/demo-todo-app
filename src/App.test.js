import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { DragDropContext } from 'react-beautiful-dnd';

// Mock react-beautiful-dnd
jest.mock('react-beautiful-dnd', () => ({
  Droppable: ({ children }) => children({
    droppableProps: {
      'data-rbd-droppable-id': 'test-id',
    },
    innerRef: jest.fn(),
    placeholder: null,
  }),
  Draggable: ({ children }) => children({
    draggableProps: {
      'data-rbd-draggable-id': 'test-id',
    },
    innerRef: jest.fn(),
    dragHandleProps: null,
  }),
  DragDropContext: ({ children }) => children,
}));

describe('Todo App', () => {
  test('renders the main heading', () => {
    render(<App />);
    expect(screen.getByText(/what would you like to do\?/i)).toBeInTheDocument();
  });

  test('adds a new todo when form is submitted', () => {
    render(<App />);
    const input = screen.getByLabelText(/new todo input/i);
    const submitButton = screen.getByText(/add todo/i);

    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/Test Todo/)).toBeInTheDocument();
  });

  test('does not add empty todos', () => {
    render(<App />);
    const submitButton = screen.getByText(/add todo/i);
    
    fireEvent.click(submitButton);
    const todos = screen.queryByRole('listitem');
    
    expect(todos).not.toBeInTheDocument();
  });

  test('clears input after adding todo', () => {
    render(<App />);
    const input = screen.getByLabelText(/new todo input/i);
    const submitButton = screen.getByText(/add todo/i);

    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.click(submitButton);

    expect(input.value).toBe('');
  });

  test('adds multiple todos and maintains them in the list', () => {
    render(<App />);
    const input = screen.getByLabelText(/new todo input/i);
    const submitButton = screen.getByText(/add todo/i);

    // Add first todo
    fireEvent.change(input, { target: { value: 'First Todo' } });
    fireEvent.click(submitButton);

    // Add second todo
    fireEvent.change(input, { target: { value: 'Second Todo' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/First Todo/)).toBeInTheDocument();
    expect(screen.getByText(/Second Todo/)).toBeInTheDocument();
  });
});