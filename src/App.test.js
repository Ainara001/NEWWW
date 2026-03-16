import { render, screen } from "@testing-library/react";
import App from "./App";

test("проверка загрузки пользователей", async () => {

  render(<App />);

  const user = await screen.findByText(/Leanne Graham/i);

  expect(user).toBeInTheDocument();

});