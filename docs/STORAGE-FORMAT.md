# Cadence storage format

**System:** SQLite database as the app’s source of truth (queries, indexing, relations, scheduling).  
**Human/LLM consumption:** Commands and exports that **produce** Markdown (and optional JSON) from the database. Users and LLMs get the same portable, readable output without the app storing everything as flat files.

## Design principles

- **SQLite for the system** — Structured, queryable, one file; ideal for activity time-series, context, reviews, and app logic.
- **Produce MD (and JSON) for humans/LLMs** — Export and “view as” commands generate markdown (and optionally JSON) on demand. Output remains LLM-stable and editable in any editor.
- **Exportable** — User can export everything to a portable bundle (markdown + manifest, or SQLite copy).
- **Local-first** — Database and exports live on disk; no required cloud.

---

## System layer: SQLite

**Location (default):**  
macOS `~/Library/Application Support/cadence/cadence.db`, Windows `%APPDATA%/cadence/cadence.db`, Linux `~/.local/share/cadence/cadence.db` (or configurable).

**Role:** Single source of truth for the app. All capture, context, and generated reviews are written here. The UI and automation (scheduled reviews, on-demand) read and write the DB.

### Schema (high level)

- **activity** — Time-series entries: id, date, time (optional), raw_input, parsed (project/tags/outcome as JSON or columns), created_at. Append-only for audit.
- **context** — Job description, projects, goals: id, type (job_description | project | goals), name/slug, content (markdown text), updated_at.
- **reviews** — Generated reflections: id, period_type (weekly | monthly | quarterly | on-demand), period_start, period_end, content (markdown), optional structured (JSON), created_at.
- **metadata** — Schema version, app settings (e.g. review schedule, export path).

Schema version stored in DB; migrations additive where possible. Full DDL can live in the repo (e.g. `docs/schema.sql` or in app source).

---

## Output layer: produce Markdown (and JSON)

The app exposes **commands** (and/or menu/UI actions) that **generate** human/LLM-facing output from SQLite. No second “markdown store”; the DB is the store, and these commands produce views.

### Activity → Markdown

- **Command (e.g. “Export activity” or “Show activity as MD”):** Query `activity` for a date range, emit one file per day or one concatenated markdown file.
- **Example output (generated):**

```markdown
# 2026-02-24

- **09:00** dTAK Standup — identifying core architectural decisions
- **13:00** DARPA Exploratory conversation — Partnership opportunity
- **15:00** Led team social time
```

Same format as before; it’s just **produced** from the DB instead of being the primary store.

### Context → Markdown

- **Command (“Export context” or “Show context as MD”):** Read `context` table(s), write `job-description.md`, `projects/<id>.md`, `goals.md` (or one combined file). Content is the markdown stored in the DB.

### Reviews → Markdown (and optional JSON)

- **Command (“Export reviews” or “Show review as MD”):** Read `reviews` table for a period or type, emit files like `reviews/weekly/2026-W08.md`, `reviews/on-demand/2026-02-24T12-00-00.md`. Body = `content` column; optional JSON = `structured` column.
- **On-demand generation:** When the user requests a review (or a scheduled job runs), the app (or a small script) generates the reflection, writes a row into `reviews`, and can immediately produce the corresponding MD (and JSON) file for the user.

### Export bundle

- **Command (“Export bundle” or “Full export”):** From SQLite, generate a zip (or directory) containing:
  - **activity/** — MD produced from `activity` (e.g. one file per day for the range).
  - **context/** — MD produced from `context`.
  - **reviews/** — MD (and optionally JSON) produced from `reviews`.
  - **manifest.json** — Version, export timestamp, file list, optional DB copy path.
- Optionally include a **copy of the SQLite file** in the bundle so the user has both the DB and the human-readable views.

Result: one SQLite DB for the system; one output layer that produces MD (and JSON) for users and LLMs. No lock-in; output remains LLM-stable and portable.

---

## MCP layer (future)

Cadence is intended as a **total performance management system**. An **MCP (Model Context Protocol) server** will expose Cadence data and capabilities so you can **connect your own LLMs** to the system, ask questions, and derive results from your performance data.

- **Resources** — Activity (by date range), context (JD, projects, goals), reviews (by type/period), and export bundles as URIs your LLM client can fetch.
- **Tools** — Query activity, request an on-demand review, produce MD/JSON for a period, or run analytics-style questions against the DB (e.g. “summarize last quarter”, “how did I spend time on project X?”).
- **Your LLM** — Any MCP-compatible client (Cursor, Claude Code, custom) can talk to the Cadence MCP server and use your data with your chosen model. No vendor lock-in; your data, your models.

See **[MCP.md](MCP.md)** for the intended MCP surface (resources, tools, and usage).

---

## Summary

| Layer        | What it is                         | Purpose                          |
|-------------|------------------------------------|----------------------------------|
| **SQLite**  | Single database file (e.g. `cadence.db`) | App source of truth, queries, scheduling |
| **Produce MD / Export** | Commands that read DB and write files     | Human and LLM consumption, portability   |
| **MCP**     | Server exposing resources + tools          | Connect your own LLMs; ask questions; derive results (total performance management) |

Schema version: **1**. Future changes additive (new columns/tables); export commands keep producing the same MD/JSON shapes until we explicitly version the output format.
