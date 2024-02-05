import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

test('adds a todo item', async () => {
  const user = userEvent.setup();
  render(<App />);

  const inputElement = screen.getByRole('textbox');
  const buttonElement = screen.getByRole('button');

  await waitFor(async () => {
    await user.type(inputElement, 'Test Todo');
    await user.click(buttonElement);
    const todoElement = await screen.findByText(/Test Todo/);
    expect(todoElement).toBeVisible();
  });
});

test('deletes a todo item', async () => {
  const user = userEvent.setup();
  render(<App />);

  const inputElement = screen.getByRole('textbox');
  const addButtonElement = screen.getByText('Add Todo');
  const todoText = 'Todo to be deleted';

  // Add a todo
  await user.type(inputElement, todoText);
  await user.click(addButtonElement);

  // Delete the todo
  const deleteButtonElement = await screen.findByLabelText(
    `Delete ${todoText}`
  );
  await user.click(deleteButtonElement);

  // Check if the todo was deleted
  await waitFor(async () => {
    await expect(screen.queryByText(todoText)).toBeNull();
  });
});
