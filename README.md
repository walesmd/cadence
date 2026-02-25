# Cadence

Open-source productivity tool: **capture what you do** with minimal friction, then get **performance reflections** (weekly, monthly, quarterly, on-demand) aligned with your role and projects. You capture; the system justifies.

- **Spotlight-like input** — Global hotkey, type a line, it’s filed (NLP interprets).
- **Minimal dashboard** — Recall and trust/verify what you’ve logged.
- **LLM-stable, exportable storage** — Your data, your format, no lock-in.
- **Cross-platform** — macOS (first), Windows, Linux.

## Repo layout

| Path | Purpose |
|------|--------|
| **`app/`** | Desktop app (Tauri 2 + TypeScript). Run `npm run tauri dev` from here. |
| **`docs/`** | Specs and format. **[docs/STORAGE-FORMAT.md](docs/STORAGE-FORMAT.md)** defines the data layout. |
| **`_bmad-output/`** | Brainstorming and planning (e.g. v1 spec, action plan). |

## Quick start

1. **Storage format:** [docs/STORAGE-FORMAT.md](docs/STORAGE-FORMAT.md)
2. **Run the app:** `cd app && npm install && npm run tauri dev`
3. **Build binaries:** `cd app && npm run tauri build`

## Origin

V1 was defined in a brainstorming session (First Principles, Mind Mapping, Morphological Analysis). See `_bmad-output/brainstorming/brainstorming-session-2026-02-24.md` for the full spec and action plan.
