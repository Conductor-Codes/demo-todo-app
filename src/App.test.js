import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

test("adds a todo item", async () => {
  const user = userEvent.setup();
  render(<App />);

  the inputElement = screen.getByRole("textbox");
  const addButtonElement = screen.getByText("Add Todo");

  await waitFor(async () => {
    await user.type(inputElement, "Test Todo");
    await user.click(addButtonElement);
    const todoElement = await screen.findByText(/Test Todo/);
    expect(todoElement).toBeVisible();
  });
});

test("deletes a todo item", async () => {
  const user = userEvent.setup();
  render(<App />);

  const inputElement = screen.getByRole("textbox");
  const addButtonElement = screen.getByText("Add Todo");

  // Add a todo item
  await waitFor(async () => {
    await user.type(inputElement, "Todo to Delete");
    await user.click(addButtonElement);
    const todoElement = await screen.findByText(/Todo to Delete/);
    expect(todoElement).toBeVisible();
  });

  // Delete the added todo item
  const deleteButtonElement = await screen.findByText("Delete");
  await user.click(deleteButtonElement);

  await waitFor(async () => {
    expect(screen.queryByText(/Todo to Delete/)).toBeNull();
  });
});