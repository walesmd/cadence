import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "./App";

vi.mock("@/lib/tauriCommands", () => ({
  greet: vi.fn(),
}));

const { greet } = await import("@/lib/tauriCommands");

describe("App", () => {
  beforeEach(() => {
    vi.mocked(greet).mockReset();
  });

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

  it("shows greeting when Greet succeeds", async () => {
    vi.mocked(greet).mockResolvedValue("Hello, World!");
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /greet/i }));
    expect(await screen.findByRole("status")).toHaveTextContent(
      "Hello, World!"
    );
  });

  it("shows AppError when Greet fails", async () => {
    vi.mocked(greet).mockRejectedValue({
      kind: "Validation",
      message: "Name too long",
    });
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /greet/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Validation: Name too long"
    );
  });
});
