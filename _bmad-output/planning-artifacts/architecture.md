---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/product-brief-cadence-2026-02-24.md'
  - 'docs/STORAGE-FORMAT.md'
  - 'docs/MCP.md'
workflowType: 'architecture'
project_name: 'cadence'
user_name: 'Mike'
date: '2026-02-24'
lastStep: 8
status: 'complete'
completedAt: '2026-02-24'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
30 functional requirements across 6 categories:

- **Capture (FR1-FR5):** Global hotkey invocation, single-line natural-language input, NLP interpretation to structured fields, persistent storage, time acceptance without user specification. These require OS-level system integration (global hotkey registration), a text interpretation pipeline, and a reliable write path to SQLite.
- **Recall & Verification (FR6-FR9):** Configurable time-window view, confirm/trust entries, edit entries, chronological display. Standard CRUD read/update against SQLite with a reactive UI layer.
- **Context Management (FR10-FR14):** Optional JD, projects, goals; skip-friendly; system uses available context for review generation. Separate context table(s) in SQLite; optional inputs that enrich the review generation pipeline when present.
- **Review Generation (FR15-FR20):** On-demand review for a period, incorporate optional context, produce markdown/JSON, in-app or exportable, persist generated reviews. Requires an LLM or template engine pipeline that reads activity + context, generates narrative, writes to reviews table, and produces output.
- **Export & Portability (FR21-FR25):** Export activity, context, reviews as markdown/structured format; full export bundle with manifest; predictable documented structure. The "produce-MD" pattern — commands that read SQLite and emit files.
- **Application Lifecycle (FR26-FR30):** Cross-platform install (macOS/Windows/Linux), main dashboard view, background process for global hotkey, configurable data directory, single local data store.

**Non-Functional Requirements:**
- **Performance:** Capture input responsive <2s, dashboard load <3s, review generation <60s, export <30s
- **Security:** Local-first; OS file permissions; TLS for optional external LLM API; no encryption at rest for MVP
- **Reliability:** Data durable across restarts; single SQLite source of truth; schema versioning with additive migrations; export as recovery
- **Accessibility:** Keyboard-driven primary workflows; minimum contrast and readability at system defaults

**Scale & Complexity:**

- Primary domain: Desktop app (Tauri 2 + Vite/TypeScript frontend + Rust backend)
- Complexity level: Medium
- Estimated architectural components: 8-10 (capture window, dashboard UI, NLP pipeline, review generator, SQLite data layer, export engine, context manager, app lifecycle/hotkey manager, settings/config, future MCP server)

### Technical Constraints & Dependencies

- **Tauri 2 framework** — already scaffolded (brownfield); Rust backend + web frontend
- **SQLite** — single source of truth with documented schema (activity, context, reviews, metadata tables)
- **Cross-platform data directories** — macOS `~/Library/Application Support/cadence/`, Windows `%APPDATA%/cadence/`, Linux `~/.local/share/cadence/`
- **Storage format already designed** — produce-MD pattern documented in docs/STORAGE-FORMAT.md
- **MCP surface already designed** — resources and tools documented in docs/MCP.md (post-MVP)
- **Single-instance requirement** — global hotkey must work when app is backgrounded; coordinated process management needed

### Cross-Cutting Concerns Identified

- **Global hotkey / single-instance management** — affects app lifecycle, capture window, and platform-specific behavior
- **NLP/LLM abstraction layer** — used by both capture (interpretation) and review generation; must support multiple backends (rules-based, local model, API)
- **Offline-first behavior** — core loop must work without network; review generation needs offline-capable strategy
- **LLM-stable output format** — consistent markdown/JSON structure across all produce-MD commands, exports, and future MCP responses
- **Cross-platform path and API abstraction** — data directories, hotkey registration, window management differ per OS
- **Schema versioning and migrations** — additive migrations across all tables; must not break existing data on upgrade

## Starter Template Evaluation

### Primary Technology Domain

Desktop application (Tauri 2 + Vite/TypeScript + Rust) based on project requirements analysis. Existing brownfield scaffold already in place at `app/`.

### Existing Scaffold Assessment

The project already has a Tauri 2 scaffold created via `create-tauri-app` with:

- **Tauri 2.x** — Rust backend (`tauri`, `tauri-plugin-opener`, `serde`, `serde_json`)
- **Vite 6** — frontend bundler
- **TypeScript ~5.6** — frontend language
- **Vanilla** — no frontend framework (just `main.ts` + `styles.css`)

The scaffold provides the Tauri shell but lacks a frontend framework, styling system, testing infrastructure, and code quality tooling.

### Starter Options Considered

| Option | Pros | Cons |
|--------|------|------|
| **React + TypeScript** | Largest ecosystem; rich component libraries (shadcn/ui, Radix); excellent Tauri docs/community; strong for intermediate teams | Slightly larger bundle; virtual DOM overhead (negligible for desktop) |
| **SolidJS + TypeScript** | Best raw performance; fine-grained reactivity; React-like JSX | Smaller ecosystem; fewer component libraries; steeper edge cases |
| **Svelte + TypeScript** | Excellent performance; clean syntax; compiler-based | Smaller ecosystem than React; Svelte 5 (runes) relatively new |

### Selected Starter: React + TypeScript (added to existing Tauri 2 scaffold)

**Rationale for Selection:**
Cadence has moderate UI complexity (multiple window types, data display, forms, markdown rendering, context management). React's ecosystem depth — particularly component libraries, markdown rendering, and desktop-style UI components — outweighs the marginal performance advantage of SolidJS/Svelte. The capture window speed is a Tauri window concern (sub-second appearance), not a framework rendering concern. React's vast resource base also supports the intermediate skill level of the team.

**Strategic Rationale (SaaS trajectory):**
Tauri 2 with React was validated against a purely native approach (Swift/SwiftUI). Key factors favoring Tauri + React: (1) React components transfer directly to a future web/SaaS product — zero UI rebuild when layering accounts and services; (2) React/TypeScript is the largest developer skill set, maximizing open source contributor accessibility; (3) Rust backend logic is portable to server-side services or WASM; (4) capture window speed is solvable via pre-created hidden windows (proven by Raycast and similar tools). A native approach would mean multiple codebases and a complete frontend rebuild at the SaaS transition.

**Initialization Approach:**
Since the Tauri 2 scaffold already exists, we add React and tooling to the existing project rather than re-scaffolding:

```bash
cd app
npm install react react-dom
npm install -D @types/react @types/react-dom @vitejs/plugin-react
npm install tailwindcss @tailwindcss/vite
npm install -D vitest @testing-library/react eslint prettier
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
TypeScript ~5.6 (already in scaffold); React 19 with JSX/TSX; Rust (Tauri backend)

**Styling Solution:**
Tailwind CSS — utility-first; consistent with desktop app styling needs; pairs well with component libraries like shadcn/ui

**Build Tooling:**
Vite 6 (already in scaffold) + `@vitejs/plugin-react`; Tauri CLI for desktop builds

**Testing Framework:**
Vitest (Vite-native) + React Testing Library for component tests; Rust tests for backend commands

**Code Organization:**
React component-based architecture; Tauri commands as the bridge between frontend and Rust backend; feature-based folder structure

**Development Experience:**
Vite HMR for instant feedback; TypeScript strict mode; ESLint + Prettier for consistency; Tauri dev mode with hot reload

**Note:** Project initialization using these additions should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Data access layer (SQLx for Rust ↔ SQLite)
- Frontend ↔ backend communication (Tauri Commands)
- Frontend state management (Zustand + TanStack Query)
- Component architecture (feature-based folder structure)
- Multi-window strategy (pre-created hidden capture window)

**Important Decisions (Shape Architecture):**
- Migration approach (SQLx built-in migrations)
- Error handling patterns (Rust Result types → frontend)
- Routing strategy (React Router for dashboard)
- Logging strategy (tauri-plugin-log)
- CI/CD approach (GitHub Actions)

**Deferred Decisions (Post-MVP):**
- Platform keychain integration for API key storage
- MCP server architecture
- SaaS authentication and account system
- Team/org data layer and multi-tenancy

### Data Architecture

**Database:** SQLite (decided — per storage format design)

**Query Layer:** SQLx
- Compile-time checked SQL queries catch bugs before runtime
- Async-ready; lightweight compared to Diesel ORM
- More ergonomic than raw rusqlite while staying close to SQL
- Built-in migration support (`sqlx migrate`) aligns with additive-only migration strategy

**Migration Approach:** SQLx built-in migrations
- Additive-only migrations (new columns, new tables — never destructive)
- Schema version tracked in metadata table
- Migration files live in repo (`app/src-tauri/migrations/`)

**Caching Strategy:** Minimal
- Single-user desktop app with local SQLite; no external cache layer needed
- Dashboard holds current-window activity in React state via TanStack Query (automatic cache management)
- TanStack Query handles stale-while-revalidate for data freshness after mutations

### Authentication & Security

**Authentication:** None for MVP
- Single-user, local-only data. No login, no accounts.

**Data Security:** OS file permissions
- SQLite database in platform app data directory; access governed by OS user permissions
- No encryption at rest for MVP (per PRD NFRs)

**External API Security:**
- API keys for optional LLM services stored in app config (SQLite metadata table)
- TLS required for all external API calls
- Post-MVP: platform keychain integration (macOS Keychain, Windows Credential Manager) for secure key storage

### API & Communication Patterns

**Frontend ↔ Backend:** Tauri Commands
- Rust functions decorated with `#[tauri::command]`, called from frontend via `invoke()`
- Type-safe: Rust types serialize to TypeScript via `serde`
- Async commands for database operations and LLM calls

**Error Handling:** Rust `Result<T, E>` → Frontend
- Custom error enum in Rust serialized to frontend
- Frontend receives typed errors; UI displays user-friendly messages
- Errors never silently swallowed; capture failures surface immediately

**Backend → Frontend Events:** Tauri Event System
- Used for async notifications: "review generation complete", "export finished"
- Capture window communicates with main app via events (not direct function calls)

### Frontend Architecture

**State Management:** Zustand + TanStack Query
- **Zustand** for client-only state: current view, UI preferences, capture window state, settings
- **TanStack Query** for server state: activity entries, reviews, context data fetched from SQLite via Tauri commands. Handles caching, background refetching, and optimistic updates.
- Avoids Redux complexity while cleanly separating client state from data state

**Component Architecture:** Feature-based folder structure
```
src/
  features/
    capture/        # Capture window components
    dashboard/      # Recall/verify dashboard
    review/         # Review generation and display
    context/        # JD, projects, goals management
    export/         # Export functionality
    settings/       # App settings
  components/       # Shared UI components
  lib/              # Utilities, Tauri command wrappers
  hooks/            # Shared React hooks
```

**Routing:** React Router
- Dashboard navigation between views (dashboard, reviews, context, settings)
- Capture window has no routing — single-purpose input

**Multi-Window Strategy:**
- **Capture overlay:** Separate Tauri window, pre-created and hidden at app launch. Shown/hidden on global hotkey for instant appearance. Minimal, borderless, centered. Communicates with main process via Tauri events.
- **Dashboard window:** Main application window with full navigation. Created on app launch or on demand from system tray.
- Both windows share the same Rust backend and SQLite database.

### Infrastructure & Deployment

**CI/CD:** GitHub Actions
- Tauri's official GitHub Action for cross-platform binary builds (macOS, Windows, Linux)
- Automated on push to main / release tags

**Distribution:** GitHub Releases
- Direct binary downloads for MVP
- No app store submission initially
- Auto-update via Tauri's built-in update mechanism (post-MVP)

**Environment Configuration:**
- Build config: `tauri.conf.json`
- Runtime settings: SQLite metadata table (user preferences, data directory overrides)

**Logging:** tauri-plugin-log
- Unified logging across Rust backend and frontend
- Rust-side: `tracing` crate for structured logging
- Log levels configurable; debug logs for development, info/warn/error for production

### Decision Impact Analysis

**Implementation Sequence:**
1. React + Tailwind + tooling setup (scaffold enhancement)
2. SQLite schema + SQLx setup + migrations
3. Tauri command layer (CRUD operations)
4. Multi-window setup (capture overlay + dashboard)
5. Feature implementation (capture → dashboard → context → reviews → export)

**Cross-Component Dependencies:**
- SQLx ↔ Tauri Commands: All data access flows through SQLx, exposed via Tauri commands
- TanStack Query ↔ Tauri Commands: Frontend data fetching wraps Tauri invoke calls
- Multi-window ↔ Event System: Capture window and dashboard communicate via Tauri events
- NLP Pipeline ↔ Review Generator: Both consume the LLM abstraction layer (rules-based for MVP)

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:** 5 major categories where AI agents could make different choices — naming, structure, format, communication, and process patterns. Each is specified below to ensure all agents produce compatible, consistent code.

### Naming Patterns

**Database Naming Conventions:**
- Tables: `snake_case`, plural — `activity_entries`, `context_items`, `reviews`, `metadata`
- Columns: `snake_case` — `raw_input`, `created_at`, `period_start`, `period_end`
- Foreign keys: `{table_singular}_id` — `review_id`, `context_id`
- Indexes: `idx_{table}_{column}` — `idx_activity_entries_date`, `idx_reviews_period_start`
- Example: `CREATE TABLE activity_entries (id INTEGER PRIMARY KEY, raw_input TEXT NOT NULL, created_at TEXT NOT NULL)`

**Rust Backend Naming Conventions:**
- Functions: `snake_case` — `get_activity_entries`, `generate_review`, `export_bundle`
- Structs: `PascalCase` — `ActivityEntry`, `ReviewRequest`, `ContextItem`
- Tauri commands: `snake_case` — `#[tauri::command] fn get_activity_entries()`
- Modules: `snake_case` files — `db.rs`, `review_generator.rs`, `nlp_parser.rs`
- Constants: `SCREAMING_SNAKE_CASE` — `MAX_INPUT_LENGTH`, `DEFAULT_REVIEW_PERIOD`

**TypeScript Frontend Naming Conventions:**
- Components: `PascalCase` files and exports — `CaptureInput.tsx`, `DashboardView.tsx`, `ActivityList.tsx`
- Hooks: `camelCase` with `use` prefix — `useActivityEntries.ts`, `useReviewGeneration.ts`
- Utilities: `camelCase` — `formatDate.ts`, `tauriCommands.ts`
- Types/interfaces: `PascalCase` — `ActivityEntry`, `ReviewPeriod`, `ContextItem`
- Variables/functions: `camelCase` — `activityEntries`, `handleSubmit`, `formatDateRange`
- Constants: `SCREAMING_SNAKE_CASE` — `MAX_INPUT_LENGTH`, `DEFAULT_HOTKEY`

**Tauri Command Invocations:**
- Frontend calls use `snake_case` matching Rust function names
- Example: `invoke('get_activity_entries', { from: '2026-02-17', to: '2026-02-21' })`

### Structure Patterns

**Project Organization:**
```
app/
  src/                          # Frontend source
    features/
      capture/
        CaptureInput.tsx
        CaptureInput.test.tsx
        useCaptureSubmit.ts
        index.ts                # Barrel export
      dashboard/
        DashboardView.tsx
        ActivityList.tsx
        ActivityEntry.tsx
        ActivityEntry.test.tsx
        index.ts
      review/
        ReviewView.tsx
        ReviewGenerator.tsx
        ReviewDisplay.tsx
        index.ts
      context/
        ContextManager.tsx
        JobDescription.tsx
        Projects.tsx
        Goals.tsx
        index.ts
      export/
        ExportView.tsx
        useExport.ts
        index.ts
      settings/
        SettingsView.tsx
        index.ts
    components/                 # Shared UI components
      Button.tsx
      Input.tsx
      Modal.tsx
    lib/
      tauriCommands.ts          # Typed wrappers around invoke()
      formatters.ts             # Date, text formatting utilities
      types.ts                  # Shared TypeScript types
    hooks/
      useGlobalHotkey.ts
      useTauriEvent.ts
    App.tsx
    main.tsx
    capture.tsx                 # Capture window entry point
  src-tauri/
    src/
      main.rs
      lib.rs
      commands/                 # Tauri command handlers
        capture.rs
        activity.rs
        review.rs
        context.rs
        export.rs
      db/                       # Database layer
        mod.rs
        schema.rs
        migrations.rs
      nlp/                      # NLP interpretation
        mod.rs
        parser.rs
      error.rs                  # AppError enum
    migrations/                 # SQLx migration files
      001_initial_schema.sql
    Cargo.toml
    tauri.conf.json
```

**File Structure Rules:**
- Tests co-located with source: `Component.tsx` → `Component.test.tsx` in same directory
- Rust tests: inline `#[cfg(test)]` modules for unit tests; `tests/` directory for integration tests
- Each feature folder has an `index.ts` barrel export
- External imports use barrel: `import { CaptureInput } from '@/features/capture'`
- No circular dependencies between features; shared code goes in `components/`, `lib/`, or `hooks/`

### Format Patterns

**Tauri Command Response Format:**
- Success: direct typed data — `Result<Vec<ActivityEntry>, AppError>`
- Error: custom enum — `AppError { kind: ErrorKind, message: String }`
- `ErrorKind` variants: `NotFound`, `DatabaseError`, `ValidationError`, `NlpError`, `ExportError`
- No wrapper objects; Tauri's invoke handles success/error separation

**Date/Time Formats:**
- Storage (SQLite): ISO 8601 strings — `2026-02-24T15:00:00Z`
- Rust: `chrono::DateTime<Utc>` for absolute times; `chrono::NaiveDate` for date-only
- TypeScript: ISO string storage/transmission; `Intl.DateTimeFormat` for display
- User-facing: locale-aware via browser/system locale

**JSON Field Naming (TypeScript ↔ Rust Bridge):**
- TypeScript: `camelCase` — `rawInput`, `createdAt`, `periodStart`
- Rust: `snake_case` — `raw_input`, `created_at`, `period_start`
- Bridge: `#[serde(rename_all = "camelCase")]` on all Rust structs exposed to frontend
- This is automatic and transparent; agents must apply the serde attribute consistently

### Communication Patterns

**Tauri Event Naming:**
- Format: `kebab-case` with namespace — `capture:saved`, `review:generated`, `review:progress`, `export:complete`
- Payloads: typed Rust structs with `#[serde(rename_all = "camelCase")]`; matching TypeScript interfaces
- Direction: backend → frontend only; frontend uses `invoke()` for requests
- Example: `app.emit("review:progress", ReviewProgress { percent: 50, stage: "generating" })`

**Zustand Store Patterns:**
- One store per domain: `useCaptureStore`, `useSettingsStore`, `useUiStore`
- Actions as store methods: `useCaptureStore.getState().submitCapture(text)`
- Never duplicate server state in Zustand — TanStack Query owns all data from SQLite
- Zustand is for client-only UI state: current route, sidebar collapsed, capture window visible

**TanStack Query Patterns:**
- Query keys: array format with feature namespace — `['activity', { from, to }]`, `['reviews', { period }]`
- All queries wrap Tauri `invoke()` calls via typed functions in `lib/tauriCommands.ts`
- Mutations invalidate related queries automatically
- No direct `invoke()` calls in components; always through query/mutation hooks

### Process Patterns

**Error Handling:**
- Rust: all Tauri commands return `Result<T, AppError>`. Never `panic!` in command handlers.
- Frontend: `try/catch` around `invoke()` calls within TanStack Query error handlers
- User-facing errors: friendly messages — "Couldn't save — try again" not "SQLITE_CONSTRAINT"
- Capture window: on error, show brief inline message and **retain the user's typed text** (never lose input)
- Logging: technical error details logged via tauri-plugin-log; user sees only friendly message

**Loading State Patterns:**
- TanStack Query provides `isLoading`, `isError`, `data` — use these directly in components
- No custom loading state management; no global loading spinners
- Capture window: **no loading state**. Submit is fire-and-forget (instant dismiss; errors surface in dashboard)
- Dashboard: skeleton loading for initial data; inline loading indicators for mutations
- Review generation: progress indicator via Tauri events (`review:progress`) since generation may take seconds

### Enforcement Guidelines

**All AI Agents MUST:**
- Follow the naming conventions specified above without exception
- Use the feature-based folder structure with barrel exports
- Apply `#[serde(rename_all = "camelCase")]` on all Rust structs exposed to frontend
- Co-locate tests with source files
- Return `Result<T, AppError>` from all Tauri commands
- Use TanStack Query for all data fetching; never raw `invoke()` in components
- Use Tauri events for backend → frontend notifications; never polling
- Use ISO 8601 for all date storage and transmission
- Use `Intl.DateTimeFormat` for all user-facing date display

**Pattern Violations:**
- ESLint rules enforce TypeScript naming conventions
- Rust clippy enforces Rust naming conventions
- PR reviews should check for pattern compliance
- Architecture doc is the source of truth for patterns

### Pattern Examples

**Good Examples:**

```rust
// Rust command — correct naming, error handling, serde
#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ActivityEntry {
    pub id: i64,
    pub raw_input: String,
    pub created_at: String,
}

#[tauri::command]
async fn get_activity_entries(from: String, to: String) -> Result<Vec<ActivityEntry>, AppError> {
    // ...
}
```

```typescript
// Frontend — correct query pattern, naming
const useActivityEntries = (from: string, to: string) => {
  return useQuery({
    queryKey: ['activity', { from, to }],
    queryFn: () => getActivityEntries(from, to), // from lib/tauriCommands.ts
  });
};
```

**Anti-Patterns:**

```typescript
// BAD: Direct invoke in component
const data = await invoke('get_activity_entries', { from, to });

// BAD: Duplicating server state in Zustand
useActivityStore.setState({ entries: data });

// BAD: snake_case in TypeScript
const raw_input = entry.raw_input; // Should be: const rawInput = entry.rawInput;
```

## Project Structure & Boundaries

### Complete Project Directory Structure

```
cadence/
├── README.md
├── LICENSE
├── .github/
│   └── workflows/
│       ├── ci.yml                          # Lint, test, build check
│       └── release.yml                     # Tauri cross-platform binary builds
├── docs/
│   ├── STORAGE-FORMAT.md                   # Existing
│   ├── MCP.md                              # Existing
│   └── schema.sql                          # Reference DDL
├── app/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── index.html                          # Dashboard window entry
│   ├── capture.html                        # Capture window entry
│   ├── .eslintrc.cjs
│   ├── .prettierrc
│   ├── src/
│   │   ├── main.tsx                        # Dashboard window React entry
│   │   ├── capture.tsx                     # Capture window React entry
│   │   ├── App.tsx                         # Dashboard root component + router
│   │   ├── globals.css                     # Tailwind imports + base styles
│   │   ├── features/
│   │   │   ├── capture/                    # FR1-FR5
│   │   │   │   ├── CaptureInput.tsx
│   │   │   │   ├── CaptureInput.test.tsx
│   │   │   │   ├── useCaptureSubmit.ts
│   │   │   │   └── index.ts
│   │   │   ├── dashboard/                  # FR6-FR9
│   │   │   │   ├── DashboardView.tsx
│   │   │   │   ├── ActivityList.tsx
│   │   │   │   ├── ActivityEntry.tsx
│   │   │   │   ├── ActivityEntry.test.tsx
│   │   │   │   ├── useActivityEntries.ts
│   │   │   │   └── index.ts
│   │   │   ├── context/                    # FR10-FR14
│   │   │   │   ├── ContextManager.tsx
│   │   │   │   ├── JobDescription.tsx
│   │   │   │   ├── Projects.tsx
│   │   │   │   ├── Goals.tsx
│   │   │   │   ├── useContext.ts
│   │   │   │   └── index.ts
│   │   │   ├── review/                     # FR15-FR20
│   │   │   │   ├── ReviewView.tsx
│   │   │   │   ├── ReviewGenerator.tsx
│   │   │   │   ├── ReviewDisplay.tsx
│   │   │   │   ├── ReviewDisplay.test.tsx
│   │   │   │   ├── useReviewGeneration.ts
│   │   │   │   └── index.ts
│   │   │   ├── export/                     # FR21-FR25
│   │   │   │   ├── ExportView.tsx
│   │   │   │   ├── useExport.ts
│   │   │   │   └── index.ts
│   │   │   └── settings/                   # FR29 (data directory config)
│   │   │       ├── SettingsView.tsx
│   │   │       └── index.ts
│   │   ├── components/                     # Shared UI
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   └── LoadingSkeleton.tsx
│   │   ├── lib/
│   │   │   ├── tauriCommands.ts            # Typed invoke() wrappers
│   │   │   ├── types.ts                    # Shared TypeScript types
│   │   │   ├── formatters.ts               # Date, text formatting
│   │   │   └── queryClient.ts             # TanStack Query client config
│   │   ├── hooks/
│   │   │   ├── useTauriEvent.ts            # Tauri event listener hook
│   │   │   └── useGlobalHotkey.ts          # Hotkey registration hook
│   │   └── stores/
│   │       ├── uiStore.ts                  # Zustand: UI state
│   │       └── settingsStore.ts            # Zustand: app settings
│   ├── src-tauri/
│   │   ├── Cargo.toml
│   │   ├── tauri.conf.json
│   │   ├── capabilities/                   # Tauri 2 permission capabilities
│   │   │   └── default.json
│   │   ├── icons/
│   │   ├── src/
│   │   │   ├── main.rs                     # App entry point
│   │   │   ├── lib.rs                      # Tauri setup, command registration
│   │   │   ├── error.rs                    # AppError enum
│   │   │   ├── commands/                   # Tauri command handlers
│   │   │   │   ├── mod.rs
│   │   │   │   ├── capture.rs              # FR1-FR5: capture + NLP parse
│   │   │   │   ├── activity.rs             # FR6-FR9: CRUD activity entries
│   │   │   │   ├── context.rs              # FR10-FR14: JD, projects, goals
│   │   │   │   ├── review.rs               # FR15-FR20: generate + persist reviews
│   │   │   │   └── export.rs               # FR21-FR25: produce-MD, export bundle
│   │   │   ├── db/                         # Database layer
│   │   │   │   ├── mod.rs
│   │   │   │   ├── pool.rs                 # SQLx connection pool init
│   │   │   │   └── models.rs               # Rust structs for DB rows
│   │   │   ├── nlp/                        # NLP interpretation
│   │   │   │   ├── mod.rs
│   │   │   │   └── parser.rs               # Rules-based parser (MVP)
│   │   │   └── review_engine/              # Review generation
│   │   │       ├── mod.rs
│   │   │       └── generator.rs            # Template/LLM review generator
│   │   ├── migrations/                     # SQLx migrations
│   │   │   └── 001_initial_schema.sql
│   │   └── tests/                          # Rust integration tests
│   │       └── commands_test.rs
│   └── vitest.config.ts
```

### Architectural Boundaries

**Tauri Command Boundary (Frontend ↔ Backend):**
- All frontend → backend communication goes through `lib/tauriCommands.ts` → `invoke()` → Rust `commands/` module
- All backend → frontend notifications go through Tauri events
- No direct SQLite access from frontend; no direct UI manipulation from backend

**Database Boundary:**
- Only `db/` module touches SQLx directly
- `commands/` module calls `db/` functions; never writes raw SQL outside `db/`
- Migrations are the only way to modify schema

**NLP/Review Engine Boundary:**
- `nlp/` module is called by `commands/capture.rs` — takes raw text, returns parsed structure
- `review_engine/` is called by `commands/review.rs` — takes activity + context, returns generated review
- Both are swappable (rules-based → LLM) without changing command interfaces

**Feature Boundary (Frontend):**
- Features don't import from each other directly; shared code lives in `components/`, `lib/`, `hooks/`, `stores/`
- Each feature exports its public API via `index.ts` barrel

### Requirements to Structure Mapping

| FR Category | Frontend Feature | Rust Commands | DB Tables |
|-------------|-----------------|---------------|-----------|
| Capture (FR1-FR5) | `features/capture/` | `commands/capture.rs` | `activity_entries` |
| Recall (FR6-FR9) | `features/dashboard/` | `commands/activity.rs` | `activity_entries` |
| Context (FR10-FR14) | `features/context/` | `commands/context.rs` | `context_items` |
| Review (FR15-FR20) | `features/review/` | `commands/review.rs` | `reviews` |
| Export (FR21-FR25) | `features/export/` | `commands/export.rs` | All tables |
| Lifecycle (FR26-FR30) | `App.tsx`, `stores/` | `main.rs`, `lib.rs` | `metadata` |

### Integration Points

**Internal Communication:**
- Frontend features → `lib/tauriCommands.ts` → Tauri `invoke()` → Rust commands
- Rust commands → `db/` module → SQLite
- Rust backend → Tauri events → Frontend event listeners (`useTauriEvent` hook)
- Zustand stores for cross-component UI state within the frontend

**External Integrations (Post-MVP):**
- Optional LLM API (review generation): called from `review_engine/generator.rs` via HTTP client
- MCP server: separate Tauri plugin or embedded server reading same SQLite database

**Data Flow:**

```
Capture: User types → CaptureInput.tsx → invoke('submit_capture') → commands/capture.rs
  → nlp/parser.rs (parse) → db/ (insert activity_entries) → emit 'capture:saved'
  → TanStack Query invalidates ['activity'] → DashboardView re-renders
```

```
Review: User requests → ReviewGenerator.tsx → invoke('generate_review')
  → commands/review.rs → db/ (query activity_entries + context_items)
  → review_engine/generator.rs → db/ (insert reviews) → emit 'review:generated'
  → TanStack Query invalidates ['reviews'] → ReviewDisplay renders output
```

```
Export: User requests → ExportView.tsx → invoke('export_bundle')
  → commands/export.rs → db/ (query all tables) → produce MD files + manifest
  → emit 'export:complete' → frontend shows download/location
```

### Development Workflow Integration

**Development Server:**
- `npm run tauri dev` starts both Vite dev server (HMR) and Tauri backend
- Vite serves frontend at `localhost:1420`; Tauri webview loads from Vite in dev mode
- Two HTML entry points: `index.html` (dashboard) and `capture.html` (capture window)

**Build Process:**
- `npm run tauri build` compiles Rust backend + bundles frontend via Vite
- Output: platform-specific installer/binary in `src-tauri/target/release/bundle/`
- GitHub Actions runs this for macOS, Windows, and Linux

**Testing:**
- Frontend: `npx vitest` runs co-located `.test.tsx` files
- Backend: `cargo test` runs inline `#[cfg(test)]` modules and `tests/` integration tests
- CI runs both in parallel

## Architecture Validation Results

### Coherence Validation

**Decision Compatibility:** All technology choices are compatible and work together without conflicts.
- Tauri 2 + React + Vite + TypeScript: officially supported combination in Tauri documentation
- SQLx + SQLite: well-tested pairing; compile-time query checking works with SQLite
- Zustand + TanStack Query: complementary libraries (client state vs server state); no overlap or conflict
- Tailwind CSS + shadcn/ui: shadcn/ui is built specifically for Tailwind; no separate styling runtime
- Vitest + Vite: native integration; zero additional config needed

**Pattern Consistency:** All implementation patterns align with technology choices.
- Naming conventions are internally consistent: snake_case for Rust/SQL, camelCase for TypeScript, with `#[serde(rename_all = "camelCase")]` bridging automatically
- Feature-based folder structure supports both component architecture and co-located test decisions
- TanStack Query pattern for all data fetching aligns with the "no direct invoke in components" rule
- Tauri events for backend → frontend align with the multi-window architecture

**Structure Alignment:** Project structure supports all architectural decisions.
- Multi-window architecture has separate HTML entry points (`index.html` / `capture.html`)
- Database boundary (`db/` module) cleanly separates SQLx from command handlers
- NLP and review engine are isolated modules, independently swappable (rules → LLM) without changing interfaces
- Feature folders map 1:1 to functional requirement categories

### Requirements Coverage Validation

**Functional Requirements: 30/30 covered**

| FR Range | Category | Architecture Support |
|----------|----------|---------------------|
| FR1-FR5 | Capture | `features/capture/` + `commands/capture.rs` + `nlp/parser.rs` + global hotkey + pre-created hidden window |
| FR6-FR9 | Recall & Verification | `features/dashboard/` + `commands/activity.rs` + TanStack Query + inline editing |
| FR10-FR14 | Context Management | `features/context/` + `commands/context.rs` + `context_items` table + optional skip path |
| FR15-FR20 | Review Generation | `features/review/` + `commands/review.rs` + `review_engine/generator.rs` + `reviews` table + progress events |
| FR21-FR25 | Export & Portability | `features/export/` + `commands/export.rs` + produce-MD pattern from STORAGE-FORMAT.md |
| FR26-FR30 | Application Lifecycle | `main.rs`/`lib.rs` + multi-window + platform data directories + single SQLite DB + single-instance |

**Non-Functional Requirements: All addressed**
- **Performance:** Pre-created hidden capture window (<2s); TanStack Query caching (<3s dashboard); async review generation with Tauri progress events (<60s); async export (<30s)
- **Security:** Local-first architecture; OS file permissions; TLS for external API calls; no encryption at rest (MVP)
- **Reliability:** SQLite single source of truth; additive-only migrations; export bundle as backup/recovery
- **Accessibility:** Keyboard-first design; Radix UI primitives for ARIA compliance; keyboard shortcuts throughout

### Implementation Readiness Validation

**Decision Completeness:** High
- All critical decisions documented with specific library/framework choices
- Technology versions anchored to current stable releases (verified via web search)
- Concrete code examples provided for major patterns (Rust commands, TypeScript queries, anti-patterns)
- Clear enforcement guidelines for AI agents

**Structure Completeness:** High
- Complete directory tree with every file and directory specified
- Both frontend entry points defined (dashboard + capture windows)
- Rust backend organized by responsibility (commands, db, nlp, review_engine)
- Test locations specified (co-located frontend, inline + integration Rust)

**Pattern Completeness:** High
- All 5 conflict categories addressed (naming, structure, format, communication, process)
- Concrete examples and anti-patterns provided for each category
- serde bridge pattern (snake_case ↔ camelCase) explicitly documented
- TanStack Query key conventions and Tauri event naming conventions specified

### Gap Analysis Results

**No critical gaps found.**

**Minor items (implementation-level, not architectural):**
1. **NLP parser rules** — Specific parsing patterns (regex, keyword matching, time extraction) to be defined at story level, not architecture level. The boundary (input: raw text, output: parsed structure) is defined.
2. **Review generation template/prompt** — The template or LLM prompt for generating reviews to be defined at story level. The pipeline (activity + context → generator → review) is architecturally specified.
3. **Single-instance mechanism** — Tauri plugin or OS-level lock to prevent multiple instances. Should be addressed in the first implementation story for app lifecycle.

### Architecture Completeness Checklist

**Requirements Analysis**
- [x] Project context thoroughly analyzed (30 FRs, 4 NFR categories)
- [x] Scale and complexity assessed (medium complexity, 8-10 components)
- [x] Technical constraints identified (Tauri 2, SQLite, cross-platform paths)
- [x] Cross-cutting concerns mapped (hotkey, NLP/LLM, offline-first, output format, platform abstraction, migrations)

**Architectural Decisions**
- [x] Critical decisions documented with specific libraries and versions
- [x] Technology stack fully specified (Tauri 2 + React + TypeScript + Vite + Tailwind + SQLx + SQLite)
- [x] Integration patterns defined (Tauri Commands, Events, TanStack Query)
- [x] Performance considerations addressed (hidden window, async operations, caching)

**Implementation Patterns**
- [x] Naming conventions established (database, Rust, TypeScript, Tauri commands)
- [x] Structure patterns defined (feature-based, co-located tests, barrel exports)
- [x] Communication patterns specified (Tauri events, Zustand stores, TanStack Query keys)
- [x] Process patterns documented (error handling, loading states, capture confirmation)

**Project Structure**
- [x] Complete directory structure defined (frontend + backend + config + CI)
- [x] Component boundaries established (Tauri command, database, NLP, review engine, feature)
- [x] Integration points mapped (data flow diagrams for capture, review, export)
- [x] Requirements to structure mapping complete (FR categories → files/directories)

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** High — all functional and non-functional requirements are architecturally supported, all critical decisions are made, and implementation patterns are comprehensive enough to prevent AI agent conflicts.

**Key Strengths:**
- Clean separation of concerns (frontend features, Tauri commands, database layer, NLP/review engine)
- Pre-created hidden window strategy solves the capture speed challenge
- Produce-MD pattern (already documented) aligns perfectly with the export and MCP architecture
- SaaS-ready: React components and Rust backend logic are both portable to future web/server deployment

**Areas for Future Enhancement:**
- MCP server architecture (post-MVP; surface already designed in docs/MCP.md)
- Platform keychain integration for secure API key storage (post-MVP)
- Calendar integration data flow (post-MVP)
- Team/org multi-tenancy data layer (future vision)

### Implementation Handoff

**AI Agent Guidelines:**
- Follow all architectural decisions exactly as documented in this file
- Use implementation patterns consistently across all components
- Respect project structure and architectural boundaries
- Refer to this document for all architectural questions
- When in doubt, check the naming conventions and pattern examples

**First Implementation Priority:**
1. Scaffold enhancement: Add React, Tailwind, shadcn/ui, Vitest, ESLint, Prettier to existing Tauri project
2. SQLite schema creation via SQLx migrations (`001_initial_schema.sql`)
3. Tauri command layer for basic CRUD (capture, activity list)
4. Multi-window setup (capture overlay + dashboard window)
