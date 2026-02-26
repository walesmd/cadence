# Story 1.1: Set Up Full Tech Stack on Tauri Scaffold

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want the existing Tauri 2 scaffold configured with React, Tailwind CSS, shadcn/ui, Vitest, ESLint, Prettier, logging, and dark mode,
So that all subsequent stories have a consistent, fully-configured foundation to build on.

## Acceptance Criteria

**Given** the existing Tauri 2 project,
**When** the dev runs the install and build commands,
**Then** the app builds successfully with no errors and a basic window renders React content.

**Given** a system dark mode preference,
**When** the app launches,
**Then** it respects the dark/light mode setting automatically.

**Given** a Tauri command returns an error,
**When** the frontend receives it,
**Then** it is typed as `AppError` via `Result<T, AppError>` — never an untyped string.

**Given** the app is running,
**When** log events are emitted,
**Then** they are captured via `tauri-plugin-log` and `tracing` at appropriate levels.

**Given** ESLint and Prettier are configured,
**When** the linter and formatter run,
**Then** no errors or formatting issues are reported on the base codebase.

**Given** Vitest is configured,
**When** the test suite runs,
**Then** it executes successfully with no failures on a clean setup.

## Tasks / Subtasks

- [x] Task 1: Add React, Vite React plugin, and update entry points (AC: 1)
  - [x] 1.1 Install react, react-dom, @types/react, @types/react-dom, @vitejs/plugin-react
  - [x] 1.2 Configure vite.config.ts with React plugin and path aliases (@/)
  - [x] 1.3 Create main.tsx and App.tsx with minimal React root
  - [x] 1.4 Update index.html to load main.tsx instead of main.ts
  - [x] 1.5 Verify `npm run build` and `npm run tauri dev` succeed with React rendering

- [x] Task 2: Add Tailwind CSS and base styles (AC: 1)
  - [x] 2.1 Install tailwindcss, @tailwindcss/vite (or postcss/autoprefixer for Tailwind v3)
  - [x] 2.2 Configure Tailwind in Vite config or tailwind.config.js
  - [x] 2.3 Create globals.css with Tailwind directives and base styles
  - [x] 2.4 Replace styles.css with globals.css; ensure build succeeds

- [x] Task 3: Initialize shadcn/ui and add dark mode (AC: 1, 2)
  - [x] 3.1 Run `npx shadcn@latest init` — use New York style, zinc base color, CSS variables for colors
  - [x] 3.2 Add dark mode support: configure Tailwind darkMode: 'class' or 'media', add theme provider
  - [x] 3.3 Ensure system preference (prefers-color-scheme) is respected automatically
  - [x] 3.4 Add a minimal component (e.g., Button or Card) to verify shadcn works

- [x] Task 4: Add AppError enum and typed Tauri error handling (AC: 3)
  - [x] 4.1 Create src-tauri/src/error.rs with AppError enum (NotFound, DatabaseError, ValidationError, NlpError, ExportError, etc.)
  - [x] 4.2 Implement Display and std::error::Error for AppError; add #[derive(Serialize)] for frontend
  - [x] 4.3 Update greet command (or add test command) to return Result<T, AppError> as example
  - [x] 4.4 Create lib/tauriCommands.ts with typed invoke wrappers that handle AppError
  - [x] 4.5 Add TypeScript type for AppError matching Rust struct

- [x] Task 5: Add tauri-plugin-log and tracing (AC: 4)
  - [x] 5.1 Add tauri-plugin-log to Cargo.toml and capabilities
  - [x] 5.2 Add tracing and tracing-subscriber to Cargo.toml
  - [x] 5.3 Initialize plugin and tracing in Rust main/lib
  - [x] 5.4 Add frontend logging via @tauri-apps/plugin-log; verify logs appear in dev console

- [x] Task 6: Add ESLint and Prettier (AC: 5)
  - [x] 6.1 Install eslint, @eslint/js, typescript-eslint, eslint-plugin-react, eslint-plugin-react-hooks
  - [x] 6.2 Create eslint.config.js (flat config) or .eslintrc.cjs
  - [x] 6.3 Install prettier, eslint-config-prettier
  - [x] 6.4 Create .prettierrc and .prettierignore
  - [x] 6.5 Add lint and format scripts to package.json; run and fix any issues

- [x] Task 7: Add Vitest and React Testing Library (AC: 6)
  - [x] 7.1 Install vitest, @vitejs/plugin-react (already present), @testing-library/react, jsdom
  - [x] 7.2 Create vitest.config.ts extending Vite config
  - [x] 7.3 Add test script to package.json
  - [x] 7.4 Create at least one smoke test (e.g., App renders)
  - [x] 7.5 Run `npm run test` — all tests pass

## Dev Notes

### Current Scaffold State (Brownfield)

- **Location:** `app/` directory
- **Existing:** Tauri 2, Vite 6, TypeScript 5.6, vanilla TS (main.ts + index.html)
- **Existing Rust:** greet command in lib.rs; tauri-plugin-opener; no AppError, no logging
- **Missing:** React, Tailwind, shadcn/ui, Vitest, ESLint, Prettier, tauri-plugin-log, dark mode

### Architecture Compliance

**[Source: _bmad-output/planning-artifacts/architecture.md]**

- **Technical Stack:** React 19, Tailwind CSS, shadcn/ui, Vitest, ESLint, Prettier, tauri-plugin-log, tracing
- **Naming:** snake_case (Rust), camelCase (TypeScript), `#[serde(rename_all = "camelCase")]` for Rust structs exposed to frontend
- **Error Handling:** All Tauri commands return `Result<T, AppError>`. Never untyped strings.
- **Project Structure:** Feature-based folders will be added in later stories; this story establishes `src/` with `main.tsx`, `App.tsx`, `lib/`, `components/` (shadcn), `globals.css`
- **Future Structure:** `src/features/`, `src/components/`, `src/lib/`, `src/hooks/`, `src/stores/` — create minimal folders if needed for shadcn (e.g., `components/ui`)

### Technical Requirements

1. **React + Vite:** Use @vitejs/plugin-react. Entry: main.tsx, root component App.tsx.
2. **Tailwind:** Architecture specifies Tailwind v4 via @tailwindcss/vite OR Tailwind v3 with postcss. Check shadcn compatibility — shadcn v3 supports both; prefer Tailwind v3 + postcss if shadcn init has issues with v4 (known validation issues in some setups).
3. **shadcn/ui:** Run `npx shadcn@latest init`. Components live in `src/components/ui/`. Use CSS variables for theming. Add components incrementally (start with Button for smoke test).
4. **Dark Mode:** UX spec: "Dark mode supported from day one; respects system preference." Use `prefers-color-scheme: dark` or a class-based approach with system default. shadcn supports both.
5. **AppError:** Create `error.rs` with variants: `NotFound`, `DatabaseError`, `ValidationError`, `NlpError`, `ExportError`, `Internal(String)`. Implement `impl From<AppError> for tauri::InvokeError` or use serde to serialize error to frontend.
6. **Logging:** tauri-plugin-log for unified Rust + frontend logging. tracing for Rust. Log levels: debug (dev), info/warn/error (prod).
7. **ESLint:** TypeScript strict, React hooks rules, Prettier integration. No errors on initial run after setup.
8. **Prettier:** Consistent formatting. Format on save recommended in .vscode/settings.json (optional).
9. **Vitest:** Co-located tests (Component.test.tsx). Use jsdom. At least one test for App or root.

### File Structure (After This Story)

```
app/
  src/
    main.tsx              # React entry, StrictMode, mount
    App.tsx               # Root component (minimal: "Cadence" heading or similar)
    globals.css           # Tailwind + shadcn theme
    components/
      ui/                 # shadcn components (Button, etc.)
    lib/
      utils.ts            # shadcn cn() helper
      tauriCommands.ts    # Typed invoke wrappers
  src-tauri/
    src/
      main.rs
      lib.rs
      error.rs            # AppError enum
  vitest.config.ts
  eslint.config.js        # or .eslintrc.cjs
  .prettierrc
  .prettierignore
```

### Library Versions (Stable as of 2025-02)

- React 19, react-dom 19
- @vitejs/plugin-react ^4.x
- tailwindcss ^3.x or ^4.x (match shadcn compatibility)
- vitest ^2.x
- tauri-plugin-log ^2.x
- tracing, tracing-subscriber

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#Starter Template Evaluation] — React + Tailwind + shadcn selection rationale
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns] — AppError, naming, serde
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Design System Foundation] — shadcn/ui, dark mode, color tokens
- [Source: _bmad-output/planning-artifacts/epics.md] — Story 1.1 AC and Epic 1 context

### Project Structure Notes

- Architecture specifies `index.html` (dashboard) and `capture.html` (capture window) — only index.html exists for this story; capture.html is Story 1.3
- Keep existing index.html; update script src to main.tsx
- Remove or archive main.ts and styles.css after migration

### Warnings / Gotchas

- **Tailwind v4 + shadcn:** Some setups report validation errors during `shadcn init`. If so, use Tailwind v3 with postcss/autoprefixer.
- **Path aliases:** Ensure `@/` resolves to `src/` in both Vite and tsconfig for shadcn and imports.
- **Tauri capabilities:** tauri-plugin-log requires capability configuration in `capabilities/default.json`.
- **AppError serialization:** Frontend must receive `{ kind: string, message: string }` or similar; ensure Rust struct is Serialize + Deserialize.

## Dev Agent Record

### Agent Model Used

Auto (dev-story workflow)

### Debug Log References

### Completion Notes List

- [2026-02-26 Code Review] Tracing added: tracing + tracing-subscriber in Cargo.toml; lib.rs uses tracing::info! with subscriber init. tauri-plugin-log tracing feature enabled. Prettier run on App.test.tsx and tauriCommands.test.ts. ESLint lint script updated (removed deprecated --ext). tauriCommands.test.ts added to File List.
- React 19 + Vite React plugin + path aliases (@/) configured
- Tailwind CSS v4 with @tailwindcss/vite; globals.css with shadcn theme
- shadcn/ui initialized (New York, neutral); Button component added; dark mode via prefers-color-scheme
- AppError struct in error.rs with Serialize; greet command returns Result; tauriCommands.ts with typed invoke
- tauri-plugin-log + tracing-subscriber; attachConsole in main.tsx
- ESLint 9 flat config + Prettier; lint/format scripts; all pass
- Vitest + RTL + jsdom; App.test.tsx smoke tests (3 tests pass)

### Change Log

- 2026-02-26: Code review fixes — tracing/tracing-subscriber added; Prettier formatting fixed; ESLint script updated; tauriCommands.test.ts added to File List.
- 2026-02-25: Story 1.1 implementation complete — React, Tailwind v4, shadcn/ui, AppError, tauri-plugin-log, ESLint, Prettier, Vitest configured and validated.

### File List

- app/package.json (modified)
- app/vite.config.ts (modified)
- app/tsconfig.json (modified)
- app/index.html (modified)
- app/src/main.tsx (new)
- app/src/App.tsx (new)
- app/src/globals.css (new)
- app/src/components/ui/button.tsx (new)
- app/src/lib/utils.ts (new)
- app/src/lib/tauriCommands.ts (new)
- app/src/test/setup.ts (new)
- app/src/App.test.tsx (new)
- app/src/lib/tauriCommands.test.ts (new)
- app/vitest.config.ts (new)
- app/eslint.config.js (new)
- app/.prettierrc (new)
- app/.prettierignore (new)
- app/components.json (new)
- app/src-tauri/Cargo.toml (modified)
- app/src-tauri/capabilities/default.json (modified)
- app/src-tauri/src/lib.rs (modified)
- app/src-tauri/src/error.rs (new)
- app/src/main.ts (deleted)
- app/src/styles.css (deleted)
