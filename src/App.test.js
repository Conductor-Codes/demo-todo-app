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

  // Assuming a delete button is added for each todo item
  const deleteButtonElement = await screen.findByRole("button", { name: /delete/i });
  await user.click(deleteButtonElement);

  // Verify the todo item is deleted
  await waitFor(() => {
    expect(screen.queryByText("Todo to be deleted")).not.toBeInTheDocument();
  });
});