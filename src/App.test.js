import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

test("adds a todo item", async () => {
  const user = userEvent.setup();
  render(<App />);

  const inputElement = screen.getByRole("textbox");
  const buttonElement = screen.getByRole("button");

  await waitFor(async () => {
    await user.type(inputElement, "Test Todo");
    await user.click(buttonElement);
    const todoElement = await screen.findByText(/Test Todo/);
    expect(todoElement).toBeVisible();
  });
});

test("deletes a todo item", async () => {
  const user = userEvent.setup();
  render(<App />);

  // Add a todo item
  const inputElement = screen.getByRole("textbox");
  const addButtonElement = screen.getByRole("button", { name: /add todo/i });

  await user.type(inputElement, "Test Todo");
  await user.click(addButtonElement);

  // Verify the todo item is added
  const todoElement = await screen.findByText(/Test Todo/);
  expect(todoElement).toBeInTheDocument();

  // Find and click the delete button
  const deleteButton = screen.getByRole("button", { name: /delete/i });
  await user.click(deleteButton);

  // Verify the todo item is removed
  await waitFor(() => {
    expect(screen.queryByText(/Test Todo/)).not.toBeInTheDocument();
  });
});

test("deletes the correct todo item when multiple items exist", async () => {
  const user = userEvent.setup();
  render(<App />);

  const inputElement = screen.getByRole("textbox");
  const addButtonElement = screen.getByRole("button", { name: /add todo/i });

  // Add two todo items
  await user.type(inputElement, "First Todo");
  await user.click(addButtonElement);
  await user.type(inputElement, "Second Todo");
  await user.click(addButtonElement);

  // Verify both todo items are added
  expect(screen.getByText(/First Todo/)).toBeInTheDocument();
  expect(screen.getByText(/Second Todo/)).toBeInTheDocument();

  // Find and click the delete button for the second todo
  const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
  await user.click(deleteButtons[1]);

  // Verify only the second todo is removed
  await waitFor(() => {
    expect(screen.getByText(/First Todo/)).toBeInTheDocument();
    expect(screen.queryByText(/Second Todo/)).not.toBeInTheDocument();
  });
});