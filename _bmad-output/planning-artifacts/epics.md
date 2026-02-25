---
stepsCompleted: [1, 2, 3-in-progress]
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/architecture.md'
  - '_bmad-output/planning-artifacts/ux-design-specification.md'
epicCount: 6
epicsWithStories: [1, 2]
storyCreationPending: true
---

# cadence - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for cadence, decomposing the requirements from the PRD, UX Design, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: User can invoke a global capture input from anywhere (e.g. hotkey) without switching applications.
FR2: User can enter a single line of natural-language activity (e.g. task, meeting, outcome) and submit it in one action.
FR3: System can interpret the entered text to derive structured fields (e.g. project, date, time, activity type, outcome) for storage.
FR4: System can store each capture as a persistent activity entry with raw input and interpreted structure.
FR5: User can submit capture without being required to specify time; system accepts user's stated or implied time.
FR6: User can open a recall view that shows captured activity for a chosen time window (e.g. today or configurable range).
FR7: User can confirm that a displayed activity entry is correct (trust/verify).
FR8: User can edit an existing activity entry (e.g. correct text or interpreted fields) and persist the change.
FR9: System can display activity entries in chronological order within the selected window.
FR10: User can add or update a job description (or role context) that the system can use when generating reviews.
FR11: User can define and maintain a set of projects (or initiatives) that the system can use when generating reviews.
FR12: User can add or update goals that the system can use when generating reviews.
FR13: User can skip or defer adding context and still capture activity and request reviews.
FR14: System can use available context (JD, projects, goals) when generating reviews when the user has provided it.
FR15: User can request a performance review for a selected time period (e.g. last week, date range).
FR16: System can generate a review from stored activity for the requested period.
FR17: System can incorporate optional context (JD, projects, goals) into the generated review when provided.
FR18: System can produce the review in a human- and LLM-friendly format (e.g. markdown and optional structured format).
FR19: User can receive the generated review in-app or as an exportable artifact.
FR20: System can persist generated reviews so the user can access them later.
FR21: User can export activity for a date range as markdown (and optionally structured format) produced from stored data.
FR22: User can export context (JD, projects, goals) as markdown (or equivalent) produced from stored data.
FR23: User can export generated reviews as markdown (and optionally structured format).
FR24: User can create a full export bundle (e.g. activity, context, reviews, manifest) for portability or backup.
FR25: Exported output uses a predictable, documented structure suitable for LLMs and other tools.
FR26: User can install and run the application on macOS, Windows, and Linux from provided binaries.
FR27: User can open the main recall/dashboard view from the application.
FR28: Application can run in a way that allows the global capture shortcut to work when the app is in the background (e.g. single instance or coordinated process).
FR29: User can configure or use a default location for application data (e.g. app data directory per platform).
FR30: System can initialize and maintain a single local data store (e.g. one database file) for the user's data.

### NonFunctional Requirements

NFR1: Capture input (e.g. hotkey) becomes available and responsive within 2 seconds of invocation so the user can type immediately.
NFR2: Recall/dashboard view loads and displays activity for the selected window within 3 seconds under normal data volume.
NFR3: For a typical period (e.g. one week of activity), the system produces a generated review within 60 seconds or provides clear progress/feedback.
NFR4: Export of activity, context, or full bundle for a given range completes within 30 seconds for typical data volumes.
NFR5: User data (activity, context, reviews) is stored under the user's control in the application data directory; access follows OS file/permission model.
NFR6: If the app communicates with external services (e.g. optional LLM API), it uses TLS. No sensitive data is sent unless the user explicitly uses such a feature.
NFR7: Data persists across application restarts and is not lost under normal OS and hardware behavior. Single data store as source of truth; schema versioning and migrations applied so upgrades do not lose data.
NFR8: Primary workflows (invoke capture, submit entry, open recall view, request review) are achievable via keyboard and/or global shortcut. UI text and controls meet minimum contrast and sizing for readability.

### Additional Requirements

**From Architecture:**
- Existing Tauri 2 scaffold needs React, Tailwind CSS, shadcn/ui, Vitest, ESLint, Prettier added (first implementation story)
- SQLite schema creation via SQLx migrations (001_initial_schema.sql) for activity_entries, context_items, reviews, metadata tables
- Multi-window architecture: pre-created hidden capture window + main dashboard window; both share Rust backend
- Tauri command layer: all frontend ↔ backend communication via #[tauri::command] + invoke()
- State management: Zustand for client state, TanStack Query for server state
- NLP parser: rules-based MVP parser (input: raw text, output: parsed structure with project, time, tags, outcome)
- Review engine: template/LLM-based generator pipeline (activity + context → narrative)
- Custom AppError enum with Result<T, AppError> from all Tauri commands
- Tauri event system for backend → frontend notifications (capture:saved, review:generated, export:complete)
- GitHub Actions CI/CD for cross-platform binary builds
- Unified logging via tauri-plugin-log + tracing crate
- Feature-based folder structure with co-located tests and barrel exports
- Naming conventions: snake_case (Rust/SQL), camelCase (TypeScript), serde rename_all bridging

**From UX Design:**
- Two-surface design: capture overlay is seamless/non-intrusive (zero chrome, frosted background); dashboard is data-rich with edit-first bias
- All dashboard data directly editable inline (click to edit project tags, time, text — no modal editors)
- Encouraging, non-guilt-inducing empty states for entries, reviews, and context
- Subtle confirmation cue on capture (~200ms checkmark/color flash) before dismiss
- Progressive context disclosure: gentle prompts to add JD/projects/goals after first review
- Dark mode supported from day one; respects system preference
- shadcn/ui components: Input, Button, Dialog, Sidebar, Tabs, Select, Toast, Skeleton, Tooltip
- Custom components: CaptureOverlay, ActivityEntry (editable chips), ReviewDisplay, ContextEditor
- WCAG AA accessibility: keyboard navigation throughout; screen reader support; prefers-reduced-motion respected

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| FR1 | Epic 2 | Global capture hotkey invocation |
| FR2 | Epic 2 | Single-line natural-language input |
| FR3 | Epic 2 | NLP interpretation to structured fields |
| FR4 | Epic 2 | Persistent storage of activity entries |
| FR5 | Epic 2 | Time acceptance without user specification |
| FR6 | Epic 3 | Recall view for chosen time window |
| FR7 | Epic 3 | Confirm/trust entry correctness |
| FR8 | Epic 3 | Edit existing activity entries |
| FR9 | Epic 3 | Chronological display within window |
| FR10 | Epic 4 | Add/update job description |
| FR11 | Epic 4 | Define/maintain projects |
| FR12 | Epic 4 | Add/update goals |
| FR13 | Epic 4 | Skip/defer context, still capture and review |
| FR14 | Epic 4 | System uses context when generating reviews |
| FR15 | Epic 5 | Request review for selected period |
| FR16 | Epic 5 | Generate review from stored activity |
| FR17 | Epic 5 | Incorporate optional context |
| FR18 | Epic 5 | Produce review in markdown/structured format |
| FR19 | Epic 5 | Receive review in-app or exportable |
| FR20 | Epic 5 | Persist generated reviews |
| FR21 | Epic 6 | Export activity as markdown |
| FR22 | Epic 6 | Export context as markdown |
| FR23 | Epic 6 | Export reviews as markdown |
| FR24 | Epic 6 | Full export bundle |
| FR25 | Epic 6 | Predictable documented export structure |
| FR26 | Epic 1 | Install and run on macOS/Windows/Linux |
| FR27 | Epic 1 | Open main dashboard view |
| FR28 | Epic 1 | Global hotkey works when app in background |
| FR29 | Epic 1 | Configurable data directory |
| FR30 | Epic 1 | Initialize and maintain single data store |

## Epic List

### Epic 1: Project Foundation & App Shell

User can install and run the Cadence desktop app with the full tech stack, multi-window architecture, navigable dashboard shell, global hotkey registration, and SQLite database initialized. This epic delivers the runnable foundation everything else builds on.

**FRs covered:** FR26, FR27, FR28, FR29, FR30

**Implementation notes:**
- Enhance existing Tauri 2 scaffold with React, Tailwind CSS, shadcn/ui, Vitest, ESLint, Prettier
- SQLite schema via SQLx migrations (activity_entries, context_items, reviews, metadata tables)
- Multi-window setup: pre-created hidden capture overlay + main dashboard window
- Tauri command layer, AppError enum, event system foundation
- Sidebar navigation shell (Dashboard, Reviews, Context, Settings — empty views)
- Global hotkey registration (captures hotkey, shows/hides capture window)
- Platform data directory configuration
- GitHub Actions CI/CD for cross-platform builds
- Logging via tauri-plugin-log + tracing
- Dark mode support from day one

### Epic 2: Activity Capture

User can press a global hotkey from anywhere, type what they did in a single-line input, press Enter, and the entry is stored with NLP-interpreted structure (project, time, tags, outcome). The capture window appears instantly, dismisses on submit, and confirms with a subtle visual cue. This is the core "sacred" interaction.

**FRs covered:** FR1, FR2, FR3, FR4, FR5

**Implementation notes:**
- CaptureOverlay component (borderless, frosted background, single input, 18px font)
- Rules-based NLP parser (raw text → parsed structure with project, time, tags, outcome)
- Tauri command: submit_capture (parse → store in activity_entries → emit capture:saved event)
- Confirmation cue (~200ms checkmark/color flash) before dismiss
- Fire-and-forget: instant dismiss on Enter; errors surface in dashboard, never block capture
- Capture window is seamless and non-intrusive per UX two-surface philosophy

### Epic 3: Activity Recall & Dashboard

User can open the dashboard, see their captured activity in chronological order for a chosen time window, verify that entries are correct, and edit any entry inline. All interpreted fields (project, time, tags) are directly editable with an edit-first bias.

**FRs covered:** FR6, FR7, FR8, FR9

**Implementation notes:**
- DashboardView with date range selector (default: today)
- ActivityList displaying entries chronologically
- ActivityEntry component with editable chips for project, time, tags
- Inline editing: click to edit, Enter to save, Escape to cancel, auto-save on blur
- Hover actions: edit, delete
- Encouraging empty state: "Ready when you are. Press [hotkey] to capture your first activity."
- TanStack Query for data fetching; auto-refresh after capture events

### Epic 4: Context Management

User can optionally add their job description, projects, and goals to enrich future reviews. Context is always optional — the user can skip it entirely and still capture activity and generate reviews. Progressive disclosure prompts appear after the first review.

**FRs covered:** FR10, FR11, FR12, FR13, FR14

**Implementation notes:**
- ContextManager view with Tabs (Job Description, Projects, Goals)
- ContextEditor: markdown textarea with auto-save (debounced)
- CRUD Tauri commands for context_items table
- Progressive disclosure: gentle prompt after first review ("Your reviews could be even better with a job description")
- Empty state per section: guidance text, never guilt-inducing
- Context is read by review generation pipeline when available (FR14 integration point with Epic 5)

### Epic 5: Review Generation

User can request a performance review for any time period and receive a polished, role-aligned narrative generated from their captured activity and optional context. Reviews are displayed in-app with professional formatting, can be copied to clipboard or exported, and are persisted for later access. This is the "aha moment."

**FRs covered:** FR15, FR16, FR17, FR18, FR19, FR20

**Implementation notes:**
- ReviewView with period selector (presets: Last Week, Last Month, Last Quarter, Custom Range)
- Review engine pipeline: query activity_entries + context_items → generate narrative → store in reviews table
- Rules-based or LLM-powered generation (MVP: template-based; future: LLM API)
- Progress indicator via Tauri events (review:progress, review:generated)
- ReviewDisplay: rendered markdown, source attribution ("Based on N entries from [date range]")
- Actions: Copy to Clipboard, Export as Markdown, Regenerate, Edit
- Persist reviews in SQLite for later access
- Empty state: "Generate your first review to see the magic."

### Epic 6: Export & Portability

User can export their activity, context, and reviews as markdown files, or create a full export bundle with manifest for backup and portability. All exported output uses a predictable, documented structure suitable for humans and LLMs.

**FRs covered:** FR21, FR22, FR23, FR24, FR25

**Implementation notes:**
- ExportView with options: Export Activity, Export Context, Export Reviews, Full Export Bundle
- Produce-MD commands per docs/STORAGE-FORMAT.md pattern
- Activity export: one file per day or concatenated markdown for date range
- Context export: job-description.md, projects/*.md, goals.md
- Review export: reviews organized by period type and date
- Full bundle: zip or directory with activity/, context/, reviews/, manifest.json
- Optional SQLite copy in bundle
- Predictable LLM-stable output format per FR25

---

## Epic 1: Project Foundation & App Shell

User can install and run the Cadence desktop app with the full tech stack, multi-window architecture, navigable dashboard shell, global hotkey registration, and SQLite database initialized. This epic delivers the runnable foundation everything else builds on.

### Story 1.1: Set Up Full Tech Stack on Tauri Scaffold

As a developer,
I want the existing Tauri 2 scaffold configured with React, Tailwind CSS, shadcn/ui, Vitest, ESLint, Prettier, logging, and dark mode,
So that all subsequent stories have a consistent, fully-configured foundation to build on.

**Acceptance Criteria:**

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

### Story 1.2: Initialize Local Database with Platform Storage

As a user,
I want the app to automatically initialize a local SQLite database in my platform's application data directory on first launch,
So that my data has a persistent, reliable home that survives app restarts and upgrades.

**Acceptance Criteria:**

**Given** the app launches for the first time,
**When** startup completes,
**Then** a SQLite database file is created in the platform app data directory (e.g. `~/Library/Application Support/cadence/cadence.db` on macOS).

**Given** the database is initialized,
**When** inspected,
**Then** it contains tables: `activity_entries`, `context_items`, `reviews`, and `metadata`.

**Given** the app is launched a second time,
**When** startup completes,
**Then** the existing database is opened and no migrations are re-applied.

**Given** a future schema migration is added,
**When** the app launches,
**Then** pending migrations are applied automatically without data loss.

**Given** the app is force-quit mid-write,
**When** reopened,
**Then** the database is intact and readable.

### Story 1.3: Multi-Window Architecture with Global Hotkey

As a user,
I want to press a global hotkey from any application and have the Cadence capture window appear immediately,
So that I can log an activity without leaving my current context.

**Acceptance Criteria:**

**Given** the app is running in the background,
**When** the user presses the global hotkey (Cmd+Shift+Space on macOS / Ctrl+Shift+Space on Win/Linux),
**Then** the borderless capture window appears centered on the primary display, focused and ready for input.

**Given** the capture window is visible,
**When** the user presses the hotkey again or presses Escape,
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

### Story 1.4: Dashboard Shell with Sidebar Navigation

As a user,
I want to open Cadence and see a navigable shell with clearly labeled sections,
So that I can orient myself and know where to find my activity, reviews, context, and settings.

**Acceptance Criteria:**

**Given** the main window opens,
**When** the dashboard loads,
**Then** a sidebar with navigation items (Dashboard, Reviews, Context, Settings) is visible.

**Given** the user clicks a sidebar item,
**When** the selection changes,
**Then** the main content area updates to show that section's view.

**Given** no activity has been captured yet,
**When** the Dashboard view is shown,
**Then** an encouraging empty state is displayed (e.g. "Ready when you are. Press [hotkey] to capture your first activity.").

**Given** the Reviews, Context, and Settings views,
**When** navigated to,
**Then** each shows a placeholder empty state — not blank or broken.

**Given** keyboard navigation,
**When** the user tabs through sidebar items,
**Then** focus states are visible and WCAG AA contrast is maintained in both light and dark mode.

### Story 1.5: Cross-Platform CI/CD Pipeline

As a developer,
I want GitHub Actions to automatically build distributable Cadence binaries for macOS, Windows, and Linux,
So that users can install the app on their platform and every commit is verified to produce a working build.

**Acceptance Criteria:**

**Given** a push to the main branch or a pull request,
**When** GitHub Actions runs,
**Then** builds are triggered for macOS (universal), Windows (x64), and Linux (x64) in parallel.

**Given** a successful build,
**When** the workflow completes,
**Then** distributable artifacts are uploaded as workflow artifacts.

**Given** a build failure on one platform,
**When** the workflow runs,
**Then** the failure is clearly reported and the remaining platform builds continue independently.

**Given** the workflow configuration,
**When** reviewed,
**Then** Rust and Node dependency caching is in place to reduce build times.

---

## Epic 2: Activity Capture

User can press a global hotkey from anywhere, type what they did in a single-line input, press Enter, and the entry is stored with NLP-interpreted structure (project, time, tags, outcome). The capture window appears instantly, dismisses on submit, and confirms with a subtle visual cue.

### Story 2.1: Capture Window UI with Text Input

As a user,
I want a minimal, borderless capture window to appear instantly when I press the global hotkey,
So that I can type what I did without switching applications or breaking my focus.

**Acceptance Criteria:**

**Given** the app is running in the background,
**When** the user presses the global hotkey,
**Then** the CaptureOverlay window appears and is ready for input within 2 seconds (NFR1).

**Given** the CaptureOverlay opens,
**When** it renders,
**Then** focus is immediately placed in the text input — no extra clicks required.

**Given** the CaptureOverlay,
**When** rendered,
**Then** it displays a single-line text input at 18px font with a frosted/semi-transparent background and zero chrome (no title bar, no toolbar).

**Given** the user has typed text and presses Enter,
**When** the input is non-empty,
**Then** the capture is submitted.

**Given** the user presses Escape or clicks outside the window,
**When** the CaptureOverlay is visible,
**Then** it hides without submitting anything.

**Given** the input is empty,
**When** the user presses Enter,
**Then** nothing is submitted and focus remains on the input.

### Story 2.2: Rules-Based NLP Parser

As a user,
I want the system to interpret my natural-language activity entry and extract structured fields automatically,
So that my activities are organized without me filling in structured forms.

**Acceptance Criteria:**

**Given** raw text like `"met with design team about homepage for 1h #project-x"`,
**When** the parser runs,
**Then** it extracts: project (`project-x`), duration (`1h`), activity type (meeting), and outcome text.

**Given** raw text with an explicit time like `"at 2pm reviewed PRs"`,
**When** the parser runs,
**Then** the time field is set to 2pm.

**Given** raw text with no time specified,
**When** the parser runs,
**Then** the time field defaults to the current time (FR5).

**Given** raw text with no recognizable project tag,
**When** the parser runs,
**Then** the project field is null/empty — no error is thrown.

**Given** any raw text input,
**When** the parser runs,
**Then** it always returns a parsed structure — even if only the raw text could be extracted.

**Given** the parser output,
**When** stored,
**Then** the original raw input text is preserved alongside all interpreted fields.

### Story 2.3: Submit Capture and Persist Activity Entry

As a user,
I want my submitted activity to be immediately saved to my local database,
So that I never lose a capture and my activity history builds up reliably over time.

**Acceptance Criteria:**

**Given** the user presses Enter in the capture input,
**When** the Tauri `submit_capture` command executes,
**Then** the raw text is parsed and stored as a row in `activity_entries`.

**Given** a successful save,
**When** the entry is written,
**Then** the `capture:saved` Tauri event is emitted with the new entry's ID.

**Given** the stored entry,
**When** inspected,
**Then** it contains: `id`, `raw_text`, `parsed_project`, `parsed_time`, `parsed_tags`, `parsed_outcome`, `created_at`.

**Given** the dashboard is open and subscribed to `capture:saved`,
**When** the event fires,
**Then** the dashboard is notified and can trigger a data refresh (display handled in Epic 3).

**Given** a database write failure,
**When** `submit_capture` is called,
**Then** it returns a typed `AppError` — the capture window does not hang or crash.

### Story 2.4: Confirmation Cue and Fire-and-Forget Error Handling

As a user,
I want a brief visual confirmation when my capture saves, and any errors surfaced in the dashboard rather than blocking the capture window,
So that I can log activities quickly and confidently without interrupting my flow.

**Acceptance Criteria:**

**Given** a successful capture submission,
**When** `capture:saved` is received by the capture window,
**Then** a subtle visual confirmation cue is shown (e.g. ~200ms checkmark or color flash).

**Given** the confirmation cue completes,
**When** ~200ms elapses,
**Then** the capture window hides automatically.

**Given** a capture submission error,
**When** the error occurs,
**Then** the capture window dismisses normally and the error is queued for display in the dashboard — capture is never blocked.

**Given** the user submits another capture while a previous submission is still in-flight,
**When** the new input is entered,
**Then** the capture window accepts and submits it independently.
