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

  // Verify the todo item was added
  const todoElement = await screen.findByText(/Todo to be deleted/);
  expect(todoElement).toBeVisible();

  // Assuming a delete button is added next to each todo item for deletion
  // This part of the test might need to be adjusted based on the actual implementation
  const deleteButtonElement = screen.getByRole("button", { name: /delete/i });
  await user.click(deleteButtonElement);

  // Verify the todo item was deleted
  await waitFor(() => {
    expect(screen.queryByText(/Todo to be deleted/)).not.toBeInTheDocument();
  });
});

test("delete button is pink", async () => {
  render(<App />);

  // Add a todo item to ensure a delete button is rendered
  const user = userEvent.setup();
  const inputElement = screen.getByRole("textbox");
  const addButtonElement = screen.getByRole("button", { name: /add todo/i });
  await user.type(inputElement, "Todo for color check");
  await user.click(addButtonElement);

  // Find the delete button
  const deleteButtonElement = screen.getByRole("button", { name: /delete/i });

  // Check if the delete button has the correct pink color class
  expect(deleteButtonElement).toHaveClass("btn-error");
});