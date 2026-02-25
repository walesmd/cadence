# Cadence (desktop app)

Cross-platform desktop app for **Cadence** — capture activity with Spotlight-like input, trust/verify in a minimal dashboard, and get performance reflections (weekly, monthly, quarterly, on-demand).

**Platforms:** macOS (primary), Windows, Linux.

## Dev

```bash
npm install
npm run tauri dev
```

## Build (binaries)

```bash
npm run tauri build
```

Outputs in `src-tauri/target/release/bundle/` (macOS `.app` / `.dmg`, Windows `.msi` / `.exe`, Linux `.deb` / `.AppImage`).

## Storage

Data is LLM-stable and exportable. See **[../docs/STORAGE-FORMAT.md](../docs/STORAGE-FORMAT.md)** for schema and layout.
