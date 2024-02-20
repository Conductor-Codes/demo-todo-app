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
  // This part of the test will fail until the delete functionality is implemented
  const deleteButtonElement = screen.getByRole("button", { name: /delete/i });
  await user.click(deleteButtonElement);

  // Verify the todo item was deleted
  await waitFor(() => {
    expect(screen.queryByText(/Todo to be deleted/)).not.toBeInTheDocument();
  });
});