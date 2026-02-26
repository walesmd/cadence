import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { attachConsole } from "@tauri-apps/plugin-log";
import App from "./App";
import "./globals.css";

// Attach console to Tauri log (no-op when not running in Tauri)
void attachConsole().catch(() => {});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
