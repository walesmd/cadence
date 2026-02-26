import { invoke } from "@tauri-apps/api/core";

export interface AppError {
  kind: string;
  message: string;
}

function isAppError(value: unknown): value is AppError {
  return (
    typeof value === "object" &&
    value !== null &&
    "kind" in value &&
    "message" in value &&
    typeof (value as AppError).kind === "string" &&
    typeof (value as AppError).message === "string"
  );
}

export async function greet(name: string): Promise<string> {
  try {
    return await invoke<string>("greet", { name });
  } catch (err) {
    if (isAppError(err)) {
      throw err;
    }
    throw {
      kind: "Internal",
      message: err instanceof Error ? err.message : String(err),
    } satisfies AppError;
  }
}
