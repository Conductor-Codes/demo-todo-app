// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('deletes a todo item when the delete button is clicked', () => {
  render(<App />);
  const input = screen.getByRole('textbox');
  const addButton = screen.getByRole('button', { name: /add todo/i });

  userEvent.type(input, 'Test Todo');
  userEvent.click(addButton);

  const deleteButton = screen.getByRole('button', { name: /delete/i });
  userEvent.click(deleteButton);

  expect(screen.queryByText('Test Todo')).not.toBeInTheDocument();
});