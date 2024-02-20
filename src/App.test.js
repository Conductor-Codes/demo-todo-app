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

  // Add a todo item first
  const inputElement = screen.getByRole("textbox");
  const addButtonElement = screen.getByRole("button", { name: /add todo/i });

  await user.type(inputElement, "Todo to be deleted");
  await user.click(addButtonElement);

  // Verify the todo item is added
  const todoElement = await screen.findByText(/Todo to be deleted/);
  expect(todoElement).toBeVisible();

  // Assuming a delete button is added next to each todo item
  const deleteButtonElement = screen.getByRole("button", { name: /delete/i });
  await user.click(deleteButtonElement);

  // Verify the todo item is deleted
  await waitFor(() => {
    expect(screen.queryByText(/Todo to be deleted/)).not.toBeInTheDocument();
  });
});

test("delete button visibility for each todo item", async () => {
  render(<App />);

  // Add two todo items
  const user = userEvent.setup();
  const inputElement = screen.getByRole("textbox");
  const addButtonElement = screen.getByRole("button", { name: /add todo/i });

  await user.type(inputElement, "First Todo");
  await user.click(addButtonElement);
  await user.type(inputElement, "Second Todo");
  await user.click(addButtonElement);

  // Check for delete buttons
  const deleteButtons = screen.getAllByText(/delete/i);
  expect(deleteButtons.length).toBe(2);
  deleteButtons.forEach(button => {
    expect(button).toBeVisible();
  });
});

test("interface updates after deleting a todo item", async () => {
  const user = userEvent.setup();
  render(<App />);

  // Add a todo item first
  const inputElement = screen.getByRole("textbox");
  const addButtonElement = screen.getByRole("button", { name: /add todo/i });

  await user.type(inputElement, "Todo to be visually deleted");
  await user.click(addButtonElement);

  // Verify the todo item is added
  const todoElement = await screen.findByText(/Todo to be visually deleted/);
  expect(todoElement).toBeVisible();

  // Assuming a delete button is added next to each todo item
  const deleteButtonElement = screen.getByRole("button", { name: /delete/i });
  await user.click(deleteButtonElement);

  // Verify the interface updates to show that the item has been deleted
  await waitFor(() => {
    expect(screen.queryByText(/Todo to be visually deleted/)).not.toBeInTheDocument();
  });
});