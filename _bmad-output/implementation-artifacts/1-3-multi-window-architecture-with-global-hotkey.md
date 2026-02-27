# Story 1.3: Multi-Window Architecture with Global Hotkey

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a user,
I want to press a global hotkey from any application and have the Cadence capture window appear immediately,
So that I can log an activity without leaving my current context.

## Acceptance Criteria

**Given** the app is running in the background,
**When** the user presses the global hotkey (Cmd+Shift+Comma on macOS / Ctrl+Shift+Comma on Win/Linux),
**Then** the borderless capture window appears centered on the primary display, focused and ready for input.

**Given** the capture window is visible,
**When** the user presses the hotkey again, or presses Enter, or presses Escape,
**Then** the capture window hides.

**Given** a second instance of the app is launched,
**When** it detects a running instance,
**Then** it defers to the existing instance (single-instance enforcement).

**Given** the main dashboard window,
**When** open simultaneously with the capture window,
**Then** both coexist as separate, independent windows sharing the Rust backend.

**Given** the Tauri event channels (`capture:saved`, `review:generated`, `export:complete`),
**When** the app initializes,
**Then** the event infrastructure is in place and ready for future stories to emit and receive events.

## Tasks / Subtasks

- [ ] Task 1: Add global shortcut and single-instance plugins (AC: 1, 2, 3)
  - [ ] 1.1 Add tauri-plugin-global-shortcut and tauri-plugin-single-instance to Cargo.toml
  - [ ] 1.2 Add @tauri-apps/plugin-global-shortcut and @tauri-apps/plugin-single-instance to frontend
  - [ ] 1.3 Configure capabilities for global-shortcut and single-instance permissions
  - [ ] 1.4 Register single-instance plugin in lib.rs; on second launch, focus main window and exit new instance

- [ ] Task 2: Create capture window in Tauri config (AC: 1, 4)
  - [ ] 2.1 Add capture window to tauri.conf.json: borderless, centered, hidden, decorations: false
  - [ ] 2.2 Create capture.html and capture.tsx (minimal placeholder: single input, Escape to hide)
  - [ ] 2.3 Configure Vite/build to serve capture.html; add capture window URL in tauri.conf
  - [ ] 2.4 Pre-create capture window at app launch; keep it hidden until hotkey

- [ ] Task 3: Register global hotkey and wire show/hide (AC: 1, 2)
  - [ ] 3.1 Register Cmd+Shift+Comma (macOS) / Ctrl+Shift+Comma (Win/Linux) in setup or after window ready
  - [ ] 3.2 On hotkey: if capture visible → hide; if hidden → show, center, focus
  - [ ] 3.3 Capture window: on Escape or Enter keydown → hide self via Tauri API
  - [ ] 3.4 Ensure capture window is centered on primary display when shown

- [ ] Task 4: Verify event infrastructure (AC: 5)
  - [ ] 4.1 Document that Tauri's app.emit() and app.listen() are available; no extra setup needed
  - [ ] 4.2 Add lib/useTauriEvent.ts hook stub or verify @tauri-apps/api/event works
  - [ ] 4.3 Log or smoke-test: emit a test event from Rust, confirm frontend can listen

- [ ] Task 5: Integration and testing
  - [ ] 5.1 Manual verification: hotkey shows/hides capture; second instance focuses main
  - [ ] 5.2 Add unit test for hotkey registration (mock) or integration test for window visibility

## Dev Notes

### Architecture Compliance

**[Source: _bmad-output/planning-artifacts/architecture.md]**

- **Multi-Window Strategy:** Capture overlay = separate Tauri window, pre-created and hidden at app launch. Shown/hidden on global hotkey. Minimal, borderless, centered. Dashboard = main window. Both share Rust backend and SQLite.
- **Tauri Event Naming:** kebab-case — `capture:saved`, `review:generated`, `export:complete`. Backend → frontend only.
- **Constants:** `DEFAULT_HOTKEY` or similar for Cmd+Shift+Comma / Ctrl+Shift+Comma

### Technical Requirements

1. **Hotkey:** Cmd+Shift+Comma (macOS) / Ctrl+Shift+Comma (Windows/Linux). Use `CommandOrControl+Shift+Comma` in Tauri global-shortcut for cross-platform.

2. **tauri-plugin-global-shortcut:**
   - Register in Rust (setup) or from frontend. Rust is preferable for lifecycle control.
   - Permissions: `global-shortcut:allow-register`, `global-shortcut:allow-unregister`

3. **tauri-plugin-single-instance:**
   - `tauri_plugin_single_instance::init(|app, argv, cwd| { ... })`
   - On second launch: focus main window (or capture if appropriate), exit the new process.

4. **Capture window config (tauri.conf.json or code):**
   - `decorations: false` (borderless)
   - `visible: false` initially
   - `center: true` or set position programmatically
   - `alwaysOnTop: true` optional for capture overlay
   - Label: e.g. `capture`

5. **Window creation:** Create capture window in setup after builder, or define in tauri.conf and create hidden. Use `WebviewWindowBuilder` or config. Tauri 2: windows can be defined in config; use `visible: false` for initially hidden.

6. **Event infrastructure:** Tauri provides `app.emit()` and `app.listen()` / `window.listen()`. No extra setup. Future stories will emit `capture:saved` etc. This story ensures the app can emit and listen; a trivial emit/listen in setup or a test command suffices for AC5.

### Project Structure (After This Story)

```
app/
  index.html           # Dashboard (existing)
  capture.html         # Capture overlay entry (new)
  src/
    main.tsx           # Dashboard React entry (existing)
    capture.tsx        # Capture overlay React entry (new) — minimal
  src-tauri/
    tauri.conf.json    # + capture window, plugins
    src/lib.rs         # + global-shortcut, single-instance, window show/hide
```

### Previous Story Intelligence (1.1, 1.2)

- **1.1:** React, Tailwind, shadcn, AppError, tauri-plugin-log, path aliases @/
- **1.2:** DB pool in app.manage(); setup runs before windows; use `app.webview_window("capture")` to get capture window handle. DbPool available via `app.state::<DbPool>()` for future commands.
- **Window labels:** Main window is typically `main` (default from first window in config). Capture window: use label `capture`.

### Tauri 2 Window API

- `app.get_webview_window("capture")` or `app.webview_window("capture")` — get window by label
- `window.show()`, `window.hide()`, `window.set_focus()`, `window.center()`
- `WebviewWindowBuilder::new(app, "capture", url)` for programmatic creation if not in config

### Warnings / Gotchas

- **macOS permissions:** Global shortcut may require Accessibility permissions (System Preferences → Security & Privacy → Privacy). Document for users.
- **Linux/Wayland:** Global shortcuts can have limitations; test on target distro.
- **Window order:** Create main first, then capture. Ensure capture is created before registering hotkey.
- **Vite multi-page:** Add capture.html to Vite build; ensure it's in `build.rollupOptions.input` or Vite detects it from index/capture in root.

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#Multi-Window Strategy]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Capture overlay]
- [Source: v2.tauri.app/plugin/global-shortcut]
- [Source: v2.tauri.app/plugin/single-instance]
- [Source: _bmad-output/implementation-artifacts/1-2-initialize-local-database-with-platform-storage.md]

## Dev Agent Record

### Agent Model Used

(Auto - create-story workflow)

### Debug Log References

### Completion Notes List

- Ultimate context engine analysis completed — comprehensive developer guide created (create-story workflow)

### Change Log

- 2026-02-26: Story 1.3 created — multi-window, global hotkey, single-instance, event infrastructure.

### File List
