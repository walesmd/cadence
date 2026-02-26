import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders Cadence heading", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /cadence/i })
    ).toBeInTheDocument();
  });

  it("renders description text", () => {
    render(<App />);
    expect(
      screen.getByText(/performance capture and reflection/i)
    ).toBeInTheDocument();
  });

  it("renders Get started button", () => {
    render(<App />);
    expect(
      screen.getByRole("button", { name: /get started/i })
    ).toBeInTheDocument();
  });
});
