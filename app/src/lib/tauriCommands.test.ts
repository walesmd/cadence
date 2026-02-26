import { describe, it, expect, vi, beforeEach } from "vitest";
import { greet, type AppError } from "./tauriCommands";

vi.mock("@tauri-apps/api/core", () => ({
  invoke: vi.fn(),
}));

const { invoke } = await import("@tauri-apps/api/core");

describe("tauriCommands", () => {
  beforeEach(() => {
    vi.mocked(invoke).mockReset();
  });

  describe("greet", () => {
    it("returns result when invoke succeeds", async () => {
      vi.mocked(invoke).mockResolvedValue("Hello, World!");
      const result = await greet("World");
      expect(result).toBe("Hello, World!");
      expect(invoke).toHaveBeenCalledWith("greet", { name: "World" });
    });

    it("rethrows AppError when invoke throws AppError-shaped object", async () => {
      const appError: AppError = {
        kind: "Validation",
        message: "Name too long",
      };
      vi.mocked(invoke).mockRejectedValue(appError);

      await expect(greet("x".repeat(100))).rejects.toEqual(appError);
    });

    it("wraps non-AppError throws as Internal AppError", async () => {
      vi.mocked(invoke).mockRejectedValue(new Error("network failure"));

      await expect(greet("World")).rejects.toMatchObject({
        kind: "Internal",
        message: "network failure",
      });
    });

    it("wraps string throws as Internal AppError", async () => {
      vi.mocked(invoke).mockRejectedValue("unknown error");

      await expect(greet("World")).rejects.toMatchObject({
        kind: "Internal",
        message: "unknown error",
      });
    });
  });
});
