import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('Todo item deletion', () => {
  test('deletes a todo item when the delete button is clicked', async () => {
    render(<App />);
    // Add a todo item
    const inputElement = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', { name: /add todo/i });
    userEvent.type(inputElement, 'Test Todo');
    userEvent.click(addButton);

    // Ensure the todo item is added
    expect(screen.getByText(/test todo/i)).toBeInTheDocument();

    // Add delete functionality in the App component and a delete button in the UI for this test to pass
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    userEvent.click(deleteButton);

    // Verify the todo item is deleted
    expect(screen.queryByText(/test todo/i)).not.toBeInTheDocument();
  });
});